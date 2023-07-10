package com.cabManagement.cabs.entity;

import jakarta.persistence.*;


@Entity
// Role entity that will be mapped to role table.
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    role id.
    @Column(name = "role_id")
    private long id;

    @Column(name = "role_name")
//    name of the role.
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
