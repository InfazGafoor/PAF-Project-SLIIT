package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.Class.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

    void deleteById(Integer id);
    
}
