package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    // 페이지 이동: 게시물 관리 메인
    @GetMapping("/admin/itemList")
    public String postListPage() {
        return "admin/post";
    }

    // 페이지 이동: 제품 추가 페이지
    @GetMapping("/admin/addpost")
    public String addPostPage() {
        return "admin/addpost";
    }

    // 제품 등록 (JSON 전송)
    @PostMapping("/admin/addpost")
    @ResponseBody
    public String addPost(@RequestBody ItemManagerDto itemDto) {
        itemManagerService.registerItem(itemDto);
        return "success";
    }

    // API: 상품 목록 가져오기
    @GetMapping("/admin/api/items")
    @ResponseBody
    public List<ItemManagerDto> getItemsApi() {
        return itemManagerService.getAllItems();
    }

    // API: 즉석 수정 (PATCH)
    @PatchMapping("/admin/api/items/{id}")
    @ResponseBody
    public ResponseEntity<String> updateItemFull(@PathVariable("id") Long id, @RequestBody ItemManagerDto itemDto) {
        // 경로의 ID를 DTO에 설정하여 서비스에 전달
        itemDto.setItemId(id);
        itemManagerService.modifyItemFull(itemDto);
        return ResponseEntity.ok("success");
    }

    // API: 상품 삭제 (DELETE)
    @DeleteMapping("/admin/api/items/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long id) {
        itemManagerService.removeItem(id);
        return ResponseEntity.ok("success");
    }
}