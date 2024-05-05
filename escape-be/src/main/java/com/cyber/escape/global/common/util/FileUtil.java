package com.cyber.escape.global.common.util;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.FileException;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class FileUtil {

	@Value("${cloud.aws.s3.bucket}")
	private static String bucket;
	@Value("${cloud.aws.s3.bucket}")
	public void setBucket(String bucketName) {
		bucket = bucketName;
	}
	private static AmazonS3 amazonS3;

	public FileUtil(AmazonS3 amazonS3){
		FileUtil.amazonS3 = amazonS3;
	}
	// S3 링크 반환

	public static String makeFileName(String fileName) {

		UUID uuid = UUID.randomUUID();

		String savedName = uuid + "_" + fileName;
		if(savedName.length() >= 50)
			throw new FileException(ExceptionCodeSet.FILE_NAME_TOO_LONG);
		return savedName;
	}

	// S3 링크 반환
	public static String uploadFile(MultipartFile multipartFile, String savedName) throws IOException {

		if(multipartFile == null || multipartFile.isEmpty())
			throw new FileException(ExceptionCodeSet.FILE_NOT_EXISTS);

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(bucket, "profiles/" + savedName, multipartFile.getInputStream(), metadata);
		String url = amazonS3.getUrl(bucket, "profiles/" + savedName).toString();

		return url;
	}

	public static String deleteFile(String fileName) throws IOException{

		try{
			// 삭제할 게 없으면 에러가 안 뜨네?
			amazonS3.deleteObject(bucket, "profiles/" + fileName);
		}
		catch (SdkClientException e){
			log.info("ERROR -- path : {} , message : {}", "profiles/" + fileName, e.getMessage());
			throw new IOException("ERROR deleting file from S3", e);
		}

		return "";
	}

}
