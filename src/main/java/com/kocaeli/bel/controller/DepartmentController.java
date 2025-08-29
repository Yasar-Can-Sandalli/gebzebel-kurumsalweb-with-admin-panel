package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Mudurlukler;
import com.kocaeli.bel.repository.DepartmentRepository;
import com.kocaeli.bel.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mudurluk")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private DepartmentRepository mudurRepository;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Mudurlukler> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mudurlukler> getMudurById(@PathVariable Long id) {


        Optional<Mudurlukler> mudur = mudurRepository.findById(id);
        return mudur.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}

