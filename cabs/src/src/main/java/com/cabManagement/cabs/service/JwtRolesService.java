package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.RoleDAO;
import com.cabManagement.cabs.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtRolesService {
    @Autowired
    private RoleDAO roleDAO;

    //method to find the role by name
    public Role findByName(String name) {
        return roleDAO.findRoleByName(name);
    }
}
