package com.lx.landada;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.lx.landada.model.entity.UserAnswer;
import com.lx.landada.service.UserAnswerService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest(classes = MainApplication.class)
public class UserAnswerShardingTest {
    @Resource
    private UserAnswerService userAnswerService;
    @Test
    public void shardingTest(){
        UserAnswer userAnswer1 = new UserAnswer();
        userAnswer1.setAppId(1L);
        userAnswer1.setUserId(1L);
        userAnswer1.setChoices("1");
        userAnswerService.save(userAnswer1);

        UserAnswer userAnswer2 = new UserAnswer();
        userAnswer1.setAppId(2L);
        userAnswer1.setUserId(1L);
        userAnswer1.setChoices("2");
        userAnswerService.save(userAnswer2);

        UserAnswer answer1 = userAnswerService.getOne(Wrappers.lambdaQuery(UserAnswer.class).eq(UserAnswer::getAppId, 1L));
        System.out.println(answer1);

        UserAnswer answer2 = userAnswerService.getOne(Wrappers.lambdaQuery(UserAnswer.class).eq(UserAnswer::getAppId, 2L));
        System.out.println(answer2);
    }
}
