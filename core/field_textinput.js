/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldTextInput');

goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextInput = function(text, opt_validator) {
    Blockly.FieldTextInput.superClass_.constructor.call(this, text,
        opt_validator);
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);

/**
 * Point size of text.  Should match blocklyText's font-size in CSS.
 */
Blockly.FieldTextInput.FONTSIZE = 11;

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldTextInput.prototype.CURSOR = 'text';

/**
 * Allow browser to spellcheck this field.
 * @private
 */
Blockly.FieldTextInput.prototype.spellcheck_ = true;

/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldTextInput.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldTextInput.superClass_.dispose.call(this);
};

/**
 * Set the text in this field.
 * @param {?string} text New text.
 * @override
 */
Blockly.FieldTextInput.prototype.setValue = function(text) {
    if (text === null) {
        return;  // No change if null.
    }
    if (this.sourceBlock_ && this.validator_) {
        var validated = this.validator_(text);
        // If the new text is invalid, validation returns null.
        // In this case we still want to display the illegal result.
        if (validated !== null && validated !== undefined) {
            text = validated;
        }
    }
    Blockly.Field.prototype.setValue.call(this, text);
};

/**
 * Set whether this field is spellchecked by the browser.
 * @param {boolean} check True if checked.
 */
Blockly.FieldTextInput.prototype.setSpellcheck = function(check) {
    this.spellcheck_ = check;
};

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function() {
    this.workspace_ = this.sourceBlock_.workspace;
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
    var div = Blockly.WidgetDiv.DIV;
    // Create the input.
    var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    if (this.inputType === 'number') {
        // chose tel as an input type to force touch devices to display a numeric keypad (if supported)
        // unfortunately IOS has no numeric input type with a "-", so that we cannot use it for math blocks.
        if (!(goog.userAgent.IOS && this.sourceBlock_.type === 'math_number')) {
            htmlInput.setAttribute('type', 'tel');
        }
    }
    var fontSize =
        (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;
    /** @type {!HTMLInputElement} */
    Blockly.FieldTextInput.htmlInput_ = htmlInput;
    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.text_;
    htmlInput.oldValue_ = null;
    this.validate_();
    this.resizeEditor_();
    htmlInput.focus();
    htmlInput.select();

    // Bind to keydown -- trap Enter without IME and Esc to hide.
    htmlInput.onKeyDownWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
    // Bind to keyup -- trap Enter; resize after every keystroke.
    htmlInput.onKeyUpWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
    // Bind to keyPress -- repeatedly resize when holding down a key.
    htmlInput.onKeyPressWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
    htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
    this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(e) {
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    var tabKey = 9, enterKey = 13, escKey = 27;
    if (e.keyCode == enterKey) {
        Blockly.WidgetDiv.hide();
    } else if (e.keyCode == escKey) {
        htmlInput.value = htmlInput.defaultValue;
        Blockly.WidgetDiv.hide();
    } else if (e.keyCode == tabKey) {
        Blockly.WidgetDiv.hide();
        this.sourceBlock_.tab(this, !e.shiftKey);
        e.preventDefault();
    }
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(e) {
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    // Update source block.
    var text = htmlInput.value;
    if (text !== htmlInput.oldValue_) {
        htmlInput.oldValue_ = text;
        this.setValue(text);
        this.validate_();
    } else if (goog.userAgent.WEBKIT) {
        // Cursor key.  Render the source block to show the caret moving.
        // Chrome only (version 26, OS X).
        this.sourceBlock_.render();
    }
    this.resizeEditor_();
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextInput.prototype.validate_ = function() {
    var valid = true;
    goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    if (this.sourceBlock_ && this.validator_) {
        valid = this.validator_(htmlInput.value);
    }
    if (valid === null) {
        Blockly.addClass_(htmlInput, 'blocklyInvalidInput');
    } else {
        Blockly.removeClass_(htmlInput, 'blocklyInvalidInput');
    }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
    var div = Blockly.WidgetDiv.DIV;
    var bBox = this.fieldGroup_.getBBox();
    div.style.width = bBox.width * this.workspace_.scale + 'px';
    div.style.height = bBox.height * this.workspace_.scale + 'px';
    var xy = this.getAbsoluteXY_();
    // In RTL mode block fields and LTR input fields the left edge moves,
    // whereas the right edge is fixed.  Reposition the editor.
    if (this.sourceBlock_.RTL) {
        var borderBBox = this.getScaledBBox_();
        xy.x += borderBBox.width;
        xy.x -= div.offsetWidth;
    }
    // Shift by a few pixels to line up exactly.
    xy.y += 1;
    if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
        // Firefox mis-reports the location of the border by a pixel
        // once the WidgetDiv is moved into position.
        xy.x -= 1;
        xy.y -= 1;
    }
    if (goog.userAgent.WEBKIT) {
        xy.y -= 3;
    }
    div.style.left = xy.x + 'px';
    div.style.top = xy.y + 'px';
};

/**
 * Close the editor, save the results, and dispose of the editable
 * text field's elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
    var thisField = this;
    return function() {
        var htmlInput = Blockly.FieldTextInput.htmlInput_;
        // Save the edit (if it validates).
        var text = htmlInput.value;
        if (thisField.sourceBlock_ && thisField.validator_) {
            var text1 = thisField.validator_(text);
            if (text1 === null) {
                // Invalid edit.
                text = htmlInput.defaultValue;
            } else if (text1 !== undefined) {
                // Validation function has changed the text.
                text = text1;
            }
        }
        thisField.setValue(text);
        thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
        Blockly.unbindEvent_(htmlInput.onKeyDownWrapper_);
        Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
        Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
        thisField.workspace_.removeChangeListener(
            htmlInput.onWorkspaceChangeWrapper_);
        Blockly.FieldTextInput.htmlInput_ = null;
        // Delete style properties.
        var style = Blockly.WidgetDiv.DIV.style;
        style.width = 'auto';
        style.height = 'auto';
        style.fontSize = '';
    };
};

/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
Blockly.FieldTextInput.numberValidator = function(text) {
    if (text === null) {
        return null;
    }
    text = String(text);
    // TODO: Handle cases like 'ten', '1.203,14', etc.
    // 'O' is sometimes mistaken for '0' by inexperienced users.
    text = text.replace(/O/ig, '0');
    // Strip out thousands separators.
    text = text.replace(/,/g, '.');
    // fix for german users ;-)
    // Only the most right decimal point is valid and persists
    text = text.replace(/\.(?=.*?\.)/g, '');
    var n = parseFloat(text || 0);
    return isNaN(n) ? null : String(n);
};

/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
Blockly.FieldTextInput.nonnegativeNumberValidator = function(text) {
    if (text === null) {
        return null;
    }
    text = String(text);
    // TODO: Handle cases like 'ten', '1.203,14', etc.
    // 'O' is sometimes mistaken for '0' by inexperienced users.
    text = text.replace(/O/ig, '0');
    // Strip out thousands separators.
    text = text.replace(/,/g, '.');
    // fix for german users ;-)
    // Only the most right decimal point is valid and persists
    text = text.replace(/\.(?=.*?\.)/g, '');
    var n = parseFloat(text || 0);
    return isNaN(n) ? null : String(Math.abs(n));
};

/**
 * Ensure that only a nonnegative integer may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid int, or null if invalid.
 */
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(text) {
    var n = Blockly.FieldTextInput.numberValidator(text);
    if (n) {
        n = String(Math.max(0, Math.floor(n)));
    }
    return n;
};

/**
 * Ensure that only an integer may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid int, or null if invalid.
 */
Blockly.FieldTextInput.integerValidator = function(text) {
    var n = Blockly.FieldTextInput.numberValidator(text);
    if (n) {
        n = String(Math.floor(n));
    }
    return n;
};