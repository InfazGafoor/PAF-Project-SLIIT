package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Class.Post;
import com.backend.backend.Repository.PostRepository;

import jakarta.transaction.Transactional;
 

 
@Service
@Transactional
public class PostService {
 
    @Autowired
    private PostRepository repo;
     
    public List<Post> listAll() {
        return repo.findAll();
    }
     
    public void save(Post post) {
        repo.save(post);
    }
     
    public Post get(Integer id) {
        return repo.findById(id).get();
    }
     
    public void delete(Integer id) {
        repo.deleteById(id);
    }

    public List<Post> getPostsByUploadedBy(String uploadedBy) {
        return repo.findByUploadedBy(uploadedBy);
    }

    
}