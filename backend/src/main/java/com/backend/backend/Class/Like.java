package com.backend.backend.Class;

import java.security.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String user;
    private String postid;
 
    @Column(name = "timeStamp")
    private String timeStamp;
   
    public Like() {}

    public Like(String user, String postid, String timeStamp) {
        this.user = user;
        this.postid = postid;
        this.timeStamp = timeStamp;
    }
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPostId() {
        return postid;
    }

    public void setPostId(String postid) {
        this.postid = postid;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }
 
}
