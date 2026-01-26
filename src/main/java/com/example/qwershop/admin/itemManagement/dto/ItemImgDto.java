package com.example.qwershop.admin.itemManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemImgDto {

    private Long imgId;
    private Long itemId;
    private String imgName;
    private String imgUrl;
    private String isMain; // Y / N

}
