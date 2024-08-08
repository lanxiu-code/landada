package com.lx.landada.controller;

import com.lx.landada.model.dto.ai.AiGenerateQuestionRequest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class AiControllerTest {
    @Resource
    private AiController aiController;
    @Test
    void testPool() throws InterruptedException {
        AiGenerateQuestionRequest questionRequest = new AiGenerateQuestionRequest();
        questionRequest.setAppId(3L);
        questionRequest.setQuestionNum(10);
        questionRequest.setOptionNum(2);

//        aiController.aiGenerateQuestionSSE(questionRequest,"user");
//        aiController.aiGenerateQuestionSSE(questionRequest,"user");
//        aiController.aiGenerateQuestionSSE(questionRequest,"vip");

        //Thread.sleep(1000000);

    }

}