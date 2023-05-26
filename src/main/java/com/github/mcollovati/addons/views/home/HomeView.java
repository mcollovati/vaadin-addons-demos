package com.github.mcollovati.addons.views.home;

import java.util.List;

import com.github.mcollovati.addons.model.Addon;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Home")
@Route(value = "home")
@RouteAlias(value = "")
public class HomeView extends VerticalLayout {

    public HomeView(List<Addon> addons) {
        setSizeFull();
        setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        H1 title = new H1("My Vaadin Addon Demos");
        title.setClassName("header center light-green-text");
        add(title, new HorizontalLayout(
                addons.stream().map(AddonCard::new).toArray(Component[]::new)));
    }

}
