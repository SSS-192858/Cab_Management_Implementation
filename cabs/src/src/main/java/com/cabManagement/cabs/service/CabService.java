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
public class CabService {
    private CabDAO cabDAO;
    private DriverDAO driverDAO;

    //all methods call the corresponding DAO methods, along with exception handling
    @Autowired
    public CabService(CabDAO cabDAO, DriverDAO driverDAO){
        this.cabDAO = cabDAO;
        this.driverDAO = driverDAO;
    }

    //method to save a cab
    public Cab saveCab(Cab cab){
        return this.cabDAO.saveCab(cab);
    }

    //method to find a cab using the registration number, throws exception if not found
    public Cab findCabById(String reg_no) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return cab;
    }

    //method to find all cabs in the service
    public List<Cab> findAllCabs(){
        return this.cabDAO.findAllCabs();
    }

    //method to delete the cab by registration number, throws exception if cab not found
    public Cab deleteCabById(String reg_no) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return cabDAO.deleteById(reg_no);
    }

    //method to update the cab, throws exception if cab not found
    public Cab updateCab(Cab cab) throws CabNotFoundException {
        Cab c = this.cabDAO.findCabById(cab.getReg_no());
        if(c == null){
            throw new CabNotFoundException();
        }
        this.cabDAO.updateCab(cab);
        return cab;
    }

    //method to get the cabs for a given driver, using driver id, throws exception if driver not found
    public List<Cab> getCabsByDriverId(Integer id) throws DriverNotFoundException{
        Driver driver = this.driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        return this.cabDAO.listCabsByDriverId(id);
    }

    //method to assign a driver to a cab, throws excpetion if cab or driver not found
    public Cab assignDriver(String reg_no, Driver driver) throws CabNotFoundException, DriverNotFoundException {
        Cab cab = this.cabDAO.findCabById(reg_no);
        Driver driver1 = this.driverDAO.getDriverbyId(driver.getId());
        if (cab == null) {
            throw new CabNotFoundException();
        }

        if (driver1 == null){
            throw new DriverNotFoundException();
        }

        cab.setDriver(driver1);
        return this.cabDAO.saveCab(cab);
    }

    //to remove the driver assigned to a cab, throws exception if cab not found
    public Cab removeDriver(String reg_no) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null) {
            throw new CabNotFoundException();
        }
        cab.setDriver(null);
        return this.cabDAO.updateCab(cab);
    }
}
