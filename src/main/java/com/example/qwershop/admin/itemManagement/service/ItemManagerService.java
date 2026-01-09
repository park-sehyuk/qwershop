package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ItemManagerService {
    @Autowired
    private ItemManagerMapper itemManagerMapper;

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }

    @Transactional
    public void registerItem(ItemManagerDto itemDto) {
        itemManagerMapper.insertItem(itemDto);
    }

    @Transactional
    public void modifyItemFull(ItemManagerDto dto) {
        itemManagerMapper.updateItemFull(dto);
    }

    @Transactional
    public void removeItem(Long itemId) {
        itemManagerMapper.deleteItemImgs(itemId);
        itemManagerMapper.deleteItem(itemId);
    }
}