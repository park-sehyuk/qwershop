package com.example.qwershop.user.item.service;

import com.example.qwershop.user.item.dto.ItemDto;
import com.example.qwershop.user.item.mapper.ItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemMapper itemMapper;

    public List<ItemDto> getItemList(Integer type) {
        return itemMapper.getItemList(type);
    }
}
