package com.placementpro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String company;

    @NotBlank
    private String role;

    private String location;
    private String status;
    private String appliedDate;
    private String packageLpa;
    private String notes;

    public Long getId() { return id; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }
    public String getPackageLpa() { return packageLpa; }
    public void setPackageLpa(String packageLpa) { this.packageLpa = packageLpa; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
