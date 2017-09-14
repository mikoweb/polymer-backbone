# Backbone Models for Polymer

This simple library that provides Backbone Model for Polymer Custom Elements.

> Polymer is a JavaScript library that helps you create custom reusable HTML elements, and use them to build performant, maintainable apps.
> https://www.polymer-project.org/


> Models are the heart of any JavaScript application, containing the interactive data as well as a large part of the logic surrounding it: conversions, validations, computed properties, and access control. You extend Backbone.Model with your domain-specific methods, and Model provides a basic set of functionality for managing changes. 
http://backbonejs.org/#Model

Two classes have been created to add binding with model. Namely `PolymerModel` which extends normal Backbone.Model and `PolymerModelBindingMixin` that provides bindings for Custom Elements.

## Sample usage

Custom element code:

```html
<link rel="import" href="src/model/model-binding-mixin.html">
<link rel="import" href="bower_components/polymer/polymer-element.html">

<dom-module id="my-element">
    <template>
        <label for="first-name">First name</label>
        <input type="text" name="first_name" id="first-name" value="{{model.firstName::change}}">
        <label for="last-name">Last name</label>
        <input type="text" name="last_name" id="last-name" value="{{model.lastName::change}}">
    </template>
    <script>
        class MyElement extends PolymerModelBindingMixin(Polymer.Element) {
            static get is() {
                return 'my-element';
            }
        }
    
        window.customElements.define(MyElement.is, MyElement);
    </script>
</dom-module>
```

Code placed somewhere on the website:

```html
<link rel="import" href="my-element.html">
<my-element id="foo"></my-element>
<script>
    const element = document.querySelector('#foo');
    const model = new PolymerModel();
    model.attachElement(element);
    model.set('firstName', 'John');
</script>
```

When you change `firstName` property on the model, then `input` inside shadow root is updated and vice versa also.
