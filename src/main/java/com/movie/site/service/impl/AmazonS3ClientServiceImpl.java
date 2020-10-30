package com.movie.site.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.movie.site.service.AmazonS3ClientService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AmazonS3ClientServiceImpl implements AmazonS3ClientService {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Override
    @SneakyThrows
    public String upload(MultipartFile multipartFile, String prefix) {
        String key = prefix + UUID.randomUUID().toString();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());

        amazonS3Client.putObject(bucketName, key,
                multipartFile.getInputStream(), objectMetadata);

        return key;
    }
}
