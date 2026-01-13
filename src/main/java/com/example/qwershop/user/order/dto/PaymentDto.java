package com.example.qwershop.user.order.dto;

import lombok.Data;

@Data
public class PaymentDto {

    private String imp_uid;
    private String merchant_uid;
    private int paid_amount;
    private String status;

}
