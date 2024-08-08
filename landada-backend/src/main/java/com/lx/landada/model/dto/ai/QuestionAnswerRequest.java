package com.lx.landada.model.dto.ai;

import lombok.Data;
/*
* ai评分请求
* */
@Data
public class QuestionAnswerRequest {
    /*
    * 题目
    * */
    private String title;
    /*
    * 用户答案
    * */
    private String userAnswer;
}
