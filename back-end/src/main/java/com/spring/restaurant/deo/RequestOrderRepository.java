package com.spring.restaurant.deo;

import com.spring.restaurant.model.RequestOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RequestOrderRepository extends JpaRepository<RequestOrder,Long> {

    public List<RequestOrder> findByUserId(Long id);
}