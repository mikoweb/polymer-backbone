/**
 * @license
 * Copyright (c) 2017 Rafał Mikołajun. All rights reserved.
 * This code may only be used under the BSD style license found at LICENSE file.
 */

(function() {
    'use strict';

    /**
     * Backbone Model adapted to Polymer 2.0.
     *
     * @polymer
     */
    window.PolymerModel = Backbone.Model.extend({
        constructor: function() {
            Backbone.Model.apply(this, arguments);
            this._elements = [];
            this.on('change', this._onChange);
        },
        /**
         * @param {HTMLElement} element Element which you connect with model.
         * @param {string} [modelProp] Default "model". Property name in HTMLElement where you store model object.
         */
        attachElement: function(element, modelProp) {
            modelProp = modelProp || 'model';
            var result = false;

            if (_.find(this._elements, function(el) {
                    return el.element === element;
                }) === undefined) {
                element[modelProp] = this.attributes;
                element['$' + modelProp] = this;
                this._elements.push({
                    element: element,
                    modelProp: modelProp
                });

                result = true;
            }

            return result;
        },
        /**
         * @param {HTMLElement} element Element which you disconnect on model.
         */
        dettachElement: function(element) {
            var el = _.find(this._elements, function(item) {
                return item.element === element;
            });

            el.element[el.modelProp] = undefined;
            el.element['$' + el.modelProp] = undefined;
            this._elements = _.without(this._elements, el);
        },
        /**
         * @param {Backbone.Model} model
         * @private
         */
        _onChange(model) {
            this._elements.forEach(function (el) {
                if (_.isString(el.modelProp) && _.isObject(el.element) && _.isFunction(el.element.notifyPath)) {
                    for (var property in model.changed) {
                        if (model.changed.hasOwnProperty(property)) {
                            try {
                                el.element.__stopModelTriggerChange = true;
                                el.element.notifyPath(el.modelProp + '.' + property);
                                el.element.__stopModelTriggerChange = false;
                            } catch (e) {
                                el.element.__stopModelTriggerChange = false;
                            }
                        }
                    }
                }
            });
        }
    });
})();
