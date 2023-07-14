package com.cabManagement.cabs.ServiceTests;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.dao.CustCabDAO;
import com.cabManagement.cabs.entity.*;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerCabNotFoundException;
import com.cabManagement.cabs.service.CustomerCabService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerCabServiceTest {

    @Mock
    private CustCabDAO custCabDAO;

    @Mock
    private CustomerDAO customerDAO;

    @Mock
    private CabDAO cabDAO;

    @Mock
    private DriverDAO driverDAO;

    @Autowired
    @InjectMocks
    private CustomerCabService customerCabService;

    private CustomerCab customerCab;
    private List<CustomerCab> customerCabs;
    private Cab cab;
    private Customer customer;
    private Driver driver;

    @BeforeEach
    public void setUp(){
        customerCabs = new ArrayList<>();
        customerCab = new CustomerCab();
        cab = new Cab("Reg No. 1", "Model 1", "Colour 1", 400);
        customer = new Customer("test1","test1@gmail.com","99999999999");
        customer.setId(1);
        driver = new Driver("driver1", "driver1@gmail.com", "9283472384");
        driver.setId(1);
        customerCab.setStartDate(new Timestamp(System.currentTimeMillis()));
        customerCab.setEndDate(new Timestamp(System.currentTimeMillis()));
        customerCab.setCustomer(customer);
        customerCab.setCab(cab);
        customerCab.setSlno(1);
    }

    @AfterEach
    public void tearDown(){
        customerCab = null;
        cab = null;
        customer = null;
        driver = null;
        customerCabs = null;
    }

    @Test
    public void givenCustomerCabToAddShouldReturnAddedCustomerCab(){
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(custCabDAO.saveCustomerCab(any())).thenReturn(customerCab);

        CustomerCab newCustomerCab = customerCabService.saveCustCabPair(customerCab);
        assertThat(newCustomerCab).isEqualTo(customerCab);
        verify(custCabDAO, times(1)).saveCustomerCab(any());
    }

    @Test
    public void givenGetAllCustomerCabsShouldReturnListOfAllCustomerCabs(){
        when(custCabDAO.findAll()).thenReturn(customerCabs);

        List<CustomerCab> customerCabList = this.customerCabService.findAll();
        assertThat(customerCabList).isEqualTo(customerCabs);
        verify(custCabDAO, times(1)).findAll();
    }

    @Test
    public void givenGetAllCustomerCabsByCabsShouldReturnListOfAllCustomerCabsOfTheCab(){
        when(custCabDAO.getByCabId("Reg No. 1")).thenReturn(customerCabs);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);

        List<CustomerCab> customerCabList = this.customerCabService.getByCabId("Reg No. 1");
        assertThat(customerCabList).isEqualTo(customerCabs);
        verify(custCabDAO, times(1)).getByCabId("Reg No. 1");
    }

    @Test
    public void givenGetAllCustomerCabsByCustomerShouldReturnListOfAllCustomerCabsOfCustomer(){
        when(custCabDAO.getByCustomerId(1)).thenReturn(customerCabs);
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);

        List<CustomerCab> customerCabList = this.customerCabService.getByCustomerId(1);
        assertThat(customerCabList).isEqualTo(customerCabs);
        verify(custCabDAO, times(1)).getByCustomerId(1);
    }

    @Test
    public void givenGetAllCustomerCabsByDriverShouldReturnListOfAllCustomerCabsOfDriver(){
        when(custCabDAO.getByDriverId(1)).thenReturn(customerCabs);
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);

        List<CustomerCab> customerCabList = this.customerCabService.getByDriverId(1);
        assertThat(customerCabList).isEqualTo(customerCabs);
        verify(custCabDAO, times(1)).getByDriverId(1);
    }

    @Test
    public void givenIdWillReturnCustomerCab(){
        when(custCabDAO.findById(1)).thenReturn(customerCab);

        CustomerCab customerCab1 = this.customerCabService.findById(1);
        assertThat(customerCab1).isEqualTo(customerCab);
        verify(custCabDAO, times(1)).findById(1);
    }

    @Test
    public void GivenIdWillDelete(){
        when(custCabDAO.findById(1)).thenReturn(customerCab);
        when(custCabDAO.deleteById(1)).thenReturn(customerCab);

        CustomerCab newCustomerCab = this.customerCabService.deleteCustCabPairById(1);
        assertThat(newCustomerCab).isEqualTo(customerCab);
        verify(custCabDAO, times(1)).deleteById(1);
    }

    @Test
    public void GivenCustomerCabOrCustomerNullWillThrowException(){
        when(custCabDAO.findById(1)).thenReturn(null);
        when(customerDAO.getCustomerbyId(1)).thenReturn(null);

        assertThrows(CustomerCabNotFoundException.class, () -> customerCabService.findById(1));
        assertThrows(CustomerCabNotFoundException.class, () -> customerCabService.deleteCustCabPairById(1));
        assertThrows(CustomerNotFoundException.class, () -> customerCabService.saveCustCabPair(customerCab));
        assertThrows(CustomerNotFoundException.class, () -> customerCabService.getByCustomerId(1));
        verify(custCabDAO, never()).saveCustomerCab(any());
        verify(custCabDAO, never()).deleteById(1);
        verify(custCabDAO, times(2)).findById(1);
        verify(customerDAO, times(2)).getCustomerbyId(1);
    }

    @Test
    public void GivenCabNullWillThrowException(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(null);

        assertThrows(CabNotFoundException.class, () -> customerCabService.getByCabId("Reg No. 1"));
        verify(custCabDAO, never()).getByCabId("Reg No. 1");
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
    }

    @Test
    public void GivenDriverNullWillThrowException(){
        when(driverDAO.getDriverbyId(1)).thenReturn(null);

        assertThrows(DriverNotFoundException.class, () -> customerCabService.getByDriverId(1));
        verify(custCabDAO, never()).getByDriverId(1);
        verify(driverDAO, times(1)).getDriverbyId(1);
    }

    @Test
    public void GivenOverlapWillAssertTrue(){
        when(custCabDAO.checkOverlap(any())).thenReturn(true);

        Request request = new Request();
        assertTrue(custCabDAO.checkOverlap(request));
    }
}