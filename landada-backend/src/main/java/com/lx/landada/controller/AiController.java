package com.lx.landada.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.lx.landada.common.BaseResponse;
import com.lx.landada.common.ErrorCode;
import com.lx.landada.common.ResultUtils;
import com.lx.landada.constant.CommonConstant;
import com.lx.landada.exception.ThrowUtils;
import com.lx.landada.model.dto.ai.AiGenerateQuestionRequest;
import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.Question;
import com.lx.landada.model.entity.User;
import com.lx.landada.model.vo.QuestionContentVO;
import com.lx.landada.service.AiService;
import com.lx.landada.service.AppService;
import com.lx.landada.service.UserService;
import com.zhipu.oapi.service.v4.model.ModelData;
import io.reactivex.Flowable;
import io.reactivex.Scheduler;
import io.reactivex.schedulers.Schedulers;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@RestController
@RequestMapping("/ai")
public class AiController {
    @Resource
    private AppService appService;
    @Resource
    private AiService aiService;
    @Resource
    private UserService userService;
    @Resource
    private Scheduler vipScheduler;
    /*
    * AI生成题目（同步）
    * */
    @PostMapping("/generate")
    public BaseResponse<List<QuestionContentVO>> aiGenerateQuestion(@RequestBody AiGenerateQuestionRequest aiGenerateQuestionRequest) {
        ThrowUtils.throwIf(aiGenerateQuestionRequest==null, ErrorCode.PARAMS_ERROR);
        // 获取参数
        Long appId = aiGenerateQuestionRequest.getAppId();
        int questionNum = aiGenerateQuestionRequest.getQuestionNum();
        int optionNum = aiGenerateQuestionRequest.getOptionNum();
        App app = appService.getById(appId);
        ThrowUtils.throwIf(app==null, ErrorCode.NOT_FOUND_ERROR);
        // 封装prompt
        String userMessage = aiService.getGenerateQuestionUserMessage(app, questionNum, optionNum);
        // AI生成
        String result = aiService.doSyncUnStableRequest(CommonConstant.GENERATE_QUESTION_SYSTEM_MESSAGE, userMessage);
        // 结果处理
        int start = result.indexOf("[");
        int end = result.lastIndexOf("]");
        String json = result.substring(start, end + 1);
        List<QuestionContentVO> questionContentVOS = JSONUtil.toList(json, QuestionContentVO.class);
        return ResultUtils.success(questionContentVOS);
    }
    /*
    * AI生成题目（流式传输）
    * */
    @GetMapping("/generate/sse")
    public SseEmitter aiGenerateQuestionSSE(AiGenerateQuestionRequest aiGenerateQuestionRequest,HttpServletRequest request){
        ThrowUtils.throwIf(aiGenerateQuestionRequest==null, ErrorCode.PARAMS_ERROR);
        // 是否登录
        User loginUser = userService.getLoginUser(request);
        // 获取参数
        Long appId = aiGenerateQuestionRequest.getAppId();
        int questionNum = aiGenerateQuestionRequest.getQuestionNum();
        int optionNum = aiGenerateQuestionRequest.getOptionNum();
        App app = appService.getById(appId);
        ThrowUtils.throwIf(app==null, ErrorCode.NOT_FOUND_ERROR);
        // 获取userMessage
        String userMessage = aiService.getGenerateQuestionUserMessage(app, questionNum, optionNum);
        // 建立sse连接对象，0表示不超时
        SseEmitter emitter = new SseEmitter(0L);
        // AI生成，sse流式返回
        Flowable<ModelData> flowable = aiService.doStreamRequest(CommonConstant.GENERATE_QUESTION_SYSTEM_MESSAGE, userMessage, null);
        // 拼接完整题目
        StringBuilder contentBuilder = new StringBuilder();
        // 左括号计数器，当回归为零时表示左右括号相等，可以拼接
        AtomicInteger flag = new AtomicInteger(0);
        // 默认全局线程池
        Scheduler scheduler = Schedulers.single();
        String userRole = loginUser.getUserRole();
        if("vip".equals(userRole)){
            scheduler = vipScheduler;
        }
        flowable
                // 异步线程池执行
                .observeOn(scheduler)
                .map(chunk->chunk.getChoices().get(0).getDelta().getContent())
                .map(message->message.replaceAll("\\s",""))
                .filter(StrUtil::isNotBlank)
                .flatMap(message->{
                    // 将字符串转换成List<Character>
                    List<Character> charList = new ArrayList<>();
                    for (char c : message.toCharArray()) {
                        charList.add(c);
                    }
                    return Flowable.fromIterable(charList);
                })
                .doOnNext(c->{
                    if(c == '{'){
                        flag.addAndGet(1);
                    }
                    if(flag.get() > 0){
                        contentBuilder.append(c);
                    }
                    if(c == '}'){
                        flag.addAndGet(-1);
                        if(flag.get() == 0){
                            // 当前线程名
                            log.info(Thread.currentThread().getName());
                            if(!"vip".equals(userRole)){
                                Thread.sleep(1000);
                            }
                            // 累计单套题目满足json格式后，sse推送给前端
                            // sse需要压缩成一行json，sse无法识别换行
                            emitter.send(JSONUtil.toJsonStr(contentBuilder.toString()));
                            // 清空content
                            contentBuilder.setLength(0);
                        }
                    }
                })
                .doOnError((e)->log.error("sse error",e))
                .doOnComplete(emitter::complete)
                .subscribe();
        return emitter;
    }
}
