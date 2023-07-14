package com.cabManagement.cabs.ServiceTests;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.dao.RequestDAO;
import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.entity.Request;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.exceptions.RequestNotFoundException;
import com.cabManagement.cabs.service.RequestService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RequestServiceTest {

    @Mock
    private RequestDAO requestDAO;

    @Mock
    private CustomerDAO customerDAO;

    @Mock
    private CabDAO cabDAO;

    @Mock
    private DriverDAO driverDAO;

    @Autowired
    @InjectMocks
    private RequestService requestService;

    private Request request;
    private List<Request> requests;
    private Cab cab;
    private Customer customer;
    private Driver driver;

    @BeforeEach
    public void setUp(){
        requests = new ArrayList<>();
        request = new Request();
        cab = new Cab("Reg No. 1", "Model 1", "Colour 1", 400);
        customer = new Customer("test1","test1@gmail.com","99999999999");
        customer.setId(1);
        driver = new Driver("driver1", "driver1@gmail.com", "9283472384");
        driver.setId(1);
        request.setStartDate(new Timestamp(System.currentTimeMillis()));
        request.setEndDate(new Timestamp(System.currentTimeMillis()));
        request.setCustomer(customer);
        request.setCab(cab);
        request.setId(1);
    }

    @AfterEach
    public void tearDown(){
        request = null;
        cab = null;
        customer = null;
        driver = null;
        requests = null;
    }

    @Test
    public void givenRequestToAddShouldReturnAddedRequest(){
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(requestDAO.saveRequest(any())).thenReturn(request);

        Request newRequest = requestService.saveRequest(request);
        assertThat(newRequest).isEqualTo(request);
        verify(requestDAO, times(1)).saveRequest(any());
    }

    @Test
    public void givenGetAllRequestsShouldReturnListOfAllRequests(){
        when(requestDAO.findAllRequests()).thenReturn(requests);

        List<Request> requestList = this.requestService.findAllRequests();
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).findAllRequests();
    }

    @Test
    public void givenGetAllRequestsByCabsShouldReturnListOfAllRequestsOfTheCab(){
        when(requestDAO.getRequestByCabId("Reg No. 1")).thenReturn(requests);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);

        List<Request> requestList = this.requestService.getRequestByCabId("Reg No. 1");
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).getRequestByCabId("Reg No. 1");
    }

    @Test
    public void givenGetAllRequestsByCustomerShouldReturnListOfAllRequestsOfCustomer(){
        when(requestDAO.getRequestByCustomerId(1)).thenReturn(requests);
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);

        List<Request> requestList = this.requestService.getRequestByCustomerId(1);
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).getRequestByCustomerId(1);
    }

    @Test
    public void givenGetAllRequestsByDriverShouldReturnListOfAllRequestsOfDriver(){
        when(requestDAO.getRequestByDriverId(1)).thenReturn(requests);
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);

        List<Request> requestList = this.requestService.getRequestByDriverId(1);
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).getRequestByDriverId(1);
    }

    @Test
    public void givenIdWillReturnRequest(){
        when(requestDAO.getRequestById(1)).thenReturn(request);

        Request request1 = this.requestService.getRequestById(1);
        assertThat(request1).isEqualTo(request);
        verify(requestDAO, times(1)).getRequestById(1);
    }

    @Test
    public void GivenIdWillDeleteRequest(){
        when(requestDAO.getRequestById(1)).thenReturn(request);
        when(requestDAO.deleteRequestById(1)).thenReturn(request);

        Request newRequest = this.requestService.deleteRequestById(1);
        assertThat(newRequest).isEqualTo(request);
        verify(requestDAO, times(1)).deleteRequestById(1);
    }

    @Test
    public void GivenRequestOrCustomerNullWillThrowException(){
        when(requestDAO.getRequestById(1)).thenReturn(null);
        when(customerDAO.getCustomerbyId(1)).thenReturn(null);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);

        assertThrows(RequestNotFoundException.class, () -> requestService.getRequestById(1));
        assertThrows(RequestNotFoundException.class, () -> requestService.deleteRequestById(1));
        assertThrows(CustomerNotFoundException.class, () -> requestService.saveRequest(request));
        assertThrows(CustomerNotFoundException.class, () -> requestService.getRequestByCustomerId(1));
        verify(requestDAO, never()).saveRequest(any());
        verify(requestDAO, never()).deleteRequestById(1);
        verify(requestDAO, times(2)).getRequestById(1);
        verify(customerDAO, times(2)).getCustomerbyId(1);
    }

    @Test
    public void GivenCabNullWillThrowException(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(null);

        assertThrows(CabNotFoundException.class, () -> requestService.getRequestByCabId("Reg No. 1"));
        verify(requestDAO, never()).getRequestByCabId("Reg No. 1");
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
    }

    @Test
    public void GivenDriverNullWillThrowException(){
        when(driverDAO.getDriverbyId(1)).thenReturn(null);

        assertThrows(DriverNotFoundException.class, () -> requestService.getRequestByDriverId(1));
        verify(requestDAO, never()).getRequestByDriverId(1);
        verify(driverDAO, times(1)).getDriverbyId(1);
    }
}