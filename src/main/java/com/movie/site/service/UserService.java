package com.movie.site.service;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.GetAllDetailsMovieDtoResponse;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService, UniquenessService {

    LoginUserDtoResponse create(CreateUserDtoRequest userDto);

    void addCartDetail(Long movieId);

    void removeCartDetail(Long movieId);

    void removeAllCartDetails();

    List<GetAllDetailsMovieDtoResponse> findAllCartDetails(Pageable pageable);

    User findCurrent();
}
