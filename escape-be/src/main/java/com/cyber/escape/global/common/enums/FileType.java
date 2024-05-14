package com.cyber.escape.global.common.enums;

public enum FileType{

    profiles("profiles/"),
    quiz("quiz-image/");
    private final String path;
    FileType(String path){
        this.path = path;
    }
    public String getPath(){
        return path;
    }
}