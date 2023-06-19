package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private DriverDAO driverDAO;
    private CabDAO cabDAO;

    @Autowired
    public DriverService(DriverDAO driverDAO, CabDAO cabDAO) {
        this.cabDAO = cabDAO;
        this.driverDAO = driverDAO;
    }

    public Driver saveDriver(Driver driver) {
        return driverDAO.save(driver);
    }

    public Driver findDriverById(Integer id) throws DriverNotFoundException {
        Driver driver = driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        return driver;
    }

    public List<Driver> findAll(){
        return this.driverDAO.findAllDrivers();
    }

    public Driver deleteDriverById(Integer id) throws DriverNotFoundException{
        Driver driver = this.driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        return driverDAO.deletebyId(id);
    }

    public Driver updateDriver(Driver driver) throws DriverNotFoundException {
        Driver d = this.driverDAO.getDriverbyId(driver.getId());
        if(d == null){
            throw new DriverNotFoundException();
        }
        this.driverDAO.updateDriver(driver);
        return driver;
    }

    public Driver getDriverByCabRegNo(String reg_no) throws CabNotFoundException {
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return driverDAO.getDriverByCabRegNo(reg_no);
    }
}
