package com.cabManagement.cabs.ServiceTests;

import com.cabManagement.cabs.dao.CustomerDAO;
import com.cabManagement.cabs.dao.UserDAO;
import com.cabManagement.cabs.entity.Customer;
import com.cabManagement.cabs.exceptions.CustomerNotFoundException;
import com.cabManagement.cabs.service.CustomerService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {
    @Mock
    private CustomerDAO customerDAO;

    @Mock
    private UserDAO userDAO;

    @Autowired
    @InjectMocks
    private CustomerService customerService;

    private Customer customer;
    private List<Customer> customerList;

    @BeforeEach
    public void setUp()
    {
        customerList = new ArrayList<>();
        this.customer = new Customer("test1","test1@gmail.com","99999999999");
        this.customer.setId(1);
    }

    @AfterEach
    public void tearDown()
    {
        this.customer = null;
        this.customerList = null;
    }

    @Test
    public void givenCustomerToAddShouldReturnAddedCustomer(){
        when(customerDAO.save(any())).thenReturn(customer);
        Customer customer1 = this.customerService.saveCustomer(this.customer);
        assertThat(customer1).isEqualTo(customer);
        verify(customerDAO,times(1)).save(any());
    }

    @Test
    public void givenGetAllCustomersShouldReturnListOfAllCustomers(){
        when(customerDAO.findAll()).thenReturn(this.customerList);
        List<Customer> customers = customerService.findAllCustomers();

        assertEquals(customers, customerList);
        verify(customerDAO, times(1)).findAll();
    }

    @Test
    public void GivenIdWillReturnCustomer(){
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);
        Customer newCustomer = customerService.findCustomerById(1);
        assertThat(newCustomer).isEqualTo(customer);
    }

    @Test
    public void GivenIdWillDeleteCustomer(){
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);
        when(customerDAO.deletebyId(1)).thenReturn(customer);

        Customer newCustomer = customerService.deleteCustomerById(1);
        assertThat(newCustomer).isEqualTo(customer);
        verify(customerDAO, times(1)).deletebyId(1);
        verify(userDAO, times(1)).delete(any());
    }

    @Test
    public void GivenCustomerWillUpdateIt() {
        when(customerDAO.getCustomerbyId(1)).thenReturn(customer);
        when(customerDAO.updateCustomer(any())).thenReturn(customer);

        Customer newCustomer = customerService.updateCustomer(customer);
        assertThat(newCustomer).isEqualTo(customer);
        verify(customerDAO, times(1)).updateCustomer(customer);
    }

    @Test
    public void GivenCustomerNullWillThrowException(){
        when(customerDAO.getCustomerbyId(1)).thenReturn(null);

        assertThrows(CustomerNotFoundException.class, () -> customerService.findCustomerById(1));
        assertThrows(CustomerNotFoundException.class, () -> customerService.updateCustomer(customer));
        assertThrows(CustomerNotFoundException.class, () -> customerService.deleteCustomerById(1));
        verify(customerDAO, never()).updateCustomer(any());
        verify(customerDAO, never()).deletebyId(1);
        verify(customerDAO, times(3)).getCustomerbyId(1);
    }

    @Test
    public void GivenUserIdWillFindCustomer(){
        when(customerDAO.getCustomerByUserId(1)).thenReturn(customer);
        Customer newCustomer = customerService.getCustomerByUserId(1);
        assertThat(newCustomer).isEqualTo(customer);
        verify(customerDAO, times(1)).getCustomerByUserId(1);
    }
}
