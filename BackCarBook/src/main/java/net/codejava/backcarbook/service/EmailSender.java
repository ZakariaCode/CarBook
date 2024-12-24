package net.codejava.backcarbook.service;


import java.io.File;

public interface EmailSender {
    void send(String to, String doc , File file);
}