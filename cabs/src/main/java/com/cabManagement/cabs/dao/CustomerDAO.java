package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Customer;

public interface CustomerDAO {
    public Customer save(Customer customer);
    public Customer getCustomerbyId(int id);
    public Customer deletebyId(int id);
    public void updateCustomer(Customer customer);
}
