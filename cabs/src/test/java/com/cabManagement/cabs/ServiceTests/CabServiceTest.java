package com.cabManagement.cabs.ServiceTests;

import com.cabManagement.cabs.dao.DriverDAO;
import com.cabManagement.cabs.entity.Driver;
import com.cabManagement.cabs.exceptions.CabNotFoundException;
import com.cabManagement.cabs.dao.CabDAO;
import com.cabManagement.cabs.entity.Cab;
import com.cabManagement.cabs.exceptions.DriverNotFoundException;
import com.cabManagement.cabs.service.CabService;
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
public class CabServiceTest {

    @Mock
    private CabDAO cabDAO;
    @Mock
    private DriverDAO driverDAO;

    @Autowired
    @InjectMocks
    private CabService cabService;

    private Cab cab;
    private Driver driver;
    private List<Cab> cabs;

    @BeforeEach
    public void setUp(){
        cabs = new ArrayList<>();
        cab = new Cab("Reg No. 1", "Model 1", "Colour1 1", 400);
        driver = new Driver("Driver 1", "Driver 1 email", "Driver phone");
        driver.setId(1);
    }

    @AfterEach
    public void tearDown(){
        cab = null;
        cabs = null;
    }

    @Test
    public void givenCabToAddShouldReturnAddedCab(){
        when(cabDAO.saveCab(any())).thenReturn(cab);
        Cab cab1 = cabService.saveCab(cab);
        assertThat(cab1).isEqualTo(cab);
        verify(cabDAO, times(1)).saveCab(any());
    }

    @Test
    public void GivenGetAllCabsShouldReturnListOfAllCabs(){

        when(cabDAO.findAllCabs()).thenReturn(cabs);
        List<Cab> cabList = cabService.findAllCabs();

        assertEquals(cabs,cabList);
        verify(cabDAO,times(1)).findAllCabs();
    }

    @Test
    public void GivenDriverIdShouldReturnListOfAllCabsOfDriver(){
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);
        when(cabDAO.listCabsByDriverId(1)).thenReturn(cabs);
        List<Cab> cabList = cabService.getCabsByDriverId(1);

        assertEquals(cabs,cabList);
        verify(driverDAO, times(1)).getDriverbyId(1);
        verify(cabDAO,times(1)).listCabsByDriverId(1);
    }

    @Test
    public void GivenCabAndDriverAssignIt(){
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(cabDAO.saveCab(cab)).thenReturn(cab);

        Cab newCab = this.cabService.assignDriver("Reg No. 1", driver);
        assertEquals(cab, newCab);
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
        verify(cabDAO, times(1)).saveCab(cab);
        verify(driverDAO, times(1)).getDriverbyId(1);
    }

    @Test
    public void GivenCabRemoveDriver(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(cabDAO.updateCab(cab)).thenReturn(cab);

        Cab newCab = this.cabService.removeDriver("Reg No. 1");
        assertEquals(cab, newCab);
        verify(cabDAO, times(1)).findCabById("Reg No. 1");
        verify(cabDAO, times(1)).updateCab(cab);
    }

    @Test
    public void GivenIdWillReturnCab(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        Cab newCab = cabService.findCabById("Reg No. 1");
        assertThat(newCab).isEqualTo(cab);
    }

    @Test
    public void GivenIdWillDeleteCab(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(cabDAO.deleteById("Reg No. 1")).thenReturn(cab);

        Cab newCab = cabService.deleteCabById("Reg No. 1");
        assertThat(newCab).isEqualTo(cab);
        verify(cabDAO, times(1)).deleteById("Reg No. 1");
    }

    @Test
    public void GivenCabWillUpdateIt() {
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(cabDAO.updateCab(any())).thenReturn(cab);

        Cab newCab = cabService.updateCab(cab);
        assertThat(newCab).isEqualTo(cab);
        verify(cabDAO, times(1)).updateCab(cab);
    }

    @Test
    public void GivenCabNullWillThrowException(){
        //all errors are checked here
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(null);
        when(driverDAO.getDriverbyId(1)).thenReturn(driver);

        assertThrows(CabNotFoundException.class, () -> cabService.findCabById("Reg No. 1"));
        assertThrows(CabNotFoundException.class, () -> cabService.updateCab(cab));
        assertThrows(CabNotFoundException.class, () -> cabService.deleteCabById("Reg No. 1"));
        assertThrows(CabNotFoundException.class, () -> cabService.assignDriver("Reg No. 1", driver));
        assertThrows(CabNotFoundException.class, () -> cabService.removeDriver("Reg No. 1"));
        verify(cabDAO, never()).updateCab(any());
        verify(cabDAO, never()).deleteById("Reg No. 1");
        verify(cabDAO, times(5)).findCabById("Reg No. 1");
        verify(driverDAO, times(1)).getDriverbyId(1);
    }

    @Test
    public void GivenDriverNullWillThrowException(){
        when(cabDAO.findCabById("Reg No. 1")).thenReturn(cab);
        when(driverDAO.getDriverbyId(1)).thenReturn(null);

        assertThrows(DriverNotFoundException.class, () -> cabService.getCabsByDriverId(1));
        assertThrows(DriverNotFoundException.class, () -> cabService.assignDriver("Reg No. 1", driver));
        verify(cabDAO, never()).updateCab(any());
        verify(cabDAO, never()).listCabsByDriverId(1);
        verify(driverDAO, times(2)).getDriverbyId(1);
    }
}


