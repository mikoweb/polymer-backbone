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
    /**
     * @param {Event} e
     * @private
     */
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
        this._updateCount();
    }
    decrease() {
        this.count--;
        this._updateCount();
    }
    /**
     * @private
     */
    _updateCount() {
        this.shadowRoot.querySelector('.counter__count').textContent = this.count;
    }
}

window.customElements.define(XButtonCounter.is, XButtonCounter);
