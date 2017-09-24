# Backbone Model for Polymer
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/mikoweb/polymer-backbone)

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

# Backbone.View inside Element

You can use the Backbone.View inside Element. To create a view for element use mixin 
`PolymerViewMixin(elementClass, viewClass)`.

Element with Backbone.View:

```javascript
class XButtonCounterView extends Backbone.View {
    events() {
        return {
            'click .counter__button': '_onClickButton',
        };
    }
    initialize(options) {
        /** @type {XButtonCounter} */
        this._element = options.element;
    }
    _onClickButton(e) {
        this._element.increase();
    }
}

class XButtonCounter extends PolymerViewMixin(Polymer.Element, XButtonCounterView) {
    static get is() {
        return 'x-button-counter';
    }
    static get properties() {
        return {
            count: {
                type: Number,
                value: 0,
            },
        };
    }
    increase() {
        this.count++;
    }
}
```

# Marionette.View inside Element

PolymerViewMixin it also works with Marionette Views.

Element with Mn.View:

```javascript
class XModalView extends Mn.View {
    ui() {
        return {
            close: '.modal__close',
        };
    }
    events() {
        return {
            'click @ui.close': '_onClickClose',
        };
    }
    initialize(options) {
        /** @type {XModal} */
        this._element = options.element;
    }
    _onClickClose(e) {
        this._element.close();
    }
}

class XModal extends PolymerViewMixin(Polymer.Element, XModalView) {
    static get is() {
        return 'x-modal';
    }
    static get properties() {
        return {
            opened: {
                type: Boolean,
                value: false,
            },
        };
    }
    open() {
        this.setAttribute('opened', 'opened');
    }
    close() {
        this.removeAttribute('opened');
    }
}
```
