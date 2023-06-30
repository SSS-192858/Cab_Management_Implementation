package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DriverDAOImpl implements DriverDAO{
    private EntityManager entityManager;

    @Autowired
    public DriverDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Driver save(Driver driver) {
        return this.entityManager.merge(driver);
    }

    @Override
    public Driver getDriverbyId(int id){
        return this.entityManager.find(Driver.class,id);
    }

    @Override
    public List<Driver> findAllDrivers(){
        TypedQuery<Driver> query = this.entityManager.createQuery("FROM Driver", Driver.class);
        return query.getResultList();
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

    @Override
    public Driver getDriverByCabRegNo(String reg_no) throws CabNotFoundException{
        Cab cab = this.entityManager.find(Cab.class, reg_no);
        return cab.getDriver();
    }

    @Override
    public Driver getDriverByUserId(Integer id) {
        TypedQuery<Driver> query = entityManager.createQuery("FROM Driver where user.id = :id", Driver.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }
}
