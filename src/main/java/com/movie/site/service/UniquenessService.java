package com.movie.site.service;

import java.util.Map;

public interface UniquenessService {

    Map<String, String> checkUniqueness(Object dto);
}
