package com.lx.landada.scoring.strategy;

import com.lx.landada.annotation.ScoringStrategyConfig;
import com.lx.landada.common.ErrorCode;
import com.lx.landada.exception.BusinessException;
import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.UserAnswer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/*
* 评分策略全局执行器
* */
@Service
public class ScoringStrategyExecutor {
    // 策略列表
    @Resource
    private List<ScoringStrategy> scoringStrategyList;
    /*
    * 评分
    * */
    public UserAnswer doScore(List<String> choices, App app) throws Exception{
        Integer appType = app.getAppType();
        Integer scoringStrategy = app.getScoringStrategy();
        if(appType == null || scoringStrategy == null){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"应用配置有误，未找到匹配的策略");
        }
        // 根据注解配置选择策略
        for (ScoringStrategy strategy : scoringStrategyList) {
            if(strategy.getClass().isAnnotationPresent(ScoringStrategyConfig.class)){
                ScoringStrategyConfig strategyConfig = strategy.getClass().getAnnotation(ScoringStrategyConfig.class);
                if(strategyConfig.appType()==appType && strategyConfig.scoringStrategy() == scoringStrategy){
                    return strategy.doScore(choices,app);
                }
            }
        }
        throw new BusinessException(ErrorCode.SYSTEM_ERROR,"应用配置有误，未找到匹配的策略");
    }
}
