package com.cabManagement.cabs.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.*;
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_email")
    private String email;

    @Column(name = "customer_phno")
    private String phone;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CustomerCab> cabs;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Request> requests;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CustomerCab> getCabs(){
        return this.cabs;
    }

    public void setCabs(List<CustomerCab> cabs){
        this.cabs = cabs;
    }

    public List<Request> getRequests(){
        return this.requests;
    }

    public void setRequests(List<Request> requests){
        this.requests = requests;
    }

    public void setCustomerName(String customerName)
    {
        this.customerName = customerName;
    }
    public String getCustomerName()
    {
        return this.customerName;
    }

    public Customer (String customerName,String email,String phone) {
        this.customerName = customerName;
        this.email = email;
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void addRequest(Request request){
        if (requests == null){
            requests = new ArrayList<Request>();
        }
        this.requests.add(request);
        request.setCustomer(this);
    }

}