package com.cabManagement.cabs.service;

import com.cabManagement.cabs.entity.*;
import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.CustCabDAO;
import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.CustomerCab;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerCabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerCabService {
    private CustCabDAO custCabDAO;

    private CustomerDAO customerDAO;

    private CabDAO cabDAO;

    @Autowired
    public CustomerCabService(CustCabDAO custCabDAO,CustomerDAO customerDAO,CabDAO cabDAO)
    {
        this.custCabDAO = custCabDAO;
        this.customerDAO = customerDAO;
        this.cabDAO = cabDAO;
    }

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

    public CustomerCab deleteCustCabPairById(Integer id) throws CustomerCabNotFoundException {
        CustomerCab cc = this.custCabDAO.findById(id);
        if(cc == null){
            throw new CustomerCabNotFoundException();
        }
        return this.custCabDAO.deleteById(id);
    }

    public CustomerCab findById(Integer id) throws CustomerCabNotFoundException{
        CustomerCab customerCab = this.custCabDAO.findById(id);
        if (customerCab == null){
            throw new CustomerCabNotFoundException();
        }
        return customerCab;
    }

    public List<CustomerCab> findAll(){
        return custCabDAO.findAll();
    }

    public List<CustomerCab> getByCustomerId(Integer id) {
        return this.custCabDAO.getByCustomerId(id);
    }

    public List<CustomerCab> getByCabId(String id) {
        return this.custCabDAO.getByCabId(id);
    }

    public List<CustomerCab> getRequestByDriverId(Integer id) {
        return this.custCabDAO.getByDriverId(id);
    }

    public Boolean doesRequestOverlap(Request request){
        return this.custCabDAO.checkOverlap(request);
    }

}
