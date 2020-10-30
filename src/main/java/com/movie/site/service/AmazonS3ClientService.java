package com.movie.site.service;

import org.springframework.web.multipart.MultipartFile;

public interface AmazonS3ClientService {

    String upload(MultipartFile multipartFile, String prefix);
}
