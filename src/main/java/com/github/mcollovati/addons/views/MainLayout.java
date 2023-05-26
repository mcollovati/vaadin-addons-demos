package com.github.mcollovati.addons.views;

import java.util.List;

import com.github.mcollovati.addons.model.Addon;
import com.github.mcollovati.addons.views.home.HomeView;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;

public class MainLayout extends AppLayout {

    public MainLayout(List<Addon> addons) {
        DrawerToggle toggle = new DrawerToggle();

        H1 title = new H1("My Vaadin Addon Demos");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "0");

        SideNav sideNav = new SideNav();
        addons.stream().map(
                addon -> new SideNavItem(addon.getName(), addon.getDemoView()))
                .forEach(sideNav::addItem);
        sideNav.addItem(new SideNavItem("Home", HomeView.class));

        addToDrawer(sideNav);
        addToNavbar(toggle, title);
    }
}
