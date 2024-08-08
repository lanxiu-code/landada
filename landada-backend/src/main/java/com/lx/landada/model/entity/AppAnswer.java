package com.lx.landada.model.entity;

import lombok.Data;

import java.util.List;
import java.util.Map;

/*
* 应用题目答案
* */
@Data
public class AppAnswer {
    private List<Map> options;
    private String title;
}
