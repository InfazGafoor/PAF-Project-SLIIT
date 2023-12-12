package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Class.Post;
 
public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByUploadedBy(String uploadedBy);
 
}