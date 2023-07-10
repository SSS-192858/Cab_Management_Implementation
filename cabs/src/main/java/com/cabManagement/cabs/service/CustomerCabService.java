package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.CustCabDAO;
import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.entity.*;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerCabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerCabService {
    private CustCabDAO custCabDAO;

    private CustomerDAO customerDAO;

    private DriverDAO driverDAO;
    private CabDAO cabDAO;

    @Autowired
    public CustomerCabService(CustCabDAO custCabDAO,CustomerDAO customerDAO,CabDAO cabDAO, DriverDAO driverDAO)
    {
        this.custCabDAO = custCabDAO;
        this.customerDAO = customerDAO;
        this.cabDAO = cabDAO;
        this.driverDAO = driverDAO;
    }

    //method to save a customer cab assignment record, throws exception if customer or cab not found
    public CustomerCab saveCustCabPair(CustomerCab customerCab) throws CustomerNotFoundException, CabNotFoundException
    {
        Integer cusid = customerCab.getCustomer().getId();
        Customer customer = this.customerDAO.getCustomerbyId(cusid);
        if(customer==null)
        {
            throw new CustomerNotFoundException();
        }
        String cabid = customerCab.getCab().getReg_no();
        Cab cab = this.cabDAO.findCabById(cabid);
        if(cab==null)
        {
            throw new CabNotFoundException();
        }
        return this.custCabDAO.saveCustomerCab(customerCab);
    }

    //method to delete a record by id, throws exception if record not found
    public CustomerCab deleteCustCabPairById(Integer id) throws CustomerCabNotFoundException {
        CustomerCab cc = this.custCabDAO.findById(id);
        if(cc == null){
            throw new CustomerCabNotFoundException();
        }
        return this.custCabDAO.deleteById(id);
    }

    //method to find the record using id, throws exception if record not found
    public CustomerCab findById(Integer id) throws CustomerCabNotFoundException{
        CustomerCab customerCab = this.custCabDAO.findById(id);
        if (customerCab == null){
            throw new CustomerCabNotFoundException();
        }
        return customerCab;
    }

    //method to find all the records in db
    public List<CustomerCab> findAll(){
        return custCabDAO.findAll();
    }

    //method to get records by customer id, throws exception if customer not found
    public List<CustomerCab> getByCustomerId(Integer id) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.getCustomerbyId(id);
        if (customer == null){
            throw new CustomerNotFoundException();
        }
        return this.custCabDAO.getByCustomerId(id);
    }

    //method to get records by cab id, throws exception if cab not found
    public List<CustomerCab> getByCabId(String id) throws CabNotFoundException{
        Cab cab = this.cabDAO.findCabById(id);
        if (cab == null){
            throw new CabNotFoundException();
        }
        return this.custCabDAO.getByCabId(id);
    }

    //method to get records by driver id, throws exception if driver not found
    public List<CustomerCab> getByDriverId(Integer id) throws DriverNotFoundException {
        Driver driver = this.driverDAO.getDriverbyId(id);
        if (driver == null){
            throw new DriverNotFoundException();
        }
        return this.custCabDAO.getByDriverId(id);
    }

    //to check if request overlaps with an already existing record or not, i.e. if the dates clash
    public Boolean doesRequestOverlap(Request request){
        return this.custCabDAO.checkOverlap(request);
    }

}
