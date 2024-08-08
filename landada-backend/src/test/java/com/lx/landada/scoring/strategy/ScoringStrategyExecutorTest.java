package com.lx.landada.scoring.strategy;

import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.UserAnswer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ScoringStrategyExecutorTest {
    @Resource
    private ScoringStrategyExecutor scoringStrategyExecutor;
    @Test
    void testExecutor() throws Exception {
        List<String> list = Arrays.asList("D", "C", "B", "D", "A", "C", "C", "A", "B", "A");
        App app = new App();
        app.setId(2L);
        app.setAppType(0);
        app.setScoringStrategy(0);
        UserAnswer userAnswer = scoringStrategyExecutor.doScore(list, app);
        System.out.println(userAnswer);
    }
}