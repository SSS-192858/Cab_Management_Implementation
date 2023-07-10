package com.cabManagement.cabs.exceptions;

// this exception is called when the dates for which a cab is requested,
// overlap with another already existing customerCab (Booking) record, thus
// implying that the cab is unavailable for issuing on the requested dates
public class UnavailableForGivenDatesException extends RuntimeException{
    private static final long serialVersionUID = 7L;
}
