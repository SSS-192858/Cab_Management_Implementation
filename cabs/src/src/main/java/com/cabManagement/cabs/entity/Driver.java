package com.cabManagement.cabs.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "driver")
// driver entity that will be mapped to driver table.
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
//    driver id.
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "driver_name")
//    name of the driver.
    private String driverName;

    @Column(name = "driver_email")
//    email id of the driver.
    private String email;

    @Column(name = "driver_phno")
//    phone number of the driver.
    private String phone;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCustomerName(String driverName)
    {
        this.driverName = driverName;
    }
    public String getDriverName()
    {
        return this.driverName;
    }

    public Driver (String driverName,String email,String phone) {
        this.driverName = driverName;
        this.phone = phone;
        this.email = email;
    }

    public Driver(){

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

}