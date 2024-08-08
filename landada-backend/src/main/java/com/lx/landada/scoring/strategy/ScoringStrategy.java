package com.lx.landada.scoring.strategy;

import com.lx.landada.model.entity.App;
import com.lx.landada.model.entity.UserAnswer;

import java.util.List;

public interface ScoringStrategy {
    /**
     * 执行评分
     * @param choices 用户答案
     * @param app 应用信息
     * @return UserAnswer
     */
    UserAnswer doScore(List<String> choices, App app) throws Exception;
}
