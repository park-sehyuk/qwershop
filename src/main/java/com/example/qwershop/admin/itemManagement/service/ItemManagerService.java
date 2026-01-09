package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class ItemManagerService {

    @Autowired
    private ItemManagerMapper itemManagerMapper;

    private final String uploadPath = "C:/upload/items/";

    @Transactional
    public void registerItem(ItemManagerDto itemDto) {
        itemDto.setDbType(18); // 기본 공통코드 설정
        itemDto.setDbCategory(14);

        itemManagerMapper.insertItem(itemDto);
        Long generatedId = itemDto.getItemId();

        List<String> base64Images = itemDto.getItemUrls();
        if (base64Images != null && !base64Images.isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            for (int i = 0; i < base64Images.size(); i++) {
                try {
                    String fileName = UUID.randomUUID().toString() + ".jpg";
                    saveBase64ToFile(base64Images.get(i), uploadPath + fileName);
                    itemManagerMapper.insertImg(generatedId, "/upload/items/" + fileName, fileName, (i == 0) ? "Y" : "N");
                } catch (IOException e) {
                    throw new RuntimeException("이미지 저장 실패", e);
                }
            }
        }
    }

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }

    @Transactional
    public void modifyItemName(Long itemId, String newName) {
        itemManagerMapper.updateItemName(itemId, newName);
    }

    @Transactional
    public void removeItem(Long itemId) {
        itemManagerMapper.deleteItemImgs(itemId); // 자식 테이블(이미지) 먼저 삭제
        itemManagerMapper.deleteItem(itemId);     // 부모 테이블(상품) 삭제
    }

    private void saveBase64ToFile(String base64, String filePath) throws IOException {
        String base64Data = base64.contains(",") ? base64.split(",")[1] : base64;
        byte[] imageBytes = Base64.getDecoder().decode(base64Data);
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(imageBytes);
        }
    }
}