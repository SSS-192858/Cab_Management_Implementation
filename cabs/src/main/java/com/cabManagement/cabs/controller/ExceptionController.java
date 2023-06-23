package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
@CrossOrigin(origins = "*")
public class ExceptionController {
    @ExceptionHandler(value = CustomerCabNotFoundException.class)
    public ResponseEntity<Object> customerCabNotFound(CustomerCabNotFoundException customerCabNotFoundException){
        return new ResponseEntity<>("Customer Cab pair does not exist with the given id.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = DriverNotFoundException.class)
    public ResponseEntity<Object> driverNotFound(DriverNotFoundException driverNotFoundException){
        return new ResponseEntity<>("Driver does not exist with given id.",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = CustomerNotFoundException.class)
    public ResponseEntity<Object> customerNotFound(CustomerNotFoundException customerNotFoundException) {
        return new ResponseEntity<>("No Customer exists with the given ID",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = CabDriverNotFoundException.class)
    public ResponseEntity<Object> cabDriverPairNotFound(CabDriverNotFoundException cabDriverNotFoundException){
        return new ResponseEntity<>("No cab driver pair exists with the given ID.", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = RequestNotFoundException.class)
    public ResponseEntity<Object> requestNotFound(RequestNotFoundException requestNotFoundException){
        return new ResponseEntity<>("No request exists with the given id", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = CabNotFoundException.class)
    public ResponseEntity<Object> cabNotFound(CabNotFoundException cabNotFoundException){
        return new ResponseEntity<>("No cab exists with the given id", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Object> duplicateValueError(SQLIntegrityConstraintViolationException sqlIntegrityConstraintViolationException){
        return new ResponseEntity<>("Username already taken", HttpStatus.CONFLICT);
    }
}
