package com.nasa.apod_explorer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApodResponse {

    private String title;
    private String explanation;
    private String url;
    private String date;

    @JsonProperty("media_type")
    private String mediaType;

    private String copyright;
}
