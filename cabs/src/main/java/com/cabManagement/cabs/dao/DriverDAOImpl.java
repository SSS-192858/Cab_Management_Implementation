package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NonUniqueResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public Driver getDriverByCabRegNo(String reg_no){
        TypedQuery<Driver> query= this.entityManager.createQuery("FROM Cab where driver.id = :id", Driver.class);
        List<Driver> result = query.getResultList();

        if (result.isEmpty()){
            throw new CabNotFoundException();
        }else if (result.size() == 1) return result.get(0);

        throw new NonUniqueResultException();
    }
}
