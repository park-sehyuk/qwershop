package com.example.qwershop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.itemImgLocation}")
    private String itemImgLocation;

    /**
     * [설정 변경] 컨트롤러 방식 대신 스프링 정적 리소스 핸들러 사용
     * - /item_images/** 주소로 들어오는 모든 요청을
     * - 리눅스 서버의 /var/www/html/k2505/p1/t3/ 폴더와 직접 연결합니다.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = itemImgLocation;

        // 경로 끝에 슬래시가 누락된 경우 처리
        if (!location.endsWith("/")) {
            location += "/";
        }

        // 브라우저 접근 경로: https://qwershop.devfolio.work/item_images/파일명.jpg
        // 실제 서버 파일 경로: file:/var/www/html/k2505/p1/t3/파일명.jpg
        registry.addResourceHandler("/item_images/**")
                .addResourceLocations("file:" + location);

        System.out.println(">>> [WebConfig] 정적 리소스 매핑 활성화");
        System.out.println(">>> 매핑 경로: /item_images/**");
        System.out.println(">>> 실제 위치: file:" + location);
    }
}