package com.movie.site.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface SecurityService {

    void autoLogin(UserDetails userDetails, String password);
}
