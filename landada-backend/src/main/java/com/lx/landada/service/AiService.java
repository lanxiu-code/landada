package com.lx.landada.service;

import com.lx.landada.model.entity.App;
import com.lx.landada.model.vo.QuestionContentVO;
import com.zhipu.oapi.service.v4.model.ChatMessage;
import com.zhipu.oapi.service.v4.model.ModelData;
import io.reactivex.Flowable;
import org.checkerframework.checker.units.qual.A;

import java.util.List;

/**
 * AI服务
 */
public interface AiService {
    /**
     * @param messages 自定义消息
     * @param stream 流式传输
     * @param temperature 随机数
     * @return
     */
    String doRequest(List<ChatMessage> messages,Boolean stream,Float temperature);

    /**
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @param stream 流式传输
     * @param temperature 随机数
     * @return
     */
    String doRequest(String systemMessage,String userMessage,Boolean stream,Float temperature);

    /**
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @param temperature 随机数
     * @return
     */
    String doSyncRequest(String systemMessage,String userMessage,Float temperature);

    /**
     * 同步调用（答案比较稳定）
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @return
     */
    String doSyncStableRequest(String systemMessage,String userMessage);

    /**
     * 同步调用（答案不稳定）
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @return
     */
    String doSyncUnStableRequest(String systemMessage,String userMessage);

    /**
     * 通用流式请求
     * @param messages 消息列表
     * @param temperature 随机数
     * @return
     */
    Flowable<ModelData> doStreamRequest(List<ChatMessage> messages,Float temperature);
    /**
     * 通用流式请求（简化消息传递）
     * @param systemMessage 系统消息
     * @param userMessage 用户消息
     * @param temperature 随机数
     * @return
     */
    Flowable<ModelData> doStreamRequest(String systemMessage,String userMessage,Float temperature);
    /*
    *   获取生成题目的userMessage
    * */
    String getGenerateQuestionUserMessage(App app,int questionNum,int optionNum);
    /*
     *  获取AI评分的userMessage
     * */
    String getAiTestScoringUserMessage(App app, List<QuestionContentVO> questionContentVOList, List<String> choices);
}
