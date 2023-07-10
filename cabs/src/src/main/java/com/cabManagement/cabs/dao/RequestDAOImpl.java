package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RequestDAOImpl implements RequestDAO{

    private EntityManager entityManager;
    @Autowired
    public RequestDAOImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    // save a request for a cab
    @Override
    @Transactional
    public Request saveRequest(Request request) {
        return this.entityManager.merge(request);
    }

    // delete a request
    @Override
    @Transactional
    public Request deleteRequestById(Integer id){
        Request request = entityManager.find(Request.class, id);
        entityManager.remove(request);
        return request;
    }

    // find all requests made across the cab management platform
    @Override
    public List<Request> findAllRequests() {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request", Request.class);
        return query.getResultList();
    }

    // find a particular request by its id
    @Override
    public Request getRequestById(Integer id) {
        return this.entityManager.find(Request.class, id);
    }

    // find all pending requests made by a particular customer
    @Override
    public List<Request> getRequestByCustomerId(Integer id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where customer.id=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }

    // get all pending requests for a cab by its registration number
    @Override
    public List<Request> getRequestByCabId(String id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where cab.reg_no=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }

    // get all pending requests for all cabs driven by a particular driver by their id
    @Override
    public List<Request> getRequestByDriverId(Integer id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where cab.driver.id=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }
}
