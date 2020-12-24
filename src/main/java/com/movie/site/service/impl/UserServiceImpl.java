package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetCartMovieDtoResponse;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.exception.*;
import com.movie.site.mapper.UserMapper;
import com.movie.site.model.*;
import com.movie.site.model.enums.Role;
import com.movie.site.repository.UserRepository;
import com.movie.site.service.CategoryService;
import com.movie.site.service.MovieService;
import com.movie.site.service.SecurityService;
import com.movie.site.service.UserService;
import com.movie.site.util.ParsingUtils;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@PropertySource(value = "classpath:validation.properties", encoding = "UTF-8")
public class UserServiceImpl implements UserService {

    private final SecurityService securityService;
    private final MovieService movieService;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(SecurityService securityService, @Lazy MovieService movieService,
                           CategoryService categoryService, UserRepository userRepository,
                           UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.securityService = securityService;
        this.movieService = movieService;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Value("${unique.user.email}")
    private String uniqueEmailMessage;

    @Value("${unique.user.username}")
    private String uniqueUsernameMessage;

    private static final String EMAIL_FIELD = "email";
    private static final String USERNAME_FIELD = "username";

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> new UserNotFoundException(login));
    }

    @Override
    public LoginUserDtoResponse create(CreateUserDtoRequest userDto) {
        User user = userMapper.toEntity(userDto);

        String rawPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(Role.USER);

        user = userRepository.save(user);

        securityService.autoLogin(user, rawPassword);

        return userMapper.toDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, String> checkUniqueness(Object dto) {
        Map<String, String> errors = new HashMap<>();
        String email = ParsingUtils.parseObjectField(dto, EMAIL_FIELD, String.class);
        String username = ParsingUtils.parseObjectField(dto, USERNAME_FIELD, String.class);
        QUser user = QUser.user;

        BooleanExpression hasEmail = user.email.eq(email);

        userRepository.findOne(hasEmail)
                .ifPresent(u -> errors.put(EMAIL_FIELD, uniqueEmailMessage));

        BooleanExpression hasUsername = user.username.eq(username);

        userRepository.findOne(hasUsername)
                .ifPresent(u -> errors.put(USERNAME_FIELD, uniqueUsernameMessage));

        return errors;
    }

    @Override
    public void addToCart(Long movieId) {
        User user = getLoggedIn();

        if (!user.addToCart(movieService.findByIdLocal(movieId))) {
            throw new RepeatedCartDetailException(user.getUsername(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    public void removeFromCart(Long movieId) {
        User user = getLoggedIn();

        if (!user.removeFromCart(movieService.findByIdLocal(movieId))) {
            throw new CartDetailNotFoundException(user.getUsername(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    public void clearCart() {
        User user = getLoggedIn();

        user.clearCart();
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GetCartMovieDtoResponse> findCart(Pageable pageable) {
        return movieService.findAllByPossibleBuyer(getLoggedIn(), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public User findCurrentLocal() {
        return Optional.ofNullable(securityService.getCurrentUser())
                .map(User::getId).map(this::findUserById)
                .orElse(null);
    }

    @Override
    public void addCategoryItem(Long categoryId, Long movieId) {
        User user = getLoggedIn();
        Movie movie = movieService.findByIdLocal(movieId);

        Category category = categoryService.findByIdLocal(categoryId);

        if (!user.addCategoryItem(category, movie)) {
            throw new RepeatedCategoryItemException(user.getUsername(), category.getName(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    public void removeCategoryItem(Long categoryId, Long movieId) {
        User user = getLoggedIn();
        Movie movie = movieService.findByIdLocal(movieId);
        Category category = categoryService.findByIdLocal(categoryId);

        if (!user.removeCategoryItem(category, movie)) {
            throw new CategoryItemNotFoundException(user.getUsername(), category.getName(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GetAllMovieDtoResponse> findAllCategoryItems(Long categoryId,
                                                             Pageable pageable) {
        Category category = categoryService.findByIdLocal(categoryId);
        QMovie movie = QMovie.movie;
        BooleanExpression hasCategoryItem = movie.categoryItems.any().id.category.eq(category)
                .and(movie.categoryItems.any().id.user.eq(getLoggedIn()));

        return movieService.findAll(hasCategoryItem, pageable);
    }

    private User getLoggedIn() {
        return userRepository.getOne(securityService.getCurrentUser().getId());
    }

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
}
