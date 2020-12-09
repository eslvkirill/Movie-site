package com.movie.site.api;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.GetAllDetailsMovieDtoResponse;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @PostMapping("/cartDetails/{movieId}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    public void addCartDetail(@PathVariable Long movieId) {
        userService.addCartDetail(movieId);
    }

    @DeleteMapping("/cartDetails/{movieId}")
    @PreAuthorize("isAuthenticated()")
    public void removeCartDetail(@PathVariable Long movieId) {
        userService.removeCartDetail(movieId);
    }

    @DeleteMapping("/cartDetails")
    @PreAuthorize("isAuthenticated()")
    public void removeAllCartDetails() {
        userService.removeAllCartDetails();
    }

    @GetMapping("/cartDetails")
    public List<GetAllDetailsMovieDtoResponse> getAllCartDetails(
            @PageableDefault(sort = "id") Pageable pageable) {
        return userService.findAllCartDetails(pageable);
    }
}
