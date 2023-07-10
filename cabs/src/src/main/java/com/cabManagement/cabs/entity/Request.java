package com.cabManagement.cabs.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "request")
// request entity that will be mapped to request table.
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slno")
//     request id.
    private Integer id;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "customer_id")
//   Customer who has made the request.
    private Customer customer;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "registration_number")
//    Cab for which the request has been made.
    private Cab cab;

    @Column(name = "start_date")
//    Request start date
    private Date startDate;

    @Column(name = "end_date")
//    Request end date.
    private Date endDate;

    public Request() {
    }

    public Request(Customer customer, Cab cab, Date startDate, Date endDate) {
        this.customer = customer;
        this.cab = cab;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Cab getCab() {
        return cab;
    }

    public void setCab(Cab cab) {
        this.cab = cab;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
