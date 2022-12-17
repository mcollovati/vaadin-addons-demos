package com.github.mcollovati.addons.model;

import com.vaadin.flow.component.Component;

public abstract class Addon {

    private final String name;
    private final String description;
    private final String imagePreview;
    private final Class<? extends Component> demoView;
    private final String githubURL;

    protected Addon(String name, String description, String imagePreview,
            Class<? extends Component> demoView, String githubURL) {
        this.name = name;
        this.description = description;
        this.imagePreview = imagePreview;
        this.demoView = demoView;
        this.githubURL = githubURL;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImagePreview() {
        return imagePreview;
    }

    public Class<? extends Component> getDemoView() {
        return demoView;
    }

    public String getGithubURL() {
        return githubURL;
    }
}
