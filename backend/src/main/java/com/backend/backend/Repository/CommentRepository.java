package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.Class.Comment;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> getByPostId(String postId);

}

