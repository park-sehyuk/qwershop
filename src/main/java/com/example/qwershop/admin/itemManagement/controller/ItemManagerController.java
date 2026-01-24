package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    // [화면 매핑] ----------------------------------------------------

    // 제품 리스트 페이지 (localhost:8080/admin/itemList)
    @GetMapping({"/itemList", "/itemlist", ""})
    public String itemListPage() {
        return "admin/post"; // templates/admin/post.html
    }

    // 제품 추가 페이지 (localhost:8080/admin/addpost)
    @GetMapping("/addpost")
    public String addPostPage() {
        return "admin/addpost"; // templates/admin/addpost.html
    }

    // [API 매핑] ----------------------------------------------------

    @GetMapping("/api/items")
    @ResponseBody
    public List<ItemManagerDto> getItems() {
        return itemManagerService.getAllItems();
    }

    @GetMapping("/api/internal-files")
    @ResponseBody
    public List<String> getInternalFiles() {
        return itemManagerService.getInternalFileList();
    }

    @PostMapping("/api/items")
    @ResponseBody
    public ResponseEntity<?> addItem(@RequestBody ItemManagerDto dto) {
        try {
            // Service에 아래 메서드가 구현되어 있어야 함
            itemManagerService.saveItemWithInternalFiles(dto, dto.getImageNames());
            return ResponseEntity.ok("등록 성공");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("등록 실패: " + e.getMessage());
        }
    }

    @PutMapping("/api/items/{itemId}")
    @ResponseBody
    public ResponseEntity<?> updateItem(@PathVariable Long itemId, @RequestBody ItemManagerDto dto) {
        try {
            itemManagerService.updateItemWithInternalFiles(itemId, dto);
            return ResponseEntity.ok("수정 성공");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/api/items/{itemId}")
    @ResponseBody
    public ResponseEntity<?> deleteItem(@PathVariable Long itemId) {
        try {
            itemManagerService.deleteItem(itemId);
            return ResponseEntity.ok("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("삭제 실패");
        }
    }
}