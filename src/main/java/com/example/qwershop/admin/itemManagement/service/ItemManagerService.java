package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        String path = System.getProperty("user.dir") + "/src/main/resources/static/admin/posting";
        File dir = new File(path);
        File[] files = dir.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (files != null) {
            for (File f : files) if (f.isFile()) fileNames.add(f.getName());
        }
        return fileNames;
    }

    @Transactional
    public void saveItemWithInternalFiles(ItemManagerDto dto, List<String> imageNames) {
        // 1. 상품 기본 정보 저장 (Mapper XML의 insertItem 쿼리 호출)
        itemManagerMapper.insertItem(dto);

        // 2. 등록된 ID로 이미지 저장
        if (imageNames != null && !imageNames.isEmpty()) {
            for (String name : imageNames) {
                itemManagerMapper.insertItemImage(dto.getItemId(), name);
            }
        }
    }

    @Transactional
    public void updateItemWithInternalFiles(Long itemId, ItemManagerDto dto) {
        itemManagerMapper.updateItem(dto);
        itemManagerMapper.deleteItemImages(itemId);
        if (dto.getImageNames() != null) {
            for (String name : dto.getImageNames()) {
                itemManagerMapper.insertItemImage(itemId, name);
            }
        }
    }

    public void deleteItem(Long itemId) {
        itemManagerMapper.deleteItemImages(itemId);
        itemManagerMapper.deleteItem(itemId);
    }
}