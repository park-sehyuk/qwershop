package com.example.qwershop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.uploadPath}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 브라우저의 /admin/posting/** 요청을 static/admin/posting/ 폴더로 연결
        registry.addResourceHandler(uploadPath + "**")
                .addResourceLocations("classpath:/static/admin/posting/")
                .setCachePeriod(0); // 개발 편의를 위해 캐시 끔

        System.out.println(">>> [WebConfig] 정적 리소스 매핑: " + uploadPath + "** -> static/admin/posting/");
    }
}