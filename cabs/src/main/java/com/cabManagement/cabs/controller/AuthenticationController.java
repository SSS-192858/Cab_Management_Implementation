package com.cabManagement.cabs.controller;

import com.cabManagement.cabs.config.JwtTokenUtil;
import com.cabManagement.cabs.entity.User;
import com.cabManagement.cabs.model.JwtRequest;
import com.cabManagement.cabs.model.JwtResponse;
import com.cabManagement.cabs.model.UserDTO;
import com.cabManagement.cabs.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        final String token = tokenGenerator(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        User user = this.userDetailsService.getUserByUsername(authenticationRequest.getUsername());
        return ResponseEntity.ok(new JwtResponse(token, user));
    }

    @RequestMapping(value = "/register_customer", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> saveUser(@RequestBody JwtRequest user) throws Exception {
        UserDTO dto = new UserDTO();
        dto.setPassword(user.getPassword());
        dto.setUsername(user.getUsername());
        User user1 = this.userDetailsService.saveUser(dto);
        final String token = tokenGenerator(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(new JwtResponse(token, user1));
    }

    @RequestMapping(value = "/register_admin", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> saveAdmin(@RequestBody JwtRequest user) throws Exception {
        UserDTO dto = new UserDTO();
        dto.setPassword(user.getPassword());
        dto.setUsername(user.getUsername());
        User user1 = this.userDetailsService.saveAdmin(dto);
        final String token = tokenGenerator(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(new JwtResponse(token, user1));
    }

    @RequestMapping(value = "/register_driver", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> saveDriver(@RequestBody JwtRequest user) throws Exception {
        UserDTO dto = new UserDTO();
        dto.setPassword(user.getPassword());
        dto.setUsername(user.getUsername());
        User user1 = this.userDetailsService.saveUser(dto);
        final String token = tokenGenerator(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(new JwtResponse(token, user1));
    }

    @RequestMapping(value = "/dummy_customers", method = RequestMethod.GET)
    public String userPage(){
        return "Hello Student";
    }

    @RequestMapping(value = "/dummy_admin", method = RequestMethod.GET)
    public String adminPage(){
        return "Hello Admin";
    }

    @RequestMapping(value = "/dummy_driver", method = RequestMethod.GET)
    public String driverPage(){
        return "Hello Admin";
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private String tokenGenerator(String username, String password) throws Exception{
        authenticate(username, password);
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);

        return jwtTokenUtil.generateToken(userDetails);
    }
}

