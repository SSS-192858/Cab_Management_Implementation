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

    @Override
    @Transactional
    public CustomerCab saveCustomerCab(CustomerCab customerCab) {
        return this.entityManager.merge(customerCab);
    }

    @Override
    public CustomerCab findById(Integer slno) {
        return this.entityManager.find(CustomerCab.class,slno);
    }

    @Override
    @Transactional
    public CustomerCab deleteById(Integer slno) {
       CustomerCab customerCab = this.entityManager.find(CustomerCab.class,slno);
       this.entityManager.remove(customerCab);
       return customerCab;
    }

    @Override
    public List<CustomerCab> findAll() {
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab", CustomerCab.class);
        return query.getResultList();
    }

    @Override
    public List<CustomerCab> getByCustomerId(Integer id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where customer.id = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    @Override
    public List<CustomerCab> getByCabId(String id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where cab.reg_no = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    @Override
    public List<CustomerCab> getByDriverId(Integer id){
        TypedQuery<CustomerCab> query = this.entityManager.createQuery("FROM CustomerCab where cab.driver.id = :id", CustomerCab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    @Override
    public boolean checkOverlap(Request request) {
        Date startDate = request.getStartDate();
        Date endDate = request.getEndDate();
        String reg = request.getCab().getReg_no();

        TypedQuery<CustomerCab> typedQuery = this.entityManager.createQuery("FROM CustomerCab where cab.reg_no = :reg_no and startDate not between :startDate and :endDate and endDate not between :startDate and :endDate", CustomerCab.class);
        typedQuery.setParameter("reg_no",reg);
        typedQuery.setParameter("startDate",startDate);
        typedQuery.setParameter("endDate",endDate);
        return !typedQuery.getResultList().isEmpty();
    }

}
