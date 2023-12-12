package com.backend.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.Class.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByUserAndFriend(String user, String friend);
    List<Follow> findByUser(String user);
    List<Follow> findByFriend(String friend);


}
