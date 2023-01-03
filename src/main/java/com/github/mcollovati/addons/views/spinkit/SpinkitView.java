/*
 * Copyright (C) 2016-2022 Marco Collovati (mcollovati@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.github.mcollovati.addons.views.spinkit;

import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.github.mcollovati.addons.commons.Markdown;
import org.vaadin.spinkit.Spinner;
import org.vaadin.spinkit.SpinnerSize;
import org.vaadin.spinkit.SpinnerType;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Vaadin Spinkit Add-on Demo")
@Route("spinkit")
public class SpinkitView extends Div {

    public SpinkitView() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.add("Spinners", spinnersContainer());
        tabSheet.add("Sizes", spinnerSizesContainer());
        tabSheet.add("Source code",
                new Markdown(getClass().getResourceAsStream("source.md")));
        tabSheet.add("Dialog", new Button("Open dialog", ev -> openDialog()));
        tabSheet.setSizeFull();

        Markdown info = new Markdown(
                getClass().getResourceAsStream("about.md"));

        VerticalLayout layout = new VerticalLayout();
        layout.setSizeFull();
        layout.add(info);
        layout.addAndExpand(tabSheet);
        add(layout);
    }

    private void openDialog() {
        VerticalLayout layout = new VerticalLayout(
                createSpinner(SpinnerType.CIRCLE).extraLarge()
                        .withDisplayBlock());
        layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
        layout.setWidth("300px");
        layout.setHeight("300px");
        Dialog dialog = new Dialog(layout);
        dialog.setCloseOnEsc(true);
        dialog.setCloseOnOutsideClick(true);
        dialog.open();
    }

    private Component spinnersContainer() {
        List<Spinner> spinners = Stream.of(SpinnerType.values())
                .filter(t -> !t.isAlias()).map(SpinkitView::createSpinner)
                .collect(Collectors.toList());

        FlexLayout spinnersContainer = toFlexLayout(spinners);

        /*
         * FlexibleGridLayout spinnersContainer = new FlexibleGridLayout()
         * .withColumns(Repeat.RepeatMode.AUTO_FILL, new Length("25%"))
         * .withPadding(true) .withSpacing(true)
         * .withItems(spinners.stream().map(s -> spinnerWithName(s,
         * Spinner::getType)).toArray(Component[]::new));
         */

        TextField color = new TextField("Color (--sk-color)", "#333");
        color.addValueChangeListener(
                e -> spinners.forEach(s -> s.setColor(e.getValue())));

        ComboBox<String> theme = new ComboBox<>("Css class", "", "green",
                "red");
        theme.addValueChangeListener(e -> spinners.forEach(s -> {
            Optional.ofNullable(e.getOldValue())
                    .ifPresent(css -> s.removeClassName("sk-demo-" + css));
            s.addClassName("sk-demo-" + e.getValue());
        }));
        VerticalLayout commands = new VerticalLayout();
        commands.setAlignItems(FlexComponent.Alignment.START);
        commands.setMargin(false);
        commands.setSpacing(true);
        commands.add(color, theme);
        commands.setSizeUndefined();

        HorizontalLayout layout = new HorizontalLayout(commands,
                spinnersContainer);
        layout.setSizeFull();
        layout.setMargin(false);
        layout.setSpacing(true);
        layout.setFlexGrow(1, spinnersContainer);
        return layout;
    }

    private Component spinnerSizesContainer() {

        List<Spinner> spinners = EnumSet
                .complementOf(EnumSet.of(SpinnerSize.DEFAULT)).stream()
                .map(size -> {
                    Spinner s = createSpinner(SpinnerType.PLANE);
                    s.setSize(size);
                    s.setTitle(size.name());
                    return s;
                }).collect(Collectors.toList());

        List<SpinnerType> spinnerTypes = Stream.of(SpinnerType.values())
                .filter(t -> !t.isAlias()).collect(Collectors.toList());

        ComboBox<SpinnerType> selector = new ComboBox<>("Select spinner type",
                spinnerTypes);
        selector.setValue(SpinnerType.ROTATING_PLANE);
        selector.addValueChangeListener(
                e -> spinners.forEach(s -> s.setType(selector.getValue())));

        TextField baseSize = new TextField("Base size (--sk-size)", "40px");
        baseSize.addValueChangeListener(
                e -> spinners.forEach(s -> s.setBaseSize(e.getValue())));

        FlexLayout spinnersContainer = toFlexLayout(spinners);

        for (SpinnerSize size : EnumSet
                .complementOf(EnumSet.of(SpinnerSize.DEFAULT))) {
            Spinner spinner = new Spinner(SpinnerType.PLANE);
            spinner.setSize(size);
            spinner.setTitle(size.name());
            spinners.add(spinner);
        }

        VerticalLayout commands = new VerticalLayout();
        commands.setSizeUndefined();
        commands.setAlignItems(FlexComponent.Alignment.START);
        commands.setMargin(false);
        commands.setSpacing(true);
        commands.add(selector, baseSize);

        HorizontalLayout layout = new HorizontalLayout(commands,
                spinnersContainer);
        layout.setSizeFull();
        layout.setMargin(false);
        layout.setSpacing(true);
        layout.setFlexGrow(1, spinnersContainer);
        return layout;
    }

    private static FlexLayout toFlexLayout(List<Spinner> spinners) {
        Component[] elements = spinners.stream()
                .map(s -> spinnerWithName(s, Spinner::getType))
                .toArray(Component[]::new);
        FlexLayout spinnersContainer = new FlexLayout(elements);
        spinnersContainer.setFlexGrow(0, elements);
        spinnersContainer.setFlexBasis("25%", elements);
        spinnersContainer.setFlexDirection(FlexLayout.FlexDirection.ROW);
        spinnersContainer.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        return spinnersContainer;
    }

    private static Spinner createSpinner(SpinnerType t) {
        Spinner spinner = new Spinner(t);
        spinner.setTitle(t.name());
        spinner.setCentered(true);
        return spinner;
    }

    private static Component spinnerWithName(Spinner s,
            Function<Spinner, Enum<?>> textFn) {
        VerticalLayout layout = new VerticalLayout(s,
                new Span(textFn.apply(s).toString()));
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        // Div layout = new Div(s, new Span(textFn.apply(s).toString()));
        return layout;
    }
}
