package com.cabManagement.cabs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
// cab entity that will be mapped to cab table.
@Table(name = "cab")
public class Cab {

    @Id
    @Column(name = "registration_number")
//    registration number for cab
    private String reg_no;

    @Column(name = "model")
//    cab model.
    private String model;

    @Column(name = "colour")
//    cab colour.
    private String colour;

    @Column(name = "fare")
//    cab fare.
    private double fare;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinColumn(name = "driver_id")
//    driver for the cab.
    private Driver driver;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cab")
    @JsonIgnore
//    list of customers for the cabs.
    private List<CustomerCab> customers;

    public Cab(){}

    public Cab(String reg_no,String model,String colour,double fare, Driver driver){
        this.colour = colour;
        this.fare = fare;
        this.model = model;
        this.reg_no = reg_no;
        this.driver = driver;
    }

    public Cab(String reg_no,String model,String colour,double fare){
        this.colour = colour;
        this.fare = fare;
        this.model = model;
        this.reg_no = reg_no;
    }

    public void setReg_no(String reg_no)
    {
        this.reg_no = reg_no;
    }
    public void setModel(String model)
    {
        this.model = model;
    }

    public void setColour(String colour)
    {
        this.colour = colour;
    }
    public void setFare(double fare)
    {
        this.fare = fare;
    }
    public double getFare()
    {
        return this.fare;
    }

    public String getReg_no()
    {
        return this.reg_no;
    }

    public String getColour()
    {
        return this.colour;
    }
    public String getModel()
    {
        return this.model;
    }

    public Driver getDriver(){
        return this.driver;
    }

    public void setDriver(Driver driver){
        this.driver = driver;
    }

    public List<CustomerCab> getCustomers(){
        return this.customers;
    }

    public void setCustomers(List<CustomerCab> customerCabList){
        this.customers = customerCabList;
    }

}
