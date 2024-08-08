package com.lx.landada.mapper;

import com.lx.landada.model.entity.UserAnswer;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author 蓝朽
* @description 针对表【user_answer(用户答题记录)】的数据库操作Mapper
* @createDate 2024-07-19 08:44:27
* @Entity com.lx.landada.model.entity.UserAnswer
*/
public interface UserAnswerMapper extends BaseMapper<UserAnswer> {
    @Select("select * from landada.user_answer")
    List<UserAnswer> getUserAnswerList();
}




