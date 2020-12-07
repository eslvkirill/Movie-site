package com.movie.site.mapper;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface UserMapper {

    @Mapping(target = "active", constant = "true")
    User toEntity(CreateUserDtoRequest userDto);

    LoginUserDtoResponse toDto(User user);
}
