package com.lx.landada.utils;

import cn.hutool.json.JSONUtil;
import com.lx.landada.common.ErrorCode;
import com.lx.landada.exception.BusinessException;
import com.lx.landada.model.entity.*;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class QuestionResult {

    public static ScoringResult getTestQuestionResult(List<String> userAnswerList, List<AppAnswer> appAnswerList, List<ScoringResult> scoringResultList){
        HashMap<String, Integer> optionCount = new HashMap<>();
        for (AppAnswer appAnswer : appAnswerList) {
            for (String userAnswer : userAnswerList) {
                for (Map map : appAnswer.getOptions()) {
                    if(map.get("key").equals(userAnswer)){
                        String result = map.get("result").toString();
                        optionCount.put(result,optionCount.getOrDefault(result,0)+1);
                    }
                }
            }
        }
        ScoringResult maxResult = scoringResultList.get(0);
        List<String> propList = JSONUtil.toList(maxResult.getResultProp(), String.class);
        int maxScore = propList.stream().mapToInt(prop -> optionCount.getOrDefault(prop, 0)).sum();
        for (ScoringResult result : scoringResultList) {
            List<String> resultProps = JSONUtil.toList(result.getResultProp(), String.class);
            int score = resultProps.stream().mapToInt(prop -> optionCount.getOrDefault(prop, 0)).sum();
            if(score>maxScore){
                maxScore = score;
                maxResult = result;
            }
        }
        return maxResult;
    }

    public static ScoringResult getScoreQuestionResult(List<String> userAnswerList, List<AppAnswer> appAnswerList, List<ScoringResult> scoringResultList){
        int score = 0;
        for (int i = 0; i < appAnswerList.size(); i++) {
//            String correct = appAnswerList.get(i).getOptions().stream()
//                    .filter(item -> (Integer) item.get("score") > 0)
//                    .map(item -> (String) item.get("key"))
//                    .findFirst().orElse(null);
            String userKey = userAnswerList.get(i);
            Map correct = appAnswerList.get(i).getOptions().stream()
                    .filter(item -> item.get("key").equals(userKey))
                    .findFirst().orElse(null);
//            if(correct!=null && correct.equals(userAnswerList.get(i))){
//                score += 1;
//            }
            if(correct!=null && correct.get("key").equals(userKey)){
                score += (Integer) correct.get("score");
            }
        }
        ScoringResult scoringResult = null;
        for (ScoringResult result : scoringResultList) {
            Integer scoreRange = result.getResultScoreRange();
            if(score>=scoreRange){
                scoringResult =  result;
                break;
            }
        }
        if (scoringResult == null){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return scoringResult;
    }
    /*
    * 获取用户回答
    * */
    public static UserAnswer getUserAnswer(App app, List<String> choices, ScoringResult scoreQuestionResult){
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setAppId(app.getId());
        userAnswer.setAppType(app.getAppType());
        userAnswer.setScoringStrategy(app.getScoringStrategy());
        userAnswer.setChoices(choices.toString());
        userAnswer.setResultId(scoreQuestionResult.getId());
        userAnswer.setResultName(scoreQuestionResult.getResultName());
        userAnswer.setResultDesc(scoreQuestionResult.getResultDesc());
        userAnswer.setResultPicture(scoreQuestionResult.getResultPicture());
        userAnswer.setResultScore(scoreQuestionResult.getResultScoreRange());
        return userAnswer;
    }
}
