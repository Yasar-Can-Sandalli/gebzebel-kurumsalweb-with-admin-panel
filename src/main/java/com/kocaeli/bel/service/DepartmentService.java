package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Mudurlukler;
import com.kocaeli.bel.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Mudurlukler> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
