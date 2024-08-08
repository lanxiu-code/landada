package com.lx.landada.esdao;

import java.util.List;

import com.lx.landada.model.entity.App;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * 帖子 ES 操作
 *
 * @author lx
 * 
 */
public interface PostEsDao extends ElasticsearchRepository<App, Long> {

    List<App> findByUserId(Long userId);
}