package com.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Class.Comment;
import com.backend.backend.Repository.CommentRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // Endpoint for getting all follows
    @GetMapping("")
    public List<Comment> getAllFollows() {
        return commentRepository.findAll();
    }

    @GetMapping("/searchComment/{post_id}")
    public List<Comment> getByPostId(@PathVariable("post_id") String postId) {
        return commentRepository.getByPostId(postId);
    }

    // Endpoint for creating a new follow
    @PostMapping("")
    public Comment createFollow(@RequestBody Comment follow) {
        return commentRepository.save(follow);
    }

    // Endpoint for deleting a follow by ID
    @DeleteMapping("/{id}")
    public boolean deleteFollowById(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return true;
    }
}