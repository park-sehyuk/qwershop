package com.example.qwershop.admin.itemManagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class ItemManagerDto {
    private Long itemId;
    private String itemName;
    private String itemBrand;
    private Integer itemPrice;
    private Integer itemStock;
    private Integer dbType;     // DB item_type 매핑
    private Integer dbCategory; // DB item_category 매핑
    private List<String> itemUrls;
    private String itemUrl;     // 목록용 대표 이미지 URL
    private String regTime;

    /**
     * 추가: 화면에서 라디오 버튼으로 선택한 대표 이미지의 번호 (0, 1, 2...)
     * post.js에서 JSON 데이터에 포함되어 전송됩니다.
     */
    private Integer mainImageIdx;
}