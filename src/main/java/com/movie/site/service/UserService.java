package com.movie.site.service;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService, UniquenessService {

    User current();

    LoginUserDtoResponse create(CreateUserDtoRequest userDto);
}
