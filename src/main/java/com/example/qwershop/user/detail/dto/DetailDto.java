package com.example.qwershop.user.detail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailDto {

    private Long itemId;

    private String itemName;

    private String itemBrand;

    private Long itemPrice;

    private String itemUrl;

}
