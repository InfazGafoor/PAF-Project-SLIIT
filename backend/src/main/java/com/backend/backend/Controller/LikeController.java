package com.backend.backend.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Class.Follow;
import com.backend.backend.Class.Like;
import com.backend.backend.Repository.FollowRepository;
import com.backend.backend.Repository.LikeRepository;
import com.backend.backend.Service.FollowService;
import com.backend.backend.Service.LikeService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    // Endpoint for creating a new follow
    @PostMapping("")
    public Like createLike(@RequestBody Like like) {
        return likeRepository.save(like);
    }
}
