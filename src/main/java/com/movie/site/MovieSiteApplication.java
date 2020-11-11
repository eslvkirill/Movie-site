package com.movie.site;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration;

@SpringBootApplication(exclude = {ContextInstanceDataAutoConfiguration.class})
@EnableCaching
public class MovieSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieSiteApplication.class, args);
    }

}
