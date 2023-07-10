package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.service.CustomerService;
import com.cabManagement.cabs.service.JwtUserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
// shall cater to all the end points and functionalities related to customer.
public class CustomerController {
    private JwtTokenUtil jwtTokenUtil;
    private JwtUserDetailsService jwtUserDetailsService;
    private CustomerService customerService;

    public CustomerController(CustomerService customerService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil){
        this.jwtTokenUtil = jwtTokenUtil;
        this.customerService = customerService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    //endpoint to delete the customer record, also deleted the user recors
    @DeleteMapping("/delete/{custId}")
    public void deleteCustomerById(@PathVariable Integer custId){
        Customer customer = this.customerService.findCustomerById(custId);
        if(customer == null){
            throw new RuntimeException("Customer id : "+custId.toString()+" not found");
        }
        this.customerService.deleteCustomerById(custId);
    }

    // fn to get all the customers.
    @GetMapping("/getAll")
    public List<Customer> findAll() {
        return this.customerService.findAllCustomers();
    }

    //endpoint to update the customer details, the user is obtained through the token
    @PutMapping("/update")
    public Customer updateCustomer(@RequestBody Customer customer, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        customer.setUser(user);
        return this.customerService.updateCustomer(customer);
    }

    // fn to get customer by customer id.
    @GetMapping("/getCustomer/{cust_id}")
    public Customer findCustomerByID(@PathVariable Integer cust_id) {
        return this.customerService.findCustomerById(cust_id);
    }

    // fn to save a customer
    @PostMapping("/save")
    public Customer saveCustomer(@RequestBody Customer customer, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        customer.setId(0);
        customer.setUser(user);
        this.customerService.saveCustomer(customer);
        return customer;
    }

    //to get customer info through user id, which is obtained from token
    @GetMapping("/getByUser")
    public Customer getCustomerByUserId(@RequestHeader String Authorization) {
        User user = jwtUserDetailsService.getUserByUsername(jwtTokenUtil.getUsernameFromToken(Authorization.substring(7)));
        return this.customerService.getCustomerByUserId(user.getId());
    }
}
