package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.exceptions.UnavailableForGivenDatesException;
import com.cabManagement.cabs.service.*;
import com.cabManagement.cabs.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {

    private RequestService requestService;
    private CustomerCabService customerCabService;
    private DriverService driverService;

    private JwtUserDetailsService jwtUserDetailsService;

    private JwtTokenUtil jwtTokenUtil;

    public RequestController(RequestService requestService, CustomerCabService customerCabService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil, DriverService driverService){
        this.requestService = requestService;
        this.customerCabService = customerCabService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.driverService = driverService;
    }

    @GetMapping("/requests/allRequests")
    public List<Request> getAllRequests(){
        return requestService.findAllRequests();
    }

    @GetMapping("/requests/cab/{reg_no}")
    public List<Request> getAllRequestsByStudentId(@PathVariable String reg_no){
        return requestService.getRequestByCabId(reg_no);
    }

    @GetMapping("/requests/{id}")
    public Request getRequestById(@PathVariable int id){
        return requestService.getRequestById(id);
    }

    @GetMapping("/requests/customer/{id}")
    public List<Request> getAllRequestsByCustomerId(@PathVariable int id){
        return requestService.getRequestByCustomerId(id);
    }

    @GetMapping("/requests/driver/{id}")
    public List<Request> getAllRequestsByDriverId(@PathVariable int id){
        return requestService.getRequestByDriverId(id);
    }

    @PostMapping("/requests/save")
    public Request saveRequest(@RequestBody Request request, @RequestHeader String Authorization){
        request.setId(0);
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Driver driver = driverService.getDriverByCabRegNo(request.getCab().getReg_no());
        request.getCustomer().setUser(user);
        request.getCustomer().addRequest(request);
        request.getCab().setDriver(driver);
        return requestService.saveRequest(request);
    }

    @DeleteMapping("/requests/delete/{id}")
    public void deleteRequest(@PathVariable Integer id){
        requestService.deleteRequestById(id);
    }

    @GetMapping("/customerCab/getAll")
    public List<CustomerCab> getAllCustomerCabs(){
        return this.customerCabService.findAll();
    }

    @GetMapping("/customerCab/{id}")
    public CustomerCab getCustomerCabById(@PathVariable Integer id){
        return customerCabService.findById(id);
    }

    @GetMapping("/customerCab/customer/{id}")
    public List<CustomerCab> getByCustomerId(@PathVariable Integer id){
        return customerCabService.getByCustomerId(id);
    }

    @GetMapping("/customerCab/driver/{id}")
    public List<CustomerCab> getCustomerByDriverId(@PathVariable Integer id){
        return customerCabService.getRequestByDriverId(id);
    }

    @GetMapping("/customerCab/cab/{reg_no}")
    public List<CustomerCab> getByCabId(@PathVariable String reg_no){
        return customerCabService.getByCabId(reg_no);
    }

    @PostMapping("/customerCab/save")
    public CustomerCab saveCustCabPair( @RequestBody CustomerCab customerCab)
    {
        return this.customerCabService.saveCustCabPair(customerCab);
    }

    @DeleteMapping("/customerCab/delete/{id}")
    public void deleteBookStudentById(@PathVariable Integer id){
        this.customerCabService.deleteCustCabPairById(id);
    }

    @PostMapping("/customerCab/accept")
    @Transactional
    public CustomerCab accept(@RequestBody Request request){
        if(customerCabService.doesRequestOverlap(request)){
            throw new UnavailableForGivenDatesException();
        }else{
            CustomerCab cc = new CustomerCab();
            cc.setEndDate(request.getEndDate());
            cc.setStartDate(request.getStartDate());
            cc.setCab(request.getCab());
            Driver driver = driverService.getDriverByCabRegNo(request.getCab().getReg_no());
            cc.getCab().setDriver(driver);
            cc.setCustomer(request.getCustomer());

            User user = jwtUserDetailsService.getUserByUsername(request.getCustomer().getUser().getUsername());
            cc.getCustomer().setUser(user);

            CustomerCab cc1 = saveCustCabPair(cc);
            requestService.deleteRequestById(request.getId());
            return cc1;
        }
    }
}
