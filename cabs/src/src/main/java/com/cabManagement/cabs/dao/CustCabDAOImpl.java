package com.cabManagement.cabs.dao;


import com.cabManagement.cabs.entity.CustomerCab;
import com.cabManagement.cabs.entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class CustCabDAOImpl implements CustCabDAO {

    private EntityManager entityManager;

    @Autowired
    public CustCabDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    // save a new Cab-Customer pairing
    @Override
    @Transactional
    public CustomerCab saveCustomerCab(CustomerCab customerCab) {
        return this.entityManager.merge(customerCab);
    }

    // find a pairing by id
    @Override
    public CustomerCab findById(Integer slno) {
        return this.entityManager.find(CustomerCab.class,slno);
    }

    // delete a pairing by id
    @Override
    @Transactional
    public CustomerCab deleteById(Integer slno) {
       CustomerCab customerCab = this.entityManager.find(CustomerCab.class,slno);
       this.entityManager.remove(customerCab);
       return customerCab;
    }

    // find all bookings that have been approved
    @Override
    public List<CustomerCab> findAll() {
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab", CustomerCab.class);
        return query.getResultList();
    }

    // find all bookings made by a particular customer
    @Override
    public List<CustomerCab> getByCustomerId(Integer id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where customer.id = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    // find all booking based on a particular cab's registration number
    @Override
    public List<CustomerCab> getByCabId(String id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where cab.reg_no = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    // find all bookings across all cabs that a driver drives
    @Override
    public List<CustomerCab> getByDriverId(Integer id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where cab.driver.id = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    // while issuing a cab, check whether the requested dates overlap with a different record of the same cab
    @Override
    public boolean checkOverlap(Request request) {
        Date startDate = request.getStartDate();
        Date endDate = request.getEndDate();
        String reg = request.getCab().getReg_no();

        TypedQuery<CustomerCab> typedQuery = this.entityManager.createQuery("FROM CustomerCab where cab.reg_no = :reg_no and ((startDate between :startDate and :endDate) or (endDate between :startDate and :endDate) or (startDate < :startDate and endDate > :endDate))", CustomerCab.class);
        typedQuery.setParameter("reg_no",reg);
        typedQuery.setParameter("startDate",startDate);
        typedQuery.setParameter("endDate",endDate);
        return !typedQuery.getResultList().isEmpty();
    }

}
