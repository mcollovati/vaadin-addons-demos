package com.github.mcollovati.addons.views.home;

import com.github.mcollovati.addons.views.spinkit.SpinkitAddon;
import com.github.mcollovati.addons.views.twitterwidgets.TwitterWidgetsAddon;

import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Home")
@Route(value = "home")
@RouteAlias(value = "")
public class HomeView extends VerticalLayout {

    public HomeView() {
        setSizeFull();
        setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        H1 title = new H1("My Vaadin Addon Demos");
        title.setClassName("header center light-green-text");
        add(title,
                new HorizontalLayout(new AddonCard(new TwitterWidgetsAddon()),
                        new AddonCard(new SpinkitAddon())));

    }

}
