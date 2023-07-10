package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.Driver;

import java.util.List;

// DAO to access and update values from the customer table in the database
public interface CustomerDAO {
    public Customer save(Customer customer);
    public Customer getCustomerbyId(Integer id);
    public Customer deletebyId(Integer id);
    public void updateCustomer(Customer customer);
    public List<Customer> findAll();
    public Driver getDriverbyCabId(Integer id);
    public Customer getCustomerByUserId(Integer id);
}
