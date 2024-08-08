package com.lx.landada.scoring.strategy;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.lx.landada.annotation.ScoringStrategyConfig;
import com.lx.landada.common.ErrorCode;
import com.lx.landada.exception.ThrowUtils;
import com.lx.landada.model.entity.*;
import com.lx.landada.service.QuestionService;
import com.lx.landada.service.ScoringResultService;
import com.lx.landada.service.UserAnswerService;
import com.lx.landada.service.UserService;
import com.lx.landada.utils.QuestionResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/*
* 测评类策略
* */
@ScoringStrategyConfig(appType = 1,scoringStrategy = 0)
@Slf4j
public class TestScoringStrategy implements ScoringStrategy{
    @Resource
    private QuestionService questionService;
    @Resource
    private ScoringResultService scoringResultService;
    @Resource
    private UserAnswerService userAnswerService;
    @Override
    public UserAnswer doScore(List<String> choices, App app) throws Exception {
        log.info("触发测评类策略");
        // 查询app题目信息
        Question question = questionService.getOne(
                Wrappers.lambdaQuery(Question.class)
                        .eq(Question::getAppId, app.getId()));
        // 查询题目答案信息
        List<ScoringResult> scoringResults = scoringResultService.list(
                Wrappers.lambdaQuery(ScoringResult.class)
                        .eq(ScoringResult::getAppId, app.getId()));
        // 处理题目答案
        String content = question.getQuestionContent();
        List<Map> questionJsonList = JSONUtil.toList(content, Map.class);
        List<AppAnswer> appAnswerList = questionJsonList.stream().map(item -> {
            List<Map> options = JSONUtil.toList(item.get("options").toString(), Map.class);
            AppAnswer appAnswer = new AppAnswer();
            appAnswer.setOptions(options);
            appAnswer.setTitle(item.get("title").toString());
            return appAnswer;
        }).collect(Collectors.toList());
        // 校验
        ThrowUtils.throwIf(appAnswerList.size() != choices.size(), ErrorCode.PARAMS_ERROR);
        // 根据算法求出结果
        ScoringResult questionResult = QuestionResult.getTestQuestionResult(choices, appAnswerList, scoringResults);
        // 返回用户回答结果
        return QuestionResult.getUserAnswer(app,choices,questionResult);
    }
}