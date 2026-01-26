package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemImageRequestDto;
import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    // [화면 매핑] ----------------------------------------------------

    // 제품 리스트 페이지 (localhost:8080/admin/itemList)
    @GetMapping({"/itemList", ""})
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
    public ResponseEntity<?> addItem(
            @RequestParam String itemName,
            @RequestParam String itemBrand,
            @RequestParam int itemPrice,
            @RequestParam int itemStock,
            @RequestParam int dbCategory,
            @RequestParam int dbType,
            @RequestParam("images") List<MultipartFile> images,
            HttpServletRequest request
    ) {
        ItemManagerDto dto = new ItemManagerDto();
        dto.setItemName(itemName);
        dto.setItemBrand(itemBrand);
        dto.setItemPrice(itemPrice);
        dto.setItemStock(itemStock);
        dto.setDbCategory(dbCategory);
        dto.setDbType(dbType);

        itemManagerService.saveItemWithFiles(dto, images);
        // 디버깅용
        System.out.println(request.getContentType());
        return ResponseEntity.ok().build();
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