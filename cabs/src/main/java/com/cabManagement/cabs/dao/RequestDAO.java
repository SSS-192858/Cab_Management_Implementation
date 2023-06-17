package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Request;
import java.util.List;

public interface RequestDAO {
    public Request saveRequest(Request request);

    public Request deleteRequestById(Integer id);

    public List<Request> findAllRequests();

    public Request getRequestById(Integer id);

    public List<Request> getRequestByCustomerId(Integer id);

    public List<Request> getRequestByCabId(String id);

    public List<Request> getRequestByDriverId(Integer id);
}
