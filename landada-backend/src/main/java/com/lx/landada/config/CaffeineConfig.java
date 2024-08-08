package com.lx.landada.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@Data
public class CaffeineConfig {
    @Bean
    public Cache<String,String> caffeineCache(){
        return Caffeine.newBuilder()
                .initialCapacity(1024)
                .expireAfterAccess(5,TimeUnit.MINUTES)
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .build();
    }
}
