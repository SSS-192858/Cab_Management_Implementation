package com.cabManagement.cabs.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JoinColumnOrFormula;

@Entity
@Table(name = "cab")
public class Cab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private String reg_no;

    @Column(name = "")
    private String model;

    @Column(name = "")
    private String colour;

    @Column(name = "")
    private double fare;

    public Cab(){}

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
    public void setFair(double fare)
    {
        this.fare = fare;
    }
    public double getFair()
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

}
