package com.lx.landada.scoring.strategy;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.DigestUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.lx.landada.annotation.ScoringStrategyConfig;
import com.lx.landada.common.ErrorCode;
import com.lx.landada.constant.CommonConstant;
import com.lx.landada.exception.ThrowUtils;
import com.lx.landada.model.entity.*;
import com.lx.landada.model.vo.QuestionContentVO;
import com.lx.landada.model.vo.QuestionVO;
import com.lx.landada.service.*;
import com.lx.landada.utils.QuestionResult;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.redisson.client.RedisClient;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/*
* 测评类策略
* */
@ScoringStrategyConfig(appType = 1,scoringStrategy = 1)
@Slf4j
public class AiTestScoringStrategy implements ScoringStrategy{
    @Resource
    private UserService userService;
    @Resource
    private QuestionService questionService;
    @Resource
    private AiService aiService;
    @Resource
    private Cache<String,String> caffeine;
//    @Resource
//    private RedissonClient redissonClient;
    // 锁名
    private static final String AI_ANSWER_KEY = "ai_answer_key";

    @Override
    public UserAnswer doScore(List<String> choices, App app) throws Exception {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
        // 当前登录用户
        User loginUser = userService.getLoginUser(request);
        String key = buildCacheKey(loginUser.getId(),app.getId(), JSONUtil.toJsonStr(choices));
        // 查询缓存
        String answerJson = caffeine.getIfPresent(key);
        // 命中缓存直接返回
        if(StrUtil.isNotBlank(answerJson)){
            UserAnswer userAnswer = JSONUtil.toBean(answerJson, UserAnswer.class);
            userAnswer.setAppId(app.getId());
            userAnswer.setAppType(app.getAppType());
            userAnswer.setScoringStrategy(app.getScoringStrategy());
            userAnswer.setChoices(JSONUtil.toJsonStr(choices));
            return userAnswer;
        }
        log.info("触发AI测评类策略");
        // 查询app题目信息
        Question question = questionService.getOne(
                Wrappers.lambdaQuery(Question.class)
                        .eq(Question::getAppId, app.getId()));
        QuestionVO questionVO = QuestionVO.objToVo(question);
        List<QuestionContentVO> contentVOList = JSONUtil.toList(questionVO.getQuestionContent(), QuestionContentVO.class);
        //RLock clientLock = redissonClient.getLock(AI_ANSWER_KEY);
//        try{
//            // 最长等待时间3秒，锁住15秒自动释放
//            boolean res = clientLock.tryLock(3, 15, TimeUnit.SECONDS);
//            if(res){
                // 2.调用AI获取结果
                String userMessage = aiService.getAiTestScoringUserMessage(app, contentVOList, choices);
                String result = aiService.doSyncStableRequest(CommonConstant.AI_TEST_SCORE_SYSTEM_MESSAGE, userMessage);
                // 结果处理
                int start = result.indexOf("{");
                int end = result.lastIndexOf("}");
                String json = result.substring(start, end + 1);
                // 构造返回值，填充答案
                UserAnswer userAnswer = JSONUtil.toBean(json, UserAnswer.class);
                userAnswer.setAppId(app.getId());
                userAnswer.setAppType(app.getAppType());
                userAnswer.setScoringStrategy(app.getScoringStrategy());
                userAnswer.setChoices(JSONUtil.toJsonStr(choices));
                // 更新缓存
                caffeine.put(key,JSONUtil.toJsonStr(userAnswer));
                return userAnswer;
//            }
//        }finally {
//            if(clientLock!=null && clientLock.isLocked()){
//                // 当前线程是否持有锁
//               if(clientLock.isHeldByCurrentThread()){
//                   clientLock.unlock();
//               }
//            }
//        }
    }
    private String buildCacheKey(Long userId,Long appId, String choicesStr){
        return DigestUtil.md5Hex(userId+appId+":"+choicesStr);
    }
}
