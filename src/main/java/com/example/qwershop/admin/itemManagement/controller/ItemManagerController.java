package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    // 페이지 이동
    @GetMapping("/admin/itemList")
    public String postListPage() { return "admin/post"; }

    @GetMapping("/admin/addpost")
    public String addPostPage() { return "admin/addpost"; }

    // 데이터 처리 API
    @PostMapping("/admin/addpost")
    @ResponseBody
    public String addPost(@RequestBody ItemManagerDto itemDto) {
        itemManagerService.registerItem(itemDto);
        return "success";
    }

    @GetMapping("/admin/api/items")
    @ResponseBody
    public List<ItemManagerDto> getItemsApi() {
        return itemManagerService.getAllItems();
    }

    @PatchMapping("/admin/api/items/{id}/name")
    @ResponseBody
    public ResponseEntity<String> updateItemName(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        itemManagerService.modifyItemName(id, body.get("itemName"));
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/admin/api/items/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long id) {
        itemManagerService.removeItem(id);
        return ResponseEntity.ok("success");
    }
}