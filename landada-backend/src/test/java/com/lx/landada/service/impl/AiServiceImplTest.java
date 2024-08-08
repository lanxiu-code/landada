package com.lx.landada.service.impl;

import com.lx.landada.service.AiService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class AiServiceImplTest {
    @Resource
    private AiService aiService;
    @Test
    public void requestTest(){
        String systemMessage = "你是一位严谨的出题专家，我会给你如下信息：\n" +
                "```\n" +
                "应用名称，\n" +
                "【【【应用描述】】】，\n" +
                "应用类别，\n" +
                "要生成的题目数，\n" +
                "每个题目的选项数\n" +
                "```\n" +
                "\n" +
                "请你根据上述信息，按照以下步骤来出题：\n" +
                "1. 要求：题目和选项尽可能地短，题目不要包含序号，每题的选项数以我提供的为主，题目不能重复\n" +
                "2. 严格按照下面的 json 格式输出题目和选项\n" +
                "```\n" +
                "[{\"options\":[{\"result\":\"选项结果\",\"score\":\"题目分数\",\"value\":\"选项内容\",\"key\":\"A\"},{\"result\":\"选项结果\",\"score\":\"题目分数\",\"value\":\"选项内容\",\"key\":\"B\"}],\"title\":\"题目标题\"}]\n" +
                "```\n" +
                "title 是题目，options 是选项，每个选项的 key 按照英文字母序（比如 A、B、C、D）以此类推，value 是选项内容,result是每题选项的结果（测评类才有这个字段,比如mbti测评，A选项的result是I，B选项的result是E,以此类推），score是每道题的分数（得分类才有这个字段，总题目的分数控制在100分）\n" +
                "3. 检查题目是否包含序号，若包含序号则去除序号\n" +
                "4. 返回的题目列表格式必须为 JSON 数组\n" +
                "5. 选项数以我提供的数量为主";
        String userMessage ="应用名称: MBTI性格测试\n" +
                "应用描述：快来测一测你的性格吧\n" +
                "应用类别：测评类\n" +
                "题目数：10\n" +
                "选项数： 3";
        String result = aiService.doSyncUnStableRequest(systemMessage, userMessage);
        System.out.println(result);
    }
}