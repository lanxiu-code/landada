package com.lx.landada.service.impl;

import cn.hutool.json.JSONUtil;
import com.lx.landada.model.dto.ai.QuestionAnswerRequest;
import com.lx.landada.model.entity.App;
import com.lx.landada.model.vo.QuestionContentVO;
import com.lx.landada.service.AiService;
import com.zhipu.oapi.ClientV4;
import com.zhipu.oapi.Constants;
import com.zhipu.oapi.service.v4.model.*;
import io.reactivex.Flowable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class AiServiceImpl implements AiService {
    // 比较稳定的随机数
    private static final float STABLE_TEMPERATURE = 0.05f;
    // 比较不稳定的随机数
    private static final float UNSTABLE_TEMPERATURE = 0.99f;
    @Resource
    private ClientV4 clientV4;
    /**
     * @param messages 自定义消息
     * @param stream 流式传输
     * @param temperature 随机数
     * @return
     */
    @Override
    public String doRequest(List<ChatMessage> messages, Boolean stream, Float temperature) {
        // 构造请求
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model(Constants.ModelChatGLM4)
                .stream(stream)
                .invokeMethod(Constants.invokeMethod)
                .temperature(temperature)
                .messages(messages)
                .build();
        ModelApiResponse invokeModelApi = clientV4.invokeModelApi(request);
        ChatMessage chatMessage = invokeModelApi.getData().getChoices().get(0).getMessage();
        return chatMessage.getContent().toString();
    }
    /**
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @param stream 流式传输
     * @param temperature 随机数
     * @return
     */
    @Override
    public String doRequest(String systemMessage, String userMessage, Boolean stream, Float temperature) {
        List<ChatMessage> messages = new ArrayList<>();
        ChatMessage systemChatMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), systemMessage);
        ChatMessage userChatMessage = new ChatMessage(ChatMessageRole.USER.value(), userMessage);
        messages.add(systemChatMessage);
        messages.add(userChatMessage);
        return doRequest(messages,stream,temperature);
    }
    /**
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @param temperature 随机数
     * @return
     */
    @Override
    public String doSyncRequest(String systemMessage, String userMessage, Float temperature) {
        return doRequest(systemMessage,userMessage,Boolean.FALSE,temperature);
    }
    /**
     * 同步调用（答案比较稳定）
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @return
     */
    @Override
    public String doSyncStableRequest(String systemMessage,String userMessage) {
        return doSyncRequest(systemMessage,userMessage,STABLE_TEMPERATURE);
    }
    /**
     * 同步调用（答案不稳定）
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @return
     */
    @Override
    public String doSyncUnStableRequest(String systemMessage,String userMessage) {
        return doSyncRequest(systemMessage,userMessage,UNSTABLE_TEMPERATURE);
    }
    /*
    * 通用流式请求
    * */
    @Override
    public Flowable<ModelData> doStreamRequest(List<ChatMessage> messages, Float temperature) {
        // 构造请求
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model(Constants.ModelChatGLM4)
                .stream(Boolean.TRUE)
                .invokeMethod(Constants.invokeMethod)
                .temperature(temperature)
                .messages(messages)
                .build();
        ModelApiResponse invokeModelApi = clientV4.invokeModelApi(request);
        return invokeModelApi.getFlowable();
    }
    /*
     * 通用流式请求（简化）
     * */
    @Override
    public Flowable<ModelData> doStreamRequest(String systemMessage, String userMessage, Float temperature) {
        List<ChatMessage> messages = new ArrayList<>();
        ChatMessage systemChatMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), systemMessage);
        ChatMessage userChatMessage = new ChatMessage(ChatMessageRole.USER.value(), userMessage);
        messages.add(systemChatMessage);
        messages.add(userChatMessage);
        return doStreamRequest(messages,temperature);
    }

    /*
     *   获取生成题目的userMessage
     * */
    @Override
    public String getGenerateQuestionUserMessage(App app, int questionNum, int optionNum) {
        return "应用名称:" + app.getAppName() + "\n" +
                "应用描述:" + app.getAppDesc() + "\n" +
                "应用类别:" + app.getAppType() + "\n" +
                "题目数:" + questionNum + "\n" +
                "选项数:" + optionNum + "\n";
    }
    /*
     *  获取AI评分的userMessage
     * */
    @Override
    public String getAiTestScoringUserMessage(App app, List<QuestionContentVO> questionContentVOList, List<String> choices) {
        StringBuilder builder = new StringBuilder();
        builder.append("应用名称:").append(app.getAppName()).append("\n");
        builder.append("应用描述:").append(app.getAppDesc()).append("\n");
        ArrayList<Object> questionAnswers = new ArrayList<>();
        for (int i = 0; i < questionContentVOList.size(); i++) {
            QuestionAnswerRequest answerRequest = new QuestionAnswerRequest();
            answerRequest.setTitle(questionContentVOList.get(i).getTitle());
            answerRequest.setUserAnswer(choices.get(i));
            questionAnswers.add(answerRequest);
        }
        builder.append("用户答案:").append(JSONUtil.toJsonStr(questionAnswers));
        return builder.toString();
    }

}
