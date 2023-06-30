package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private CustomerDAO customerDAO;

    @Autowired
    public CustomerService(CustomerDAO customerDAO){
        this.customerDAO = customerDAO;
    }

    public Customer saveCustomer(Customer customer){
        return customerDAO.save(customer);
    }

    public Customer findCustomerById(Integer id) throws CustomerNotFoundException{
        Customer customer = customerDAO.getCustomerbyId(id);
        if(customer == null){
            throw new CustomerNotFoundException();
        }
        return customer;
    }

    public List<Customer> findAllCustomers(){
        return this.customerDAO.findAll();
    }

    public Customer deleteCustomerById(Integer id) throws CustomerNotFoundException{
        Customer customer = customerDAO.getCustomerbyId(id);
        if(customer==null){
            throw new CustomerNotFoundException();
        }
        return customerDAO.deletebyId(id);
    }

    public Customer updateCustomer(Customer customer) throws CustomerNotFoundException {
        Customer c = this.customerDAO.getCustomerbyId(customer.getId());
        if(c == null){
            throw new CustomerNotFoundException();
        }
        this.customerDAO.updateCustomer(customer);
        return customer;
    }

    public Customer getCustomerByUserId(Integer id){
        return this.customerDAO.getCustomerByUserId(id);
    }
}
