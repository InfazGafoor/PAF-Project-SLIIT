package com.backend.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Class.Follow;
import com.backend.backend.Repository.FollowRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FollowService {
    
    @Autowired
    private FollowRepository followRepository;

    public List<Follow> listAll() {
        return followRepository.findAll();
    }

    public Follow getById(Long id) {
        return followRepository.findById(id).orElse(null);
    }

    public Follow save(Follow follow) {
        return followRepository.save(follow);
    }

    public void delete(Long id) {
        followRepository.deleteById(id);
    }

    public List<Follow> findByUserAndFriend(String user, String friend) {
        return followRepository.findByUserAndFriend(user, friend);
    }

    public List<Follow> findByUser(String user) {
        return followRepository.findByUser(user);
    }

    public List<Follow> findByFriend(String friend) {
        return followRepository.findByFriend(friend);
    }

}
