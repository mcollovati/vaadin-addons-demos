package com.github.mcollovati.addons.views.spinkit;

import com.github.mcollovati.addons.model.Addon;

public class SpinkitAddon extends Addon {

    private static final String DESCRIPTION = "<a href=\"https://vaadin.com\">Vaadin</a> Flow component to add <a href=\"http://tobiasahlin.com/spinkit/\">Spinkit</a> spinners to your application.";

    public SpinkitAddon() {
        super("Spinkit for Vaadin", DESCRIPTION, "spinkit-demo.png",
                SpinkitView.class,
                "https://github.com/mcollovati/vaadin-spinkit");
    }
}
