package com.nasa.apod_explorer.controller;

import com.nasa.apod_explorer.dto.ApodResponse;
import com.nasa.apod_explorer.service.NasaApodService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/apod")
public class ApodController {

    private final NasaApodService service;

    public ApodController(NasaApodService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getApod(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {

        if (date != null) {
            return ResponseEntity.ok(service.getApodByDate(date));
        }

        if (startDate != null && endDate != null) {
            return ResponseEntity.ok(service.getApodRange(startDate, endDate));
        }

        return ResponseEntity.ok(service.getTodayApod());
    }
}
