package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Driver;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class DriverDAOImpl implements DriverDAO{
    private EntityManager entityManager;

    public DriverDAOImpl() {}

    public DriverDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Driver save(Driver driver) {
        this.entityManager.merge(driver);
        return driver;
    }

    @Override
    public Driver getDriverbyId(int id) {
        return this.entityManager.find(Driver.class,id);
    }

    @Override
    @Transactional
    public Driver deletebyId(int id) {
        Driver driver = this.entityManager.find(Driver.class,id);
        this.entityManager.remove(driver);
        return driver;
    }

    @Override
    @Transactional
    public void updateDriver(Driver Driver) {
        this.entityManager.merge(Driver);
    }
}
