package com.movie.site.service;

import com.movie.site.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface SecurityService {

    void autoLogin(UserDetails userDetails, String password);

    User getCurrentUser();
}
