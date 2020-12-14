package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.GetAllDetailsMovieDtoResponse;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.exception.CartDetailNotFoundException;
import com.movie.site.exception.RepeatedCartDetailException;
import com.movie.site.exception.UserNotFoundException;
import com.movie.site.mapper.UserMapper;
import com.movie.site.model.Movie;
import com.movie.site.model.QUser;
import com.movie.site.model.User;
import com.movie.site.model.enums.Role;
import com.movie.site.repository.UserRepository;
import com.movie.site.service.MovieService;
import com.movie.site.service.SecurityService;
import com.movie.site.service.UserService;
import com.movie.site.util.ParsingUtils;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.movie.site.service.MovieService.checkPermissionToAccessMovie;

@Service
@Transactional
@PropertySource(value = "classpath:validation.properties", encoding = "UTF-8")
public class UserServiceImpl implements UserService {

    private final SecurityService securityService;
    private final MovieService movieService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(SecurityService securityService, @Lazy MovieService movieService,
                           UserRepository userRepository, UserMapper userMapper,
                           PasswordEncoder passwordEncoder) {
        this.securityService = securityService;
        this.movieService = movieService;
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
    public void addCartDetail(Long movieId) {
        User user = getLoggedIn();
        Movie movie = movieService.findByIdLocal(movieId);

        checkPermissionToAccessMovie(movie, user);

        if (!user.addToCart(movie)) {
            throw new RepeatedCartDetailException(user.getUsername(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    public void removeCartDetail(Long movieId) {
        User user = getLoggedIn();

        if (!user.removeFromCart(movieService.findByIdLocal(movieId))) {
            throw new CartDetailNotFoundException(user.getUsername(), movieId);
        }

        userRepository.save(user);
    }

    @Override
    public void removeAllCartDetails() {
        User user = getLoggedIn();

        user.clearCart();
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GetAllDetailsMovieDtoResponse> findAllCartDetails(Pageable pageable) {
        return movieService.findAllByPossibleBuyer(getLoggedIn(), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public User findCurrent() {
        return Optional.ofNullable(securityService.getCurrentUser())
                .map(User::getId).map(this::findUserById)
                .orElse(null);
    }

    private User getLoggedIn() {
        return userRepository.getOne(securityService.getCurrentUser().getId());
    }

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
}
