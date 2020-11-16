package com.movie.site.service.impl;

import com.movie.site.exception.UserNotFoundException;
import com.movie.site.model.User;
import com.movie.site.repository.UserRepository;
import com.movie.site.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public User current() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
