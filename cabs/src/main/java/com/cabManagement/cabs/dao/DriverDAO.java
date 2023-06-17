package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Driver;
import java.util.*;

public interface DriverDAO {
    public Driver save(Driver Driver);
    public Driver getDriverbyId(int id);
    public Driver deletebyId(int id);
    public void updateDriver(Driver Driver);
    public List<Driver> findAllDrivers();
    public Driver getDriverByCabRegNo(String reg_no);
}