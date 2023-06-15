package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Customer;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
        this.entityManager.merge(customer);
        return customer;
    }

    @Override
    public Customer getCustomerbyId(int theId)
    {
       return this.entityManager.find(Customer.class,theId);
    }

    @Override
    @Transactional
    public Customer deletebyId(int id) {
        Customer customer = this.entityManager.find(Customer.class,id);
        this.entityManager.remove(customer);
        return customer;
    }

    @Override
    @Transactional
    public void updateCustomer(Customer customer) {
        this.entityManager.merge(customer);
    }
}
