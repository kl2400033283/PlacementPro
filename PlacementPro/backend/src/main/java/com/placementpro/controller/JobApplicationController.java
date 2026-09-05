package com.placementpro.controller;

import com.placementpro.model.JobApplication;
import com.placementpro.repository.JobApplicationRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {
    private final JobApplicationRepository repository;

    public JobApplicationController(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<JobApplication> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public JobApplication create(@Valid @RequestBody JobApplication application) {
        return repository.save(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> update(
            @PathVariable Long id,
            @Valid @RequestBody JobApplication application) {
        return repository.findById(id).map(existing -> {
            existing.setCompany(application.getCompany());
            existing.setRole(application.getRole());
            existing.setLocation(application.getLocation());
            existing.setStatus(application.getStatus());
            existing.setAppliedDate(application.getAppliedDate());
            existing.setPackageLpa(application.getPackageLpa());
            existing.setNotes(application.getNotes());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
