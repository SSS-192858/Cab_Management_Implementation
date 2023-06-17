package com.cabManagement.cabs.controller;


import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cabs")
public class CabController {

    private CabService cabService;

    @Autowired
    public CabController (CabService cabService)
    {
        this.cabService = cabService;
    }

    @GetMapping("/allcabs")
    public List<Cab> findAllCabs(){
        return this.cabService.findAllCabs();
    }

    @GetMapping("/{reg_no}")
    public Cab findCabById(@PathVariable String reg_no) {
        Cab cab = this.cabService.findCabById(reg_no);
        return cab;
    }

    @DeleteMapping("/delete/{reg_no}")
    public Cab deleteCabById(@PathVariable String reg_no){
        return this.cabService.deleteCabById(reg_no);
    }

    @PutMapping("/updateCab")
    public Cab updateCab(@RequestBody  Cab cab)  {
        this.cabService.updateCab(cab);
        return cab;
    }

    @GetMapping("/getByDriverID/{id}")
    public List<Cab> getCabsByDriverId(@PathVariable Integer id){
        return this.cabService.getCabsByDriverId(id);
    }


    @PutMapping("/updateDriver/{reg_no}")
    public Cab assignDriver(@PathVariable String reg_no, @RequestBody Driver driver){
        return this.cabService.assignDriver(reg_no,driver);
    }

    @PostMapping("/addCab")
    public Cab addCab(@RequestBody Cab cab){
        return this.cabService.saveCab(cab);
    }
}
