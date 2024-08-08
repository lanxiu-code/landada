package com.lx.landada.scoring.strategy;

import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.UserAnswer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.util.ArrayList;

@SpringBootTest
class ScoringStrategyContextTest {
    @Resource
    private ScoringStrategyContext scoringStrategyContext;
    @Test
    void testContext() throws Exception {
        ArrayList<String> list = new ArrayList<>();
        App app = new App();
        app.setAppType(1);
        app.setScoringStrategy(0);
        UserAnswer userAnswer = scoringStrategyContext.doScore(list, app);
        System.out.println(userAnswer);
    }

}