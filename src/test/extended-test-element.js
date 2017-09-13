class ExtendedTestElement extends TestElement {
    static get is() {
        return 'extended-test-element';
    }
    static get properties() {
        return {
            email: String,
        };
    }
}

window.customElements.define(ExtendedTestElement.is, ExtendedTestElement);
