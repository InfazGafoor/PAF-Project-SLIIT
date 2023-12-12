package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Class.Like;
import com.backend.backend.Repository.LikeRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public void saveLike(Like like) {
        likeRepository.save(like);
    }

    public void deleteLike(Integer id) {
        likeRepository.deleteById(id);
    }

    public Boolean checkLike(String pId, String user) {
        return null; 
    }
    
}
