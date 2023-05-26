package com.github.mcollovati.addons;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;

import com.github.mcollovati.addons.model.Addon;
import com.github.mcollovati.addons.views.spinkit.SpinkitAddon;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "add-ondemos")
@NpmPackage(value = "line-awesome", version = "1.3.0")
@NpmPackage(value = "materialize-css", version = "next")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
