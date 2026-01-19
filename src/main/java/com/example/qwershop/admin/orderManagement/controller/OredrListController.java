package com.example.qwershop.admin.orderManagement.controller;

import com.example.qwershop.admin.orderManagement.dto.OrderDetailDto;
import com.example.qwershop.admin.orderManagement.dto.OrderListDto;
import com.example.qwershop.admin.orderManagement.service.OrderListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class OredrListController {

    @Autowired
    private OrderListService orderListService;

    @GetMapping("/orderList")
    public String selectOrderList(Model model){
        List<OrderListDto> orders = orderListService.getAdminOrderList();
        model.addAttribute("orders", orders);
        return "/admin/orderList";
    }

    // 상세 페이지 이동
    @GetMapping("/orderDetail/{orderId}")
    public String orderDetail(@PathVariable int orderId, Model model) {
        OrderDetailDto detail = orderListService.getOrderDetail(orderId);
        model.addAttribute("order", detail);
        return "admin/orderDetail";
    }

    // 상태 변경 API (POST)
    @PostMapping("/updateOrderStatus")
    public String updateStatus(@RequestParam int orderId, @RequestParam String status) {
        orderListService.updateStatus(orderId, status);
        return "redirect:/admin/orderDetail/" + orderId;
    }

}
