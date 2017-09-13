class TestElement extends PolymerModelBindingMixin(Polymer.Element) {
    static get is() {
        return 'test-element';
    }
}

window.customElements.define(TestElement.is, TestElement);
