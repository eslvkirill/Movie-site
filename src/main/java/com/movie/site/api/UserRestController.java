package com.movie.site.api;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.*;
import com.movie.site.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@RestControllerAdvice
@RequiredArgsConstructor
@RequestMapping("/api/users")
@PreAuthorize("isAuthenticated()")
public class UserRestController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAnonymous()")
    public LoginUserDtoResponse create(@Valid @RequestBody CreateUserDtoRequest userDto) { // cookie here
        return userService.create(userDto);
    }

    @PostMapping("/cart/{movieId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addToCart(@PathVariable Long movieId) {
        userService.addToCart(movieId);
    }

    @DeleteMapping("/cart/{movieId}")
    public void removeFromCart(@PathVariable Long movieId) {
        userService.removeFromCart(movieId);
    }

    @DeleteMapping("/cart")
    public void clearCart() {
        userService.clearCart();
    }

    @GetMapping("/cart")
    public List<GetCartMovieDtoResponse> getCart(
            @PageableDefault(sort = "cartDetails.rank") Pageable pageable) {
        return userService.findCart(pageable);
    }

    @PostMapping("/category-items/{categoryId}-{movieId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCategoryItem(@PathVariable Long categoryId,
                                @PathVariable Long movieId) {
        userService.addCategoryItem(categoryId, movieId);
    }

    @DeleteMapping("/category-items/{categoryId}-{movieId}")
    public void removeCategoryItem(@PathVariable Long categoryId,
                                   @PathVariable Long movieId) {
        userService.removeCategoryItem(categoryId, movieId);
    }

    @GetMapping("/category-items")
    public Page<GetAllMovieDtoResponse> getCategoryItems(
            @RequestParam Long categoryId,
            @PageableDefault(sort = "categoryItems.id") Pageable pageable) {
        return userService.findAllCategoryItems(categoryId, pageable);
    }

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public void checkout() {
        userService.checkout();
    }

    @GetMapping("/orders")
    public Collection<OrderDtoResponse> getOrders() {
        return userService.findAllOrders();
    }

    @GetMapping("/orders/{orderId}/order-details")
    public Page<GetOrderDetailsMovieDtoResponse> getOrderDetails(
            @PathVariable Long orderId,
            @PageableDefault(sort = "orderDetails.rank") Pageable pageable) {
        return userService.findAllOrderDetails(orderId, pageable);
    }
}
