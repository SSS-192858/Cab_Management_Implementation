package com.cabManagement.cabs.service;
import com.cabManagement.cabs.entity.*;
import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.RequestDAO;
import com.cabManagement.cabs.entity.Request;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import com.cabManagement.cabs.exceptions.RequestNotFoundException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private RequestDAO requestDAO;

    private CabDAO cabDAO;

    private CustomerDAO customerDAO;

    @Autowired
    public RequestService(RequestDAO requestDAO,CabDAO cabDAO,CustomerDAO customerDAO)
    {
        this.requestDAO = requestDAO;
        this.cabDAO = cabDAO;
        this.customerDAO = customerDAO;
    }
    
    @Transactional
    public Request saveRequest(Request request) throws CabNotFoundException, CustomerNotFoundException {
        String cabno = request.getCab().getReg_no();
        Cab cab = this.cabDAO.findCabById(cabno);
        if(cab==null)
        {
            throw new CabNotFoundException();
        }
        int cusid = request.getCustomer().getId();
        Customer customer = this.customerDAO.getCustomerbyId(cusid);
        if(customer==null)
        {
            throw new CustomerNotFoundException();
        }
        return this.requestDAO.saveRequest(request);
    }

    @Transactional
    public Request deleteRequestById(Integer id) throws RequestNotFoundException {
        Request request = this.requestDAO.getRequestById(id);
        if(request==null)
        {
            throw new RequestNotFoundException();
        }
        requestDAO.deleteRequestById(id);
        return request;
    }

    public List<Request> findAllRequests() {
        return this.requestDAO.findAllRequests();
    }
    
    public Request getRequestById(Integer id) throws RequestNotFoundException{
        Request request= this.requestDAO.getRequestById(id);
        if(request==null)
        {
            throw new RequestNotFoundException();
        }
        return request;
    }

    public List<Request> getRequestByCustomerId(Integer id) {
        return this.requestDAO.getRequestByCustomerId(id);
    }

    public List<Request> getRequestByCabId(String id) {
        return this.requestDAO.getRequestByCabId(id);
    }
    
    public List<Request> getRequestByDriverId(Integer id) {
        return this.requestDAO.getRequestByDriverId(id);
    }

}
