package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// table stores the username and passwords of the users
@Repository
public interface UserDAO extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
