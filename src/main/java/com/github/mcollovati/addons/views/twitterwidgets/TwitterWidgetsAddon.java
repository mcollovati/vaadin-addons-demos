package com.github.mcollovati.addons.views.twitterwidgets;

import com.github.mcollovati.addons.model.Addon;

import com.vaadin.flow.component.Component;

public class TwitterWidgetsAddon extends Addon {

    public static final String DESCRIPTION = "<a href=\"https://vaadin.com\">Vaadin</a> Flow component to embed <a href=\"https://dev.twitter.com/web/overview\">Twitter</a> widgets to your application.";

    public TwitterWidgetsAddon() {
        super("Twitter widgets for Vaadin", DESCRIPTION,
                "twitter-widgets-demo.png", TimelineDemo.class,
                "https://github.com/mcollovati/vaadin-twitter-widgets");
    }
}
