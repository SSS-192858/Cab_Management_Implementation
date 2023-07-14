package com.cabManagement.cabs.ServiceTests;

import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.dao.UserDAO;
import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.service.DriverService;
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
public class DriverServiceTest {
    @Mock
    private DriverDAO driverDAO;

    @Mock
    private UserDAO userDAO;

    @Mock
    private CabDAO cabDAO;

    @Autowired
    @InjectMocks
    private DriverService driverService;

    private Driver driver;
    private List<Driver> driverList;
    private Cab cab;

    @BeforeEach
    public void setUp()
    {
        driverList = new ArrayList<>();
        driver = new Driver("test1","test1@gmail.com","99999999999");
        driver.setId(1);
        cab = new Cab("Reg No. 1", "Model 1", "Colour 1", 400);
        cab.setDriver(driver);
    }

    @AfterEach
    public void tearDown()
    {
        this.driver = null;
        this.driverList = null;
    }

    @Test
    public void givenDriverToAddShouldReturnAddedDriver(){
        when(driverDAO.save(any())).thenReturn(driver);
        Driver driver1 = this.driverService.saveDriver(this.driver);
        assertThat(driver1).isEqualTo(driver);
        verify(driverDAO,times(1)).save(any());
    }

    @Test
    public void givenGetAllDriversShouldReturnListOfAllDrivers(){
        when(driverDAO.findAllDrivers()).thenReturn(this.driverList);
        List<Driver> drivers = driverService.findAll();

        assertEquals(drivers, driverList);
        verify(driverDAO, times(1)).findAllDrivers();
    }

    @Test
    public void GivenIdWillReturnDriver(){
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);
        Driver newDriver = driverService.findDriverById(1);
        assertThat(newDriver).isEqualTo(driver);
    }

    @Test
    public void GivenIdWillDeleteDriver(){
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);
        when(driverDAO.deletebyId(1)).thenReturn(driver);

        Driver newDriver = driverService.deleteDriverById(1);
        assertThat(newDriver).isEqualTo(driver);
        verify(driverDAO, times(1)).deletebyId(1);
        verify(userDAO, times(1)).delete(any());
    }

    @Test
    public void GivenDriverWillUpdateIt() {
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);
        when(driverDAO.updateDriver(any())).thenReturn(driver);

        Driver newDriver = driverService.updateDriver(driver);
        assertThat(newDriver).isEqualTo(driver);
        verify(driverDAO, times(1)).updateDriver(driver);
    }

    @Test
    public void GivenCabRegNoShouldReturnDriver(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(driverDAO.getDriverByCabRegNo("Reg No. 1")).thenReturn(driver);

        Driver driver1 = driverService.getDriverByCabRegNo("Reg No. 1");
        assertThat(driver1).isEqualTo(driver);
        verify(driverDAO, times(1)).getDriverByCabRegNo("Reg No. 1");
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
    }

    @Test
    public void GivenDriverNullWillThrowException(){
        when(driverDAO.getDriverbyId(1)).thenReturn(null);

        assertThrows(DriverNotFoundException.class, () -> driverService.findDriverById(1));
        assertThrows(DriverNotFoundException.class, () -> driverService.updateDriver(driver));
        assertThrows(DriverNotFoundException.class, () -> driverService.deleteDriverById(1));
        verify(driverDAO, never()).updateDriver(any());
        verify(driverDAO, never()).deletebyId(1);
        verify(driverDAO, times(3)).getDriverbyId(1);
    }

    @Test
    public void GivenCabNullWillThrowException(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(null);

        assertThrows(CabNotFoundException.class, () -> driverService.getDriverByCabRegNo("Reg No. 1"));
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
        verify(driverDAO, never()).getDriverByCabRegNo("Reg No. 1");
    }

    @Test
    public void GivenUserIdWillFindDriver(){
        when(driverDAO.getDriverByUserId(1)).thenReturn(driver);
        Driver newDriver = driverService.getDriverByUserId(1);
        assertThat(newDriver).isEqualTo(driver);
        verify(driverDAO, times(1)).getDriverByUserId(1);
    }
}
