package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Cab;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CabDAOImpl implements CabDAO{

    private EntityManager entityManager;
    @Autowired
    public CabDAOImpl(EntityManager entityManage){
        this.entityManager = entityManage;
    }

    // save a new cab record
    @Override
    @Transactional
    public Cab saveCab(Cab cab) {
        return this.entityManager.merge(cab);
    }

    // get details of cab by its registration number
    @Override
    public Cab findCabById(String reg_no) {
        return this.entityManager.find(Cab.class,reg_no);
    }

    // get list of all cabs
    @Override
    public List<Cab> findAllCabs() {
        TypedQuery<Cab> typedQuery = this.entityManager.createQuery("From Cab",Cab.class);
        return typedQuery.getResultList();
    }

    // delet ea cab using its registration number
    @Override
    @Transactional
    public Cab deleteById(String reg_no) {
        Cab cab = this.entityManager.find(Cab.class,reg_no);
        this.entityManager.remove(cab);
        return cab;
    }

    // update details of existing cab
    @Override
    @Transactional
    public Cab updateCab(Cab cab) {
        return this.entityManager.merge(cab);
    }

    // list all cabs of a particular driver, using his id
    @Override
    public List<Cab> listCabsByDriverId(Integer id){
        TypedQuery<Cab> query = this.entityManager.createQuery("FROM Cab where driver.id = :id", Cab.class);
        query.setParameter("id", id);
        return query.getResultList();
    }
}
