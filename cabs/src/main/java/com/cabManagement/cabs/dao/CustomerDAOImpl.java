package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.Driver;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDAOImpl implements CustomerDAO {
    private final EntityManager entityManager;

    @Autowired
    public CustomerDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    // save a new customer record
    @Override
    @Transactional
    public Customer save(Customer customer) {
        return this.entityManager.merge(customer);
    }

    // get customer info by id
    @Override
    public Customer getCustomerbyId(Integer theId)
    {
       return this.entityManager.find(Customer.class,theId);
    }

    // delete customer info using id
    @Override
    @Transactional
    public Customer deletebyId(Integer id) {
        Customer customer = this.entityManager.find(Customer.class,id);
        this.entityManager.remove(customer);
        return customer;
    }

    // find list of all customers
    @Override
    public List<Customer> findAll() {
        TypedQuery<Customer> query = this.entityManager.createQuery("FROM Customer",Customer.class);
        return query.getResultList();
    }

    // update details of existing customer
    @Override
    @Transactional
    public Customer updateCustomer(Customer customer) {
        return this.entityManager.merge(customer);
    }

    @Override
    public Driver getDriverbyCabId(Integer id) {
        Cab cab = this.entityManager.find(Cab.class,id);
        return cab.getDriver();
    }

    // get customer using user id (not customer id)
    // getting a customer's personal information, extracted from jwt token
    // allows a customer to update their own info
    @Override
    public Customer getCustomerByUserId(Integer id) {
        TypedQuery<Customer> query = entityManager.createQuery("FROM Customer where user.id = :id", Customer.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }


}
