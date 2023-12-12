package com.backend.backend.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Class.Post;
import com.backend.backend.Service.PostService;
 
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {
 
    @Autowired
    private PostService service;
     
    // RESTful API methods for Retrieval operations
     
    @GetMapping("/post")
    public List<Post> list() {
        return service.listAll();
    }
     
    @GetMapping("/post/{id}")
    public ResponseEntity<Post> get(@PathVariable Integer id) {
        try {
            Post product = service.get(id);
            return new ResponseEntity<Post>(product, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }      
    }
     
    // RESTful API method for Create operation
    @PostMapping("/post")
    public void add(@RequestBody Post product) {
        service.save(product);
    }

    //filter user post
    @GetMapping("/filterPostsByUploader/{uploadedBy}")
    public List<Post> getPostsByUploadedBy(@PathVariable String uploadedBy) {
        return service.getPostsByUploadedBy(uploadedBy);
    }
     
    // RESTful API method for Update operation 
    @PutMapping("/update_Post/{id}")
    public ResponseEntity<?> update(@RequestBody Post post, @PathVariable Integer id) {
        try {
            Post existProduct = service.get(id);
            service.save(post);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }     
    }
     
    // RESTful API method for Delete operation
    @DeleteMapping("/post/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
