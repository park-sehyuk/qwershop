package com.example.qwershop.user.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MainItemDto {
    private Long itemId;

    private String itemName;

    private String itemBrand;

    private Long itemPrice;

    private Long itemCategory;

    private String itemUrl;

}
