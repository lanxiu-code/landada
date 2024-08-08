package com.lx.landada.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lx.landada.common.BaseResponse;
import com.lx.landada.model.dto.app.AppQueryRequest;
import com.lx.landada.model.dto.review.ReviewRequest;
import com.lx.landada.model.entity.App;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lx.landada.model.vo.AppVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【app(应用)】的数据库操作Service
* @createDate 2024-07-19 08:45:24
*/
public interface AppService extends IService<App> {

    /**
     * 校验数据
     *
     * @param app
     * @param add 对创建的数据进行校验
     */
    void validApp(App app, boolean add);

    /**
     * 获取查询条件
     *
     * @param appQueryRequest
     * @return
     */
    QueryWrapper<App> getQueryWrapper(AppQueryRequest appQueryRequest);
    /*
    * 获取包装查询条件
    * */
    QueryWrapper<App> getQueryWrapperVO(AppQueryRequest appQueryRequest);

    /**
     * 获取应用封装
     *
     * @param app
     * @param request
     * @return
     */
    AppVO getAppVO(App app, HttpServletRequest request);

    /**
     * 分页获取应用封装
     *
     * @param appPage
     * @param request
     * @return
     */
    Page<AppVO> getAppVOPage(Page<App> appPage, HttpServletRequest request);
    /*
    * 审核应用
    * */
    BaseResponse<Boolean> doAppReview(ReviewRequest reviewRequest, HttpServletRequest request);
    /*
    * 检查应用是否审核
    * */
    boolean checkAppReview(Long appId);
}
