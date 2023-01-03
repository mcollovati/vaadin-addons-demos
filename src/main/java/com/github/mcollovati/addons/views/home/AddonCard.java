package com.github.mcollovati.addons.views.home;

import com.github.mcollovati.addons.model.Addon;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;

public class AddonCard extends Div {

    public AddonCard(Addon addon) {
        setClassName("card medium");
        add(cardImage(addon), cardContent(addon), cardActions(addon));
    }

    private Div cardImage(Addon addon) {
        String imagePath = "META-INF/resources/images/"
                + addon.getImagePreview();
        Span span = new Span(addon.getName());
        span.addClassNames("card-title", "light-green", "over");
        Div div = new Div(new Image(
                new StreamResource(addon.getImagePreview(),
                        () -> getClass().getClassLoader()
                                .getResourceAsStream(imagePath)),
                addon.getName()), span);
        div.setClassName("card-image");
        return div;
    }

    private Component cardContent(Addon addon) {
        Div div = new Div(new Html("<p>" + addon.getDescription() + "</p>"));
        div.setClassName("card-content");
        return div;
    }

    private Component cardActions(Addon addon) {
        Div div = new Div(new RouterLink("Demo", addon.getDemoView()),
                new Anchor(
                        addon.getGithubURL(),
                        "GitHub"));
        div.setClassName("card-action");
        return div;
    }
}
