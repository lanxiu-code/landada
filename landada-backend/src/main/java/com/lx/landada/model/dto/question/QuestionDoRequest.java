package com.lx.landada.model.dto.question;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.lx.landada.model.dto.app.AppAddRequest;
import com.lx.landada.model.entity.App;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
@Data
public class QuestionDoRequest implements Serializable {
    /*
    * app信息
    * */
    private App app;
    /*
    * 做题信息
    * */
    private List<String> choices;

    private static final long serialVersionUID = 1L;

}
