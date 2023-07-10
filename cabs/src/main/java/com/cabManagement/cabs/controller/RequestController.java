package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.entity.CustomerCab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.entity.Request;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.exceptions.UnavailableForGivenDatesException;
import com.cabManagement.cabs.service.CustomerCabService;
import com.cabManagement.cabs.service.DriverService;
import com.cabManagement.cabs.service.JwtUserDetailsService;
import com.cabManagement.cabs.service.RequestService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
// this shall handle all the end points pertaining to requests.
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
//    function used to get all requests.
    public List<Request> getAllRequests(){
        return requestService.findAllRequests();
    }

    @GetMapping("/requests/cab/{reg_no}")
//    function used to get requests by cab reg_no.
    public List<Request> getAllRequestsByStudentId(@PathVariable String reg_no){
        return requestService.getRequestByCabId(reg_no);
    }

    @GetMapping("/requests/{id}")
//    function used to get request by id.
    public Request getRequestById(@PathVariable int id){
        return requestService.getRequestById(id);
    }

    @GetMapping("/requests/customer/{id}")
//    function used to get requests by customer id.
    public List<Request> getAllRequestsByCustomerId(@PathVariable int id){
        return requestService.getRequestByCustomerId(id);
    }

    @GetMapping("/requests/driver/{id}")
//    function to get requests by driver id.
    public List<Request> getAllRequestsByDriverId(@PathVariable int id){
        return requestService.getRequestByDriverId(id);
    }

    @PostMapping("/requests/save")
//    function to save request.
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
//    function to save requests by id.
    public void deleteRequest(@PathVariable Integer id){
        requestService.deleteRequestById(id);
    }

    @GetMapping("/customerCab/getAll")
//    functions to get all bookings.
    public List<CustomerCab> getAllCustomerCabs(){
        return this.customerCabService.findAll();
    }

    @GetMapping("/customerCab/{id}")
//    functions to get booking by booking id.
    public CustomerCab getCustomerCabById(@PathVariable Integer id){
        return customerCabService.findById(id);
    }

    @GetMapping("/customerCab/customer/{id}")
//    function to get bookings by customer id.
    public List<CustomerCab> getByCustomerId(@PathVariable Integer id){
        return customerCabService.getByCustomerId(id);
    }

    @GetMapping("/customerCab/driver/{id}")
//    function to get bookings by driver id.
    public List<CustomerCab> getCustomerCabByDriverId(@PathVariable Integer id){
        return customerCabService.getByDriverId(id);
    }

    @GetMapping("/customerCab/cab/{reg_no}")
//    function to bookings by cab reg_no
    public List<CustomerCab> getByCabId(@PathVariable String reg_no){
        return customerCabService.getByCabId(reg_no);
    }



    @DeleteMapping("/customerCab/delete/{id}")
//    delete booking by booking id.
    public void deleteBookStudentById(@PathVariable Integer id){
        this.customerCabService.deleteCustCabPairById(id);
    }

    @PostMapping("/customerCab/accept")
//    accept the request made by the customer and save it as customer cab.
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

            CustomerCab cc1 = customerCabService.saveCustCabPair(cc);
            requestService.deleteRequestById(request.getId());
            return cc1;
        }
    }
}
