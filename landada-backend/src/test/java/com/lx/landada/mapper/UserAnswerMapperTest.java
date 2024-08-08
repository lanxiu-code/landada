package com.lx.landada.mapper;

import com.lx.landada.model.entity.UserAnswer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;

import java.util.List;

@SpringBootTest
class UserAnswerMapperTest {
    @Resource
    private UserAnswerMapper userAnswerMapper;
    @Resource
    private JdbcTemplate jdbcTemplate;
    @Test
    void test(){
//        List<UserAnswer> answers = userAnswerMapper.getUserAnswerList();
//        System.out.println(answers);
        String sql = "select * from landada.user_answer";
        List<UserAnswer> userAnswers = jdbcTemplate.query(sql, (resultSet, i) -> {
            UserAnswer userAnswer = new UserAnswer();
            userAnswer.setAppId(resultSet.getLong("appId"));
            userAnswer.setAppType(resultSet.getInt("appType"));
            userAnswer.setScoringStrategy(resultSet.getInt("scoringStrategy"));
            userAnswer.setChoices(resultSet.getString("choices"));
            userAnswer.setResultId(resultSet.getLong("resultId"));
            userAnswer.setResultName(resultSet.getString("resultName"));
            userAnswer.setResultDesc(resultSet.getString("resultDesc"));
            userAnswer.setResultPicture(resultSet.getString("resultPicture"));
            userAnswer.setResultScore(resultSet.getInt("resultScore"));
            userAnswer.setUserId(resultSet.getLong("userId"));
            userAnswer.setCreateTime(resultSet.getDate("createTime"));
            userAnswer.setUpdateTime(resultSet.getDate("updateTime"));
            userAnswer.setIsDelete(resultSet.getInt("isDelete"));
            return userAnswer;
        });
        String insertSql0 = "insert into landada.user_answer_0 (appId,appType,scoringStrategy,choices,resultId,resultName,resultDesc,resultPicture,resultScore,userId,createTime,updateTime,isDelete) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String insertSql1 = "insert into landada.user_answer_1 (appId,appType,scoringStrategy,choices,resultId,resultName,resultDesc,resultPicture,resultScore,userId,createTime,updateTime,isDelete) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        userAnswers.forEach(item->{
            if(item.getAppId()%2==0){
                jdbcTemplate.update(insertSql0,item.getAppId(),item.getAppType(),item.getScoringStrategy(),item.getChoices(),item.getResultId(),item.getResultName(),item.getResultDesc(),item.getResultPicture(),item.getResultScore(),item.getUserId(),item.getCreateTime(),item.getUpdateTime(),item.getIsDelete());
            }else{
                jdbcTemplate.update(insertSql1,item.getAppId(),item.getAppType(),item.getScoringStrategy(),item.getChoices(),item.getResultId(),item.getResultName(),item.getResultDesc(),item.getResultPicture(),item.getResultScore(),item.getUserId(),item.getCreateTime(),item.getUpdateTime(),item.getIsDelete());
            }
        });
    }
}