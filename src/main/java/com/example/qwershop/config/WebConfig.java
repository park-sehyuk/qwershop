package com.example.qwershop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.itemImgLocation}")
    private String itemImgLocation;

    @Value("${file.upload.uploadPath}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String resourceLocation =
                Paths.get(itemImgLocation).toUri().toString();

        // 브라우저의 /admin/posting/** 요청을 static/admin/posting/ 폴더로 연결
        registry.addResourceHandler(uploadPath + "**")
                .addResourceLocations(resourceLocation)
                .setCachePeriod(0); // 개발 편의를 위해 캐시 끔

        System.out.println(">>> [WebConfig] URL: /" + uploadPath + "**");
        System.out.println(">>> [WebConfig] FILE: " + resourceLocation);
    }
}