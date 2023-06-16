package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.CustomerCab;
import com.cabManagement.cabs.entity.Request;

import java.util.List;

public interface CustCabDAO {

    public CustomerCab saveCustomerCab(CustomerCab customerCab);

    public CustomerCab findById(Integer reg_no);

    public CustomerCab deleteById(Integer reg_no);

    public List<CustomerCab> findAll();

    public List<CustomerCab> getByCustomerId(Integer id);

    public List<CustomerCab> getByCabId(String id);

    public List<CustomerCab> getByDriverId(Integer id);

    public boolean checkOverlap(Request request);

}

