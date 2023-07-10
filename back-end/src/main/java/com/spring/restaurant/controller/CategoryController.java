package com.spring.restaurant.controller;

import com.spring.restaurant.deo.OrderRepository;
import com.spring.restaurant.deo.RequestOrderRepository;
import com.spring.restaurant.deo.UserRepository;
import com.spring.restaurant.dto.Device;
import com.spring.restaurant.model.Category;
import com.spring.restaurant.model.Order;
import com.spring.restaurant.model.RequestOrder;
import com.spring.restaurant.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RequestOrderRepository requestOrderRepository;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // http://localhost:8080/api/allCategoies
    @GetMapping("/allCategoies")
    public List<Category> getAllCategory(){
        return categoryService.allCategories();
    }

    @PostMapping("/addDevice")
    public void addDevice(@RequestBody Device device){
        RequestOrder requestOrder = new RequestOrder();
        requestOrder.setPrice(device.getPrice());
        requestOrder.setName(device.getName());
        requestOrder.setTime(device.getTime());
        requestOrder.setUser(userRepository.findByEmail(device.getEmail()));

        requestOrderRepository.save(requestOrder);
    }

    @PostMapping("/getDevice")
    public List<RequestOrder> getDevice(@RequestBody Device device){
        Long id = userRepository.findByEmail(device.getEmail()).getId();
        return requestOrderRepository.findByUserId(id);
    }
}