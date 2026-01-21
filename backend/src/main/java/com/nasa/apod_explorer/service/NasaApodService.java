package com.nasa.apod_explorer.service;

import com.nasa.apod_explorer.dto.ApodResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NasaApodService {

    @Value("${nasa.api.key}")
    private String apiKey;

    @Value("${nasa.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 1️⃣ Today's APOD
     * Cache key: today
     */
    @Cacheable(value = "apod", key = "'today'")
    public ApodResponse getTodayApod() {
        String url = apiUrl + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, ApodResponse.class);
    }

    /**
     * 2️⃣ APOD by Date
     * Cache key: date
     */
    @Cacheable(value = "apod", key = "#date")
    public ApodResponse getApodByDate(String date) {
        String url = apiUrl + "?date=" + date + "&api_key=" + apiKey;
        return restTemplate.getForObject(url, ApodResponse.class);
    }

    /**
     * 3️⃣ APOD Gallery (Date Range)
     * Cache key: startDate-endDate
     */
    @Cacheable(value = "apod", key = "#startDate + '-' + #endDate")
    public ApodResponse[] getApodRange(String startDate, String endDate) {
        String url = apiUrl +
                "?start_date=" + startDate +
                "&end_date=" + endDate +
                "&api_key=" + apiKey;

        return restTemplate.getForObject(url, ApodResponse[].class);
    }
}
