package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Class.Comment;
import com.backend.backend.Repository.CommentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> listAll() {
        return commentRepository.findAll();
    }

    public Comment getById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public Comment save(Comment follow) {
        return commentRepository.save(follow);
    }

    public void delete(Long id) {
        commentRepository.deleteById(id);
    }
}
