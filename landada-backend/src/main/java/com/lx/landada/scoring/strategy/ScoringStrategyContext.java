package com.lx.landada.scoring.strategy;

import com.lx.landada.common.ErrorCode;
import com.lx.landada.exception.BusinessException;
import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.UserAnswer;
import com.lx.landada.model.enums.AppTypeEnum;
import com.lx.landada.model.enums.ScoringStrategyEnum;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
//@Deprecated
public class ScoringStrategyContext {
    @Resource
    private ScoreScoringStrategy scoreScoringStrategy;
    @Resource
    private TestScoringStrategy testScoringStrategy;

    /**
     * 执行评分
     * @param choices 用户答案
     * @param app 应用信息
     * @return UserAnswer
     */
    public UserAnswer doScore(List<String> choices, App app) throws Exception{
        AppTypeEnum appTypeEnum = AppTypeEnum.getEnumByValue(app.getAppType());
        ScoringStrategyEnum strategyEnum = ScoringStrategyEnum.getEnumByValue(app.getScoringStrategy());
        if(appTypeEnum==null || strategyEnum == null){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"应用配置有误，未找到匹配的策略");
        }
        switch (appTypeEnum){
            case SCORE:
                switch (strategyEnum){
                    case CUSTOM:
                        return scoreScoringStrategy.doScore(choices,app);
                    case AI:
                        break;
                }
                break;
            case TEST:
                switch (strategyEnum){
                    case CUSTOM:
                        return testScoringStrategy.doScore(choices,app);
                    case AI:
                        break;
                }
                break;
        }
        throw new BusinessException(ErrorCode.SYSTEM_ERROR,"应用配置有误，未找到匹配的策略");
    }
}
