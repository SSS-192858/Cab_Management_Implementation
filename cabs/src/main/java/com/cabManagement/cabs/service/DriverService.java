package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.dao.UserDAO;
import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private DriverDAO driverDAO;
    private UserDAO userDAO;
    private CabDAO cabDAO;

    @Autowired
    public DriverService(DriverDAO driverDAO, CabDAO cabDAO, UserDAO userDAO) {
        this.userDAO = userDAO;
        this.cabDAO = cabDAO;
        this.driverDAO = driverDAO;
    }

    //method to save the driver data
    public Driver saveDriver(Driver driver) {
        return driverDAO.save(driver);
    }

    //method to find a driver using the id, throws exception if driver not found
    public Driver findDriverById(Integer id) throws DriverNotFoundException {
        Driver driver = driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        return driver;
    }

    //method to find all drivers registered with the service
    public List<Driver> findAll(){
        return this.driverDAO.findAllDrivers();
    }

    //method to delete the driver by id, subsequently also deletes the user record for the same, throws exception if no driver found
    public Driver deleteDriverById(Integer id) throws DriverNotFoundException{
        Driver driver = this.driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        User user = driver.getUser();
        Driver d1 = driverDAO.deletebyId(id);
        userDAO.delete(user);
        return d1;
    }

    //method to update driver details, throws exception if driver not found
    public Driver updateDriver(Driver driver) throws DriverNotFoundException {
        Driver d = this.driverDAO.getDriverbyId(driver.getId());
        if(d == null){
            throw new DriverNotFoundException();
        }
        this.driverDAO.updateDriver(driver);
        return driver;
    }

    //method to get driver for a given cab
    public Driver getDriverByCabRegNo(String reg_no) throws CabNotFoundException {
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return driverDAO.getDriverByCabRegNo(reg_no);
    }

    //method to get driver details through the USER ID of the driver
    public Driver getDriverByUserId(Integer id){
        return this.driverDAO.getDriverByUserId(id);
    }
}
