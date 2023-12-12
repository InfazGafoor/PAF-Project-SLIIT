package com.backend.backend.Class;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String body;
    private String file;
    private String uploadedBy;
    private String time_stamp;
 
    public Post() { }
 
    public Post(String title, String body, String file, String uploadedBy) {
        this.title = title;
        this.body = body;
        this.file = file;
        this.uploadedBy = uploadedBy;
    }
 
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
    public String getBody() {
        return body;
    }
 
    public void setBody(String body) {
        this.body = body;
    }
 
    public String getFile() {
        return file;
    }
 
    public void setFile(String file) {
        this.file = file;
    }
 
    public String getUploadedBy() {
        return uploadedBy;
    }
 
    public void setUploadedBy(String uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
 
    public String getTimeStamp() {
        return time_stamp;
    }
 
    public void setTimeStamp(String time_stamp) {
        this.time_stamp = time_stamp;
    }
}
