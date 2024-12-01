package net.codejava.backcarbook.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class utilisateurController {
//    private static final Logger log = LoggerFactory.getLogger(studentController.class);
//    @Autowired
//    private studentService ops;
//    @PostMapping("/add")
//    public String add(@RequestBody student student) {
//        ops.saveStudent(student);
//        return "new student is added";
//    }
//    @GetMapping("/getAll")
//    public List<student> getAllStudent() {
//       return ops.getAllStudent();
//    }
//    @PutMapping("/update")
//    public String update(@RequestBody student student) {
//        ops.saveStudent(student);
//        return "student is updated";
//    }
//    @GetMapping("/getOne/{id}")
//    public student getOne(@PathVariable int id) {
//        return ops.getStudentById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found with id: " + id));
//    }
//    @DeleteMapping("/delete/{id}")
//    public String delete(@PathVariable int id) {
//        student s = ops.getStudentById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found with id: " + id));
//        ops.deleteStudent(s);
//        return "student is deleted";
//    }
}
