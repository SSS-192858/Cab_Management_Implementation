package com.cabManagement.cabs.controller;


import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// contains all the various end points relating to cabs and the methods that can be performed on them,
// using appropriate service class methods

@RestController
@RequestMapping("/cabs")
@CrossOrigin(origins = "*")
public class CabController {

    private CabService cabService;

    @Autowired
    public CabController (CabService cabService)
    {
        this.cabService = cabService;
    }

    // get all cabs from database
    @GetMapping("/allCabs")
    public List<Cab> findAllCabs(){
        return this.cabService.findAllCabs();
    }

    // get a specific cab by its registration number
    @GetMapping("/{reg_no}")
    public Cab findCabById(@PathVariable String reg_no) {
        return this.cabService.findCabById(reg_no);
    }

    // delete cab by registration number
    @DeleteMapping("/delete/{reg_no}")
    public Cab deleteCabById(@PathVariable String reg_no){
        return this.cabService.deleteCabById(reg_no);
    }

    // update existing cab
    @PutMapping("/updateCab")
    public Cab updateCab(@RequestBody  Cab cab)  {
        this.cabService.updateCab(cab);
        return cab;
    }

    // get all cabs driven by a particular driver
    @GetMapping("/getByDriverId/{id}")
    public List<Cab> getCabsByDriverId(@PathVariable Integer id){
        return this.cabService.getCabsByDriverId(id);
    }

    // update driver that is assigned to a cab
    @PutMapping("/updateDriver/{reg_no}")
    public Cab assignDriver(@PathVariable String reg_no, @RequestBody Driver driver){
        return this.cabService.assignDriver(reg_no,driver);
    }

    // save a new cab to the database
    @PostMapping("/addCab")
    public Cab addCab(@RequestBody Cab cab){
        return this.cabService.saveCab(cab);
    }

    // remove the assigned driver to a cab
    @PutMapping("/removeDriver/{reg_no}")
    public Cab removeDriver(@PathVariable String reg_no){
        return this.cabService.removeDriver(reg_no);
    }
}
