/**
 * Dialog.js is a multipurpose lightweight highly configurable dialog library.
 *
 * @author Eugen Bușoiu <hello@eugen.pro>
 * @link https://github.com/eugenb/dialog.js
 *
 * @licence MIT <https://raw.githubusercontent.com/eugenb/dialog.js/master/LICENSE>
 */

'use strict';

class Dialog {

    /**
     * Dialog constructor.
     *
     * @param body Dialog content
     * @param args Dialog arguments
     */
    constructor(body, args) {

        // Default options
        //
        this.options = {

            // Classes
            //
            dialogClassName: null,
            dialogPlaceholderClassName: null,

            // Sizes
            //
            size: {
                x: 0,
                y: 0
            },
            position: {},

            // AutoShow
            //
            autoShow: true,

            // Events
            //
            autoClose: false,
            closeOnEsc: true,
            closeOnOutsideClick: true,

            // Callbacks
            //
            callback: {
                onBeforeShow: null,
                onShow: null,
                onClose: null
            },

            // Link dialog relative to element
            //
            linkTo: null

        };

        // Extend options
        //
        this.options = Object.assign(this.options, args);

        // Create dialog
        //
        this.create(body);
    }

    /**
     * Checks if given element is a child of given dialog.
     *
     * @param elem Element
     * @param dialog Dialog parent
     * @return {boolean}
     */
    static isChild(elem, dialog) {

        // Get descendents
        //
        let d = dialog.getElementsByTagName('*');
        for (let i = 0; i < d.length; i++) {
            if (d[i] === elem) {
                return true;
            }
        }
        return false;
    }

    /**
     * Close all open dialogs.
     */
    static closeAll() {

        // Close all open dialogs
        //
        document.querySelectorAll('[dialog-id]').forEach(dlg => {
            if (typeof dlg.close === 'function') {
                dlg.close();
            }
        });
    }

    /**
     * Creates dialog.
     *
     * @param body Dialog content
     */
    create(body) {

        // Elements
        //
        this.dlg = document.createElement('div');
        this.dlgPlaceholder = document.createElement('div');

        // Apply default classes
        //
        this.dlgPlaceholder.classList.add('dialog-placeholder');
        this.dlg.classList.add('dialog');

        // Apply given classes
        //
        if (this.options.dialogPlaceholderClassName !== null) {
            this.dlgPlaceholder.classList.add(this.options.dialogPlaceholderClassName);
        }

        if (this.options.dialogClassName !== null) {
            this.dlg.classList.add(this.options.dialogClassName);
        }

        // Set dialog placeholder attributes
        //
        this.dlgPlaceholder.setAttribute('dialog-id', Math.random().toString(36).substr(2, 9));
        this.dlgPlaceholder.style.display = 'none';

        // Set dialog attributes
        //
        this.dlg.setAttribute('dialog-id', Math.random().toString(36).substr(2, 9));

        // Set dialog body
        //
        this.dlg.innerHTML = body;

        // Append dialog
        //
        document.body.appendChild(this.dlgPlaceholder);

        // Calculate sizes
        //
        this.options.size = {
            x: this.dlg.offsetWidth,
            y: this.dlg.offsetHeight
        };

        // Calculate viewport size(s)
        //
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

        // Render dialog linked to an existing element
        //
        if (this.options.linkTo !== null) {

            // Move dialog next to linkTo element
            //
            this.options.linkTo.parentNode.insertBefore(this.dlg, this.options.linkTo.nextSibling);

            // Set position coordinates based on linked element coords
            //
            this.dlg.style.marginLeft = this.options.position.x !== undefined ? `${this.options.position.x}px` : 0;
            this.dlg.style.marginTop = this.options.position.y !== undefined ? `${this.options.position.y}px` : 0;
        }

        else {

            // Append dialog to placeholder
            //
            this.dlgPlaceholder.appendChild(this.dlg);

            // Set position coordinates based on provided values
            //
            this.dlg.style.marginLeft = this.options.position.x !== undefined ? `${this.options.position.x}px` : `${parseInt((viewportWidth - this.options.size.x) / 2)}px`;
            this.dlg.style.marginTop = this.options.position.y !== undefined ? `${this.options.position.y}px` : `${parseInt((viewportHeight - this.options.size.y) / 2)}px`;
        }

        // AutoClose
        //
        if (this.options.autoClose) {
            setTimeout(() => {
                this.close()
            }, parseInt(this.options.autoClose * 1000));
        }

        // Close dialog on escape
        //
        if (this.options.closeOnEsc) {
            document.addEventListener('keyup', e => {

                let key = e.keyCode || e.which,
                    target = e.target || e.srcElement;

                if (target.parentType === 3) {
                    target = target.parentNode;
                }

                if (!/(38|40|27|32)/.test(key) || /input|textarea/i.test(target.tagName)) {
                    return;
                }

                if (key === 27 && this.isVisible()) {
                    this.close();
                }
            });
        }

        // Close dialog when outside click
        //
        if (this.options.closeOnOutsideClick) {
            this.dlgPlaceholder.addEventListener('click', e => {

                let target = e.target || e.srcElement;

                if (this.isVisible() && target !== this.dlg && !Dialog.isChild(target, this.dlg)) {
                    this.close();
                }
            });
        }

        // Attach callbacks
        //
        Object.defineProperty(this.dlg, 'show', {
            value: () => {

                // Trigger onBeforeShow callback
                //
                if (typeof this.options.callback.onBeforeShow === 'function') {
                    this.options.callback.onBeforeShow();
                }

                // Show dialog
                //
                this.dlgPlaceholder.style.display = '';

                // Trigger onBeforeShow callback
                //
                if (typeof this.options.callback.onShow === 'function') {
                    this.options.callback.onShow();
                }
            },
            configurable: true
        });

        Object.defineProperty(this.dlg, 'close', {
            value: () => {

                // Remove dialog
                //
                if (this.isVisible()) {

                    // Trigger onClose callback
                    //
                    if (typeof this.options.callback.onClose === 'function') {
                        this.options.callback.onClose();
                    }

                    // Remove dialog
                    //
                    this.dlg.parentNode.removeChild(this.dlg);

                    // Remove dialog placeholder
                    //
                    this.dlgPlaceholder.parentNode.removeChild(this.dlgPlaceholder);
                    this.dlgPlaceholder = null;
                }
            },
            configurable: true
        });

        // Show dialog (if autoShow is true)
        //
        if (this.options.autoShow) {
            this.show();
        }
    }

    /**
     * Checks if dialog is visible.
     *
     * @return {boolean}
     */
    isVisible() {
        return !(this.dlgPlaceholder.style.display === 'none');
    }

    /**
     * Checks if dialog has been created.
     *
     * @return {boolean}
     */
    isCreated() {
        return this.dlgPlaceholder !== null;
    }

    /**
     * Closes dialog.
     */
    close() {
        this.dlg.close();
    }

    /**
     * Show dialog (if hidden)
     */
    show() {
        this.dlg.show();
    }
}