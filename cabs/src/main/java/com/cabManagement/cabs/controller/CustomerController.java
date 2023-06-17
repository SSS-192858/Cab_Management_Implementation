package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.service.CustomerService;
import com.cabManagement.cabs.service.JwtUserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.cabManagement.cabs.entity.Customer;
import java.util.List;
import com.cabManagement.cabs.entity.User;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private JwtTokenUtil jwtTokenUtil;
    private JwtUserDetailsService jwtUserDetailsService;
    private CustomerService customerService;

    public CustomerController(CustomerService customerService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil){
        this.jwtTokenUtil = jwtTokenUtil;
        this.customerService = customerService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @DeleteMapping("/delete/{custId}")
    public void deleteCustomerById(@PathVariable Integer custId){
        Customer customer = this.customerService.findCustomerById(custId);
        if(customer == null){
            throw new RuntimeException("Customer id : "+custId.toString()+" not found");
        }
        this.customerService.deleteCustomerById(custId);
    }

    @GetMapping("/getAll")
    public List<Customer> findAll() {
        return this.customerService.findAllCustomers();
    }

    @PutMapping("/update")
    public Customer updateCustomer(@RequestBody Customer customer, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        customer.setUser(user);
        return this.customerService.updateCustomer(customer);
    }

    @GetMapping("/getCustomer/{cust_id}")
    public Customer findCustomerByID(@PathVariable Integer cust_id) {
        return this.customerService.findCustomerById(cust_id);
    }

    @PostMapping("/save")
    public Customer saveCustomer(@RequestBody Customer customer, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        customer.setId(0);
        customer.setUser(user);
        this.customerService.saveCustomer(customer);
        return customer;
    }
}
