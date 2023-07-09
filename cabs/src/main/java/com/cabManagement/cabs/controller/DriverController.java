package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.service.DriverService;
import com.cabManagement.cabs.service.JwtUserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver")
@CrossOrigin(origins = "*")
public class DriverController {
    private JwtTokenUtil jwtTokenUtil;
    private JwtUserDetailsService jwtUserDetailsService;
    private DriverService driverService;

    public DriverController(DriverService driverService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil){
        this.jwtTokenUtil = jwtTokenUtil;
        this.driverService = driverService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @DeleteMapping("/delete/{driverId}")
    public void deleteDriverById(@PathVariable Integer driverId){
        Driver driver = this.driverService.findDriverById(driverId);
        if(driver == null){
            throw new DriverNotFoundException();
        }
        this.driverService.deleteDriverById(driverId);
    }

    @GetMapping("/getAll")
    public List<Driver> findAll() {
        return this.driverService.findAll();
    }

    @PutMapping("/update")
    public Driver updateDriver(@RequestBody Driver driver, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        driver.setUser(user);
        return this.driverService.updateDriver(driver);
    }

    @GetMapping("/getDriver/{driver_id}")
    public Driver findDriverByID(@PathVariable Integer driver_id) {
        return this.driverService.findDriverById(driver_id);
    }

    @PostMapping("/save")
    public Driver saveCustomer(@RequestBody Driver driver, @RequestHeader String Authorization) {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        driver.setId(0);
        driver.setUser(user);
        return this.driverService.saveDriver(driver);
    }

    @GetMapping("/getByUser")
    public Driver getDriverByUserId(@RequestHeader String Authorization) {
        User user = jwtUserDetailsService.getUserByUsername(jwtTokenUtil.getUsernameFromToken(Authorization.substring(7)));
        return this.driverService.getDriverByUserId(user.getId());
    }
}

