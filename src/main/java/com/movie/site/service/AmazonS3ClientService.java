package com.movie.site.service;

import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

public interface AmazonS3ClientService {

    String upload(MultipartFile multipartFile, String prefix);

    @Named("downloadFile")
    byte[] download(String key);
}
