package com.movie.site.api;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestControllerAdvice
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserRestController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LoginUserDtoResponse create(@Valid @RequestBody CreateUserDtoRequest userDto) { // cookie here
        return userService.create(userDto);
    }
}
