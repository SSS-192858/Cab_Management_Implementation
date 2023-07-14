package com.cabManagement.cabs.service;

import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.UserDAO;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private CustomerDAO customerDAO;
    private UserDAO userDAO;

    @Autowired
    public CustomerService(CustomerDAO customerDAO, UserDAO userDAO){
        this.userDAO = userDAO;
        this.customerDAO = customerDAO;
    }

    //method to save the customer data
    public Customer saveCustomer(Customer customer){
        return customerDAO.save(customer);
    }

    //method to find the customer data by id, throws exception if not found
    public Customer findCustomerById(Integer id) throws CustomerNotFoundException{
        Customer customer = customerDAO.getCustomerbyId(id);
        if(customer == null){
            throw new CustomerNotFoundException();
        }
        return customer;
    }

    //method to find all customers
    public List<Customer> findAllCustomers(){
        return this.customerDAO.findAll();
    }

    //method to delete the customer data by id, subsequently deletes the user data of the customer
    public Customer deleteCustomerById(Integer id) throws CustomerNotFoundException{
        Customer customer = customerDAO.getCustomerbyId(id);
        if(customer==null){
            throw new CustomerNotFoundException();
        }
        User user = customer.getUser();
        Customer c1 = this.customerDAO.deletebyId(id);
        userDAO.delete(user);
        return c1;
    }

    //method to update customer, throws exception if customer not found
    public Customer updateCustomer(Customer customer) throws CustomerNotFoundException {
        Customer c = this.customerDAO.getCustomerbyId(customer.getId());
        if(c == null){
            throw new CustomerNotFoundException();
        }
        return this.customerDAO.updateCustomer(customer);
    }

    //method to get customer data using USER ID
    public Customer getCustomerByUserId(Integer id){
        return this.customerDAO.getCustomerByUserId(id);
    }
}
