package com.example.qwershop;

import org.mybatis.spring.annotation.MapperScan; // 이 줄 추가
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.qwershop.**.mapper") // 이 줄 추가 (모든 mapper 패키지를 스캔함)
public class QwershopApplication {

	public static void main(String[] args) {
		SpringApplication.run(QwershopApplication.class, args);
	}

}