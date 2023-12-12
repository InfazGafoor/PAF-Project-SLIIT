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
import com.backend.backend.Repository.FollowRepository;
import com.backend.backend.Service.FollowService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private FollowRepository followRepository;
    
    private final FollowService service;

    public FollowController(FollowService service) {
        this.service = service;
    }

    // Endpoint for getting all follows
    @GetMapping("")
    public List<Follow> getAllFollows() {
        return followRepository.findAll();
    }

    // Endpoint for creating a new follow
    @PostMapping("")
    public Follow createFollow(@RequestBody Follow follow) {
        return followRepository.save(follow);
    }

    // Endpoint for creating a new follow
    @GetMapping("/searchData")
    public ResponseEntity<List<Follow>> searchData(@RequestParam(name = "user", required = false) String user,
                                                @RequestParam(name = "friend", required = false) String friend) {
        List<Follow> result;

        if (user != null && friend != null) {
            // Search for data using both user and friend
            result = service.findByUserAndFriend(user, friend);
        } else if (user != null) {
            // Search for data using only user
            result = service.findByUser(user);
        } else if (friend != null) {
            // Search for data using only friend
            result = service.findByFriend(friend);
        } else {
            // Both user and friend are missing, return an empty list
            result = new ArrayList<>();
        }

        return ResponseEntity.ok(result);
    }

    // Endpoint for deleting a follow by ID
    @DeleteMapping("/{id}")
    public boolean deleteFollowById(@PathVariable Long id) {
        followRepository.deleteById(id);
        return true;
    }
}
