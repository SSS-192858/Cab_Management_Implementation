package com.cabManagement.cabs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(jwtUserDetailsService);
        authenticationProvider.setPasswordEncoder(bcryptEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests((configurer)->{
                    configurer.requestMatchers("/authenticate","/register_customer").permitAll()
                            .requestMatchers(HttpMethod.POST,"/register_admin", "/register_driver").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/dummy_customers").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/dummy_admin").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/dummy_driver").hasRole("DRIVER")
                            .requestMatchers(HttpMethod.GET, "/customer/getAll").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/customer/getCustomer/**").hasAnyRole("CUSTOMER", "ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/customer/delete/**").hasAnyRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/customer/save").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.PUT, "/customer/update").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.GET, "/driver/getAll").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/driver/getDriver/**", "/cabs/getByDriverId/**").hasAnyRole("DRIVER", "ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/driver/delete/**").hasAnyRole("DRIVER", "ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/driver/update").hasRole("DRIVER")
                            .requestMatchers(HttpMethod.POST, "/driver/save").hasRole("DRIVER")
                            .requestMatchers(HttpMethod.GET,"/cabs/allCabs").hasAnyRole("CUSTOMER","ADMIN","DRIVER")
                            .requestMatchers(HttpMethod.GET,"/cabs/**").hasAnyRole("CUSTOMER","ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/cabs/delete/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/cabs/addCab").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT,"/cabs/updateCab").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/cabs/removeDriver/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT,"/cabs/updateDriver/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/requests/allRequests").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/requests/cab/**").hasAnyRole("DRIVER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/requests/**").permitAll()
                            .requestMatchers(HttpMethod.GET,"/requests/customer/**").hasAnyRole("ADMIN","CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/requests/driver/**").hasAnyRole("ADMIN","DRIVER")
                            .requestMatchers(HttpMethod.POST,"/requests/save").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.DELETE,"/requests/delete/**").hasAnyRole("ADMIN","DRIVER","CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/customerCab/getAll").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/customerCab/**").permitAll()
                            .requestMatchers(HttpMethod.GET,"/customerCab/customer/**").hasAnyRole("CUSTOMER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/customerCab/driver/**").hasAnyRole("DRIVER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/customerCab/cab/**").hasAnyRole("DRIVER","ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/customerCab/delete/**").hasAnyRole("CUSTOMER","DRIVER","ADMIN")
                            .requestMatchers(HttpMethod.POST, "/customerCab/accept").hasAnyRole("DRIVER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, "/customer/getByUser").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.GET, "/driver/getByUser").hasRole("DRIVER")
                            .anyRequest().authenticated();
                }).exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new CorsFilterConfig(), ChannelProcessingFilter.class);

        return http.build();
    }
}
