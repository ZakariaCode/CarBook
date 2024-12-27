package net.codejava.BackCarRental.service;


import java.io.File;

public interface IEmailSender {
    void send(String to, String doc , File file);
}