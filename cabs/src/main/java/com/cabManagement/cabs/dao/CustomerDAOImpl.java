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

    @Override
    @Transactional
    public Customer save(Customer customer) {
        return this.entityManager.merge(customer);
    }

    @Override
    public Customer getCustomerbyId(Integer theId)
    {
       return this.entityManager.find(Customer.class,theId);
    }

    @Override
    @Transactional
    public Customer deletebyId(Integer id) {
        Customer customer = this.entityManager.find(Customer.class,id);
        this.entityManager.remove(customer);
        return customer;
    }

    @Override
    public List<Customer> findAll() {
        TypedQuery<Customer> query = this.entityManager.createQuery("FROM Customer",Customer.class);
        return query.getResultList();
    }

    @Override
    @Transactional
    public void updateCustomer(Customer customer) {
        this.entityManager.merge(customer);
    }

    @Override
    public Driver getDriverbyCabId(Integer id) {
        Cab cab = this.entityManager.find(Cab.class,id);
        return cab.getDriver();
    }
}
