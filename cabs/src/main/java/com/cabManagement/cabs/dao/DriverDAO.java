package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Driver;

public interface DriverDAO {
    public Driver save(Driver Driver);
    public Driver getDriverbyId(int id);
    public Driver deletebyId(int id);
    public void updateDriver(Driver Driver);
}