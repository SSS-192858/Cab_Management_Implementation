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

    @Autowired
    public CabService(CabDAO cabDAO, DriverDAO driverDAO){
        this.cabDAO = cabDAO;
        this.driverDAO = driverDAO;
    }

    public Cab saveCab(Cab cab){
        return this.cabDAO.saveCab(cab);
    }

    public Cab findCabById(String reg_no) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return cab;
    }

    public List<Cab> findAllCabs(){
        return this.cabDAO.findAllCabs();
    }

    public Cab deleteCabById(String reg_no) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(reg_no);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return cabDAO.deleteById(reg_no);
    }

    public Cab updateCab(Cab cab) throws CabNotFoundException {
        Cab c = this.cabDAO.findCabById(cab.getReg_no());
        if(c == null){
            throw new CabNotFoundException();
        }
        this.cabDAO.updateCab(cab);
        return cab;
    }

    public List<Cab> getCabsByDriverId(Integer id){
        return this.cabDAO.listCabsByDriverId(id);
    }

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
}
