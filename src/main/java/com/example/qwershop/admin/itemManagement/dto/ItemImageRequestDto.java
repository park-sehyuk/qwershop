package com.example.qwershop.admin.itemManagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemImageRequestDto {
    private Long itemId;
    private List<String> images;
}
