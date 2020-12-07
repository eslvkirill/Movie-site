package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateUserDtoRequest;
import com.movie.site.dto.response.LoginUserDtoResponse;
import com.movie.site.exception.UserNotFoundException;
import com.movie.site.mapper.UserMapper;
import com.movie.site.model.QUser;
import com.movie.site.model.User;
import com.movie.site.model.enums.Role;
import com.movie.site.repository.UserRepository;
import com.movie.site.service.SecurityService;
import com.movie.site.service.UserService;
import com.movie.site.util.ParsingUtils;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@PropertySource(value = "classpath:validation.properties", encoding = "UTF-8")
public class UserServiceImpl implements UserService {

    private final SecurityService securityService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

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
    public User current() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return Optional.of(auth)
                .filter(authentication -> !(authentication instanceof AnonymousAuthenticationToken))
                .map(authentication -> (User) authentication.getPrincipal())
                .orElseGet(User::new);
    }

    @Override
    @Transactional
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
}
