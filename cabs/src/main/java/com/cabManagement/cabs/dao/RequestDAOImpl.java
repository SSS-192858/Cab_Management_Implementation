package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Request;
import com.cabManagement.cabs.exceptions.RequestNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Repository
public class RequestDAOImpl implements RequestDAO{

    private EntityManager entityManager;

    @Autowired
    public RequestDAOImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }


    @Override
    @Transactional
    public Request saveRequest(Request request) {
        return this.entityManager.merge(request);
    }

    @Override
    @Transactional
    public Request deleteRequestById(Integer id){
        Request request = entityManager.find(Request.class, id);
        entityManager.remove(request);
        return request;
    }

    @Override
    public List<Request> findAllRequests() {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request", Request.class);
        return query.getResultList();
    }

    @Override
    public Request getRequestById(Integer id) {
        Request request = this.entityManager.find(Request.class, id);
        return request;
    }

    @Override
    public List<Request> getRequestByCustomerId(Integer id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where Request.Customer.id=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }

    @Override
    public List<Request> getRequestByCabId(String id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where Request.Cab.reg_no=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }

    @Override
    public List<Request> getRequestByDriverId(Integer id) {
        TypedQuery<Request> query = this.entityManager.createQuery("FROM Request where Request.Driver.id=:val", Request.class);
        query.setParameter("val",id);
        return query.getResultList();
    }
}
