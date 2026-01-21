package com.nasa.apod_explorer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ApodExplorerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApodExplorerApplication.class, args);
		System.out.println("SpringBoot started");
		

		
		
	}

}
