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
	// Todo : default 파일 업로드 후 변경
	public static final String DEFAULT_FILE_NAME = "default_name";
	public static final String DEFAULT_FILE_URL = "default_url";

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

	public static String makeFileName(String originalFileName) {

		UUID uuid = UUID.randomUUID();

		String savedFileName = uuid + "_" + originalFileName;
		if(savedFileName.length() >= 50)
			throw new FileException(ExceptionCodeSet.FILE_NAME_TOO_LONG);
		return savedFileName;
	}

	// S3 링크 반환
	public static String uploadFile(MultipartFile multipartFile, String savedFileName) throws IOException {
		checkFileValidation(multipartFile, savedFileName);

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(bucket, "profiles/" + savedFileName, multipartFile.getInputStream(), metadata);
		String url = amazonS3.getUrl(bucket, "profiles/" + savedFileName).toString();

		return url;
	}

	private static void checkFileValidation(MultipartFile multipartFile, String savedFileName) {
		if(multipartFile == null || multipartFile.isEmpty()) {
			throw new FileException(ExceptionCodeSet.FILE_NOT_EXISTS);
		}
		if(amazonS3.doesObjectExist(bucket, "profiles/" + savedFileName)) {
			throw new FileException(ExceptionCodeSet.FILE_DUPLICATED);
		}
	}

	public static String deleteFile(String savedFileName) throws IOException{

		try{
			// 삭제할 게 없으면 에러가 안 뜨네?
			amazonS3.deleteObject(bucket, "profiles/" + savedFileName);
		}
		catch (SdkClientException e){
			log.info("ERROR -- path : {} , message : {}", "profiles/" + savedFileName, e.getMessage());
			throw new IOException("ERROR deleting file from S3", e);
		}

		return "";
	}

}
