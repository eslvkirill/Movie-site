package com.movie.site.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.site.dto.response.LoginUserDtoResponse;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    private static final String USERNAME_PARAMETER = "login";

    public SecurityConfig(@Lazy @Qualifier("userServiceImpl") UserDetailsService userDetailsService,
                          ObjectMapper objectMapper) {
        this.userDetailsService = userDetailsService;
        this.objectMapper = objectMapper;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    @SneakyThrows
    public AuthenticationManager authenticationManagerBean() {
        return super.authenticationManagerBean();
    }

    @Override
    @SneakyThrows
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().permitAll()
            .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            .and()
                .formLogin()
                .successHandler((request, response, authentication) -> {
                    LoginUserDtoResponse userDto = new LoginUserDtoResponse();
                    userDto.setUsername(authentication.getName());

                    authentication.getAuthorities().stream()
                            .findFirst()
                            .ifPresent(role -> userDto.setRole(role.toString()));

                    response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
                    response.getOutputStream()
                            .print(objectMapper.writeValueAsString(userDto));
                })
                .failureHandler((request, response, ex) ->
                        response.sendError(HttpStatus.NOT_FOUND.value(), ex.getMessage())
                )
                .usernameParameter(USERNAME_PARAMETER)
            .and()
                .logout()
                .logoutSuccessHandler((request, response, authentication) -> {
                })
            .and()
                .cors()
            .and()
                .csrf()
                .disable();
    }

    @Override
    @SneakyThrows
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }
}
