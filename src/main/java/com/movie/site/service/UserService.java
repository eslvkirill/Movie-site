package com.movie.site.service;

import com.movie.site.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User current();
}
