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
        // 1. 공통 코드 매핑
        itemDto.setDbType("AVAILABLE".equals(itemDto.getItemType()) ? 18 : 18);
        itemDto.setDbCategory("남성상의-반팔".equals(itemDto.getItemCategory()) ? 14 : 14);

        // 2. 상품 저장
        itemManagerMapper.insertItem(itemDto);
        Long generatedId = itemDto.getItemId();

        // 3. 이미지 처리
        List<String> base64Images = itemDto.getItemUrls();
        if (base64Images != null && !base64Images.isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            for (int i = 0; i < base64Images.size(); i++) {
                try {
                    String base64Str = base64Images.get(i);
                    // 파일명 생성 (예: 550e8400-e29b-41d4-a716-446655440000.jpg)
                    String fileName = UUID.randomUUID().toString() + ".jpg";
                    String fullPath = uploadPath + fileName;
                    String dbPath = "/upload/items/" + fileName;

                    // 실제 파일 저장
                    saveBase64ToFile(base64Str, fullPath);

                    // DB 저장 (파일명인 fileName을 세 번째 인자로 전달)
                    String isMain = (i == 0) ? "Y" : "N";
                    itemManagerMapper.insertImg(generatedId, dbPath, fileName, isMain);

                } catch (IOException e) {
                    throw new RuntimeException("이미지 저장 중 오류 발생", e);
                }
            }
        }
    }

    private void saveBase64ToFile(String base64, String filePath) throws IOException {
        String base64Data = base64.contains(",") ? base64.split(",")[1] : base64;
        byte[] imageBytes = Base64.getDecoder().decode(base64Data);
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(imageBytes);
        }
    }
}