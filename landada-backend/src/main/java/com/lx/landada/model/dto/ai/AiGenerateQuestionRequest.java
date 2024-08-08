package com.lx.landada.model.dto.ai;

import lombok.Data;

import java.io.Serializable;
/*
* AI 生成问题请求
* */
@Data
public class AiGenerateQuestionRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    /*
    * ID
    * */
    private Long appId;
    /*
    * 题目数
    * */
    int questionNum = 10;
    /*
    * 选项数
    * */
    int optionNum = 2;
}
