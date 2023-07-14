package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Driver;

import java.util.List;

// DAO to access and update values from the driver table in the database
public interface DriverDAO {
    public Driver save(Driver Driver);
    public Driver getDriverbyId(int id);
    public Driver deletebyId(int id);
    public Driver updateDriver(Driver Driver);
    public List<Driver> findAllDrivers();
    public Driver getDriverByCabRegNo(String reg_no);
    public Driver getDriverByUserId(Integer id);
}