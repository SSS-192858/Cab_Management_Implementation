package com.cabManagement.cabs.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "customer_cab")
// Customercab entity that will be mapped to customr_cab table.
public class CustomerCab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slno")
//    booking id.
    private Integer slno;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "customer_id")
//   The customer for whom the booking is made.
    private Customer customer;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "registration_number")
//    the cab for which the booking has been made,.
    private Cab cab;

    @Column(name = "start_date")
//    booking start Date.
    private Date startDate;

    @Column(name = "end_date")
//    booking end date.
    private Date endDate;

    public CustomerCab()
    {

    }

    public CustomerCab(Customer customer,Cab cab,Date startDate,Date endDate)
    {
        this.cab = cab;
        this.customer = customer;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void setSlno(Integer slno) {
        this.slno = slno;
    }

    public Integer getSlno() {
        return slno;
    }

    public Cab getCab() {
        return cab;
    }

    public void setCab(Cab cab) {
        this.cab = cab;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public Date getStartDate()
    {
        return startDate;
    }

    public void setStartDate(Date startDate)
    {
        this.startDate = startDate;
    }

}
