package com.github.mcollovati.addons;

import java.util.ArrayList;

import com.github.mcollovati.addons.views.spinkit.SpinkitAddon;
import com.github.mcollovati.addons.views.twitterwidgets.TwitterWidgetsAddon;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class DemoConfig {

    @Bean
    @Order(1)
    SpinkitAddon spinkitAddon() {
        return new SpinkitAddon();
    }

    @Bean
    @Order(2)
    TwitterWidgetsAddon twitterWidgetsAddon() {
        return new TwitterWidgetsAddon();
    }

}
