class XModalView extends Mn.View {
    initialize(options) {
        /** @type {XModal} */
        this._element = options.element;
    }
    ui() {
        return {
            header: '.modal__header',
            title: '.modal__title',
            close: '.modal__close',
            content: '.modal__content',
        };
    }
    events() {
        return {
            'click': '_onClick',
            'click @ui.close': '_onClickClose',
        };
    }
    /**
     * @param {Event} e
     * @private
     */
    _onClick(e) {
        e.stopPropagation();
    }
    /**
     * @param {Event} e
     * @private
     */
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
            hideHeader: {
                type: Boolean,
                observer: '_onChangeHideHeader',
                value: false,
            }
        };
    }
    ready() {
        super.ready();
        this.addEventListener('click', () => {
            this.close();
        });
    }
    open() {
        this.setAttribute('opened', 'opened');
    }
    close() {
        this.removeAttribute('opened');
    }
    /**
     * @param {boolean} hidden
     * @private
     */
    _onChangeHideHeader(hidden) {
        const header = this.view.getUI('header');

        if (hidden) {
            header.addClass('modal__header--hidden');
        } else {
            header.removeClass('modal__header--hidden');
        }
    }
}

window.customElements.define(XModal.is, XModal);
