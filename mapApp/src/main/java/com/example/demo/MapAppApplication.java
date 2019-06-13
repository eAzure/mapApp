package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
@MapperScan("com.example.demo")
public class MapAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapAppApplication.class, args);
	}

}
