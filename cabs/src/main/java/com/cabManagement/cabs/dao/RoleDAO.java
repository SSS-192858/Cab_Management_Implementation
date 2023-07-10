package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// table stores the roles of users (admin/driver/customer etc)
@Repository
public interface RoleDAO extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}
