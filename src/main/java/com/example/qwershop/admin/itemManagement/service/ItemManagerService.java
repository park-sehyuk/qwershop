package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemManagerService {

    @Autowired
    private ItemManagerMapper itemManagerMapper;

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }

    public List<String> getInternalFileList() {
        String path = System.getProperty("user.dir") + "/src/main/resources/static/user/posting";
        File dir = new File(path);
        File[] files = dir.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (files != null) {
            for (File f : files) if (f.isFile()) fileNames.add(f.getName());
        }
        return fileNames;
    }

    @Transactional
    public void saveItemWithFiles(ItemManagerDto dto, List<MultipartFile> images) {

        // 1. 상품 저장
        itemManagerMapper.insertItem(dto);

        String uploadDir = System.getProperty("user.dir")
                + "/src/main/resources/static/user/posting/";

        new File(uploadDir).mkdirs();

        for (int i = 0; i < images.size(); i++) {
            MultipartFile file = images.get(i);
            if (file.isEmpty()) continue;

            String fileName = System.currentTimeMillis()
                    + "_" + file.getOriginalFilename();

            File saveFile = new File(uploadDir + fileName);
            try {
                file.transferTo(saveFile);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // 🔥 대표 이미지 규칙
            String isMain = (i == 0) ? "Y" : "N";

            itemManagerMapper.insertItemImage(
                    dto.getItemId(),
                    fileName,
                    isMain
            );
        }
    }

    @Transactional
    public void updateItemWithInternalFiles(Long itemId, ItemManagerDto dto) {
        // 1. 상품 정보 수정
        itemManagerMapper.updateItem(dto);

        // 2. 기존 이미지 전부 삭제
        itemManagerMapper.deleteItemImages(itemId);

        // 3. 선택된 이미지 다시 저장 (대표 이미지 처리)
        if (dto.getImageNames() != null && !dto.getImageNames().isEmpty()) {

            for (int i = 0; i < dto.getImageNames().size(); i++) {

                String fileName = dto.getImageNames().get(i);

                // 🔥 첫 번째 이미지만 대표
                String isMain = (i == 0) ? "Y" : "N";

                itemManagerMapper.insertItemImage(
                        itemId,
                        fileName,
                        isMain
                );
            }
        }
    }

    public void deleteItem(Long itemId) {
        itemManagerMapper.deleteItemImages(itemId);
        itemManagerMapper.deleteItem(itemId);
    }
}