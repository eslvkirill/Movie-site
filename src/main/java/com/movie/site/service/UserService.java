package com.movie.site.service;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.*;
import com.movie.site.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;
import java.util.List;

public interface UserService extends UserDetailsService, UniquenessService {

    LoginUserDtoResponse create(CreateUserDtoRequest userDto);

    void addToCart(Long movieId);

    void removeFromCart(Long movieId);

    void clearCart();

    List<GetCartMovieDtoResponse> findCart(Pageable pageable);

    User findCurrentLocal();

    void addCategoryItem(Long categoryId, Long movieId);

    void removeCategoryItem(Long categoryId, Long movieId);

    Page<GetAllMovieDtoResponse> findAllCategoryItems(Long categoryId,
                                                      Pageable pageable);

    void checkout();

    Collection<OrderDtoResponse> findAllOrders();

    Page<GetOrderDetailsMovieDtoResponse> findAllOrderDetails(Long orderId,
                                                              Pageable pageable);
}
