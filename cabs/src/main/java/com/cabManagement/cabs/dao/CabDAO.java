package com.cabManagement.cabs.dao;

import com.cabManagement.cabs.entity.Cab;
import java.util.List;

public interface CabDAO {

    public Cab saveCab(Cab cab);

    public Cab findCabById(String reg_no);

    public Cab deleteById(String reg_no);

    public Cab updateCab(Cab cab);

    public List<Cab> findAllCabs();

    public List<Cab> listCabsByDriverId(Integer id);
}
