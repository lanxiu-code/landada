package com.lx.landada.model.vo;

import lombok.Data;

import java.util.List;

/**
 * 题目对象结构
 */
@Data
public class QuestionContentVO {
    private String title;
    private List options;
}
