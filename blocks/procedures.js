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
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.procedures.HUE = 290;

Blockly.Blocks['procedures_defnoreturn'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    var nameField = new Blockly.FieldTextInput(
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
    }
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.arguments_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  /**
   * Initialization of the block has completed, clean up anything that may be
   * inconsistent as a result of the XML loading.
   * @this Blockly.Block
   */
  validate: function () {
    var name = Blockly.Procedures.findLegalName(
        this.getFieldValue('NAME'), this);
    this.setFieldValue(name, 'NAME');
  },
  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  /**
   * Update the display of parameters for this procedure definition block.
   * Display a warning if there are duplicately named parameters.
   * @private
   * @this Blockly.Block
   */
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var i = 0; i < this.arguments_.length; i++) {
      if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[i].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = '';
    if (this.arguments_.length) {
      paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
          ' ' + this.arguments_.join(', ');
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    this.setFieldValue(paramString, 'PARAMS');
    Blockly.Events.enable();
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {=boolean} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function(opt_paramIds) {
    var container = document.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }
    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput('RETURN')) {
      containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                                   'STATEMENTS');
    } else {
      containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
    }

    // Parameter list.
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.arguments_.length; i++) {
      var paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[i], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getFieldValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements == 'TRUE';
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            var stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours_();
          }
          this.setStatements_(false);
        }
      }
    }
  },
  /**
   * Dispose of any callers.
   * @this Blockly.Block
   */
  dispose: function() {
    var name = this.getFieldValue('NAME');
    Blockly.Procedures.disposeCallers(name, this.workspace);
    // Call parent's destructor.
    this.constructor.prototype.dispose.apply(this, arguments);
  },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES NOT have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, false];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return this.arguments_;
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    var change = false;
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var i = 0, block; block = blocks[i]; i++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
            block.setFieldValue(newName, 'NAME');
          }
        }
      }
    }
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = goog.dom.createDom('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var option = {enabled: true};
        var name = this.arguments_[i];
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', 'variables_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['procedures_defreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    var nameField = new Blockly.FieldTextInput(
        Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE,
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
    this.arguments_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  validate: Blockly.Blocks['procedures_defnoreturn'].validate,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  dispose: Blockly.Blocks['procedures_defnoreturn'].dispose,
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
  /**
   * Mutator block for procedure container.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.appendDummyInput('STATEMENT_INPUT')
        .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['procedures_mutatorarg'] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
        .appendField(new Blockly.FieldTextInput('x', this.validator_), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
    this.contextMenu = false;
  },
  /**
   * Obtain a valid name for the procedure.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Beyond this, all names are legal.
   * @param {string} newVar User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified.
   * @private
   * @this Blockly.Block
   */
  validator_: function(newVar) {
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
  }
};

Blockly.Blocks['procedures_callnoreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(this.id, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.procedures.HUE);
    // Tooltip is set in renameProcedure.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      this.setTooltip(
          (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
           Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
          .replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function(paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }
    if (goog.array.equals(this.arguments_, paramNames)) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkIds_ = paramIds;
      } else {
        this.quarkIds_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
            paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours_();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        field.setValue(this.arguments_[i]);
        Blockly.Events.enable();
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        this.getField('ARGNAME' + i).setValue(newName);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  }
};

Blockly.Blocks['procedures_callreturn'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField('', 'NAME');
    this.setOutput(true);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    // Tooltip is set in domToMutation.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_:
      Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_callnoreturn'].customContextMenu
};

Blockly.Blocks['procedures_ifreturn'] = {
  /**
   * Block for conditionally returning a value from a procedure.
   * @this Blockly.Block
   */
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput('VALUE')
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
    this.hasReturnValue_ = true;
  },
  /**
   * Create XML to represent whether this block has a return value.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('value', Number(this.hasReturnValue_));
    return container;
  },
  /**
   * Parse XML to restore whether this block has a return value.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var value = xmlElement.getAttribute('value');
    this.hasReturnValue_ = (value == 1);
    if (!this.hasReturnValue_) {
      this.removeInput('VALUE');
      this.appendDummyInput('VALUE')
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    }
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a procedure?
    var block = this;
    do {
      if (this.FUNCTION_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      // If needed, toggle whether this block has a return value.
      if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendDummyInput('VALUE')
          .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = false;
      } else if (block.type == 'procedures_defreturn' &&
                 !this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendValueInput('VALUE')
          .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = true;
      }
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
    }
  },
  /**
   * List of block types that are functions and thus do not need warnings.
   * To add a new function type add this to your code:
   * Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('custom_func');
   */
  FUNCTION_TYPES: ['procedures_defnoreturn', 'procedures_defreturn']
};

Blockly.Blocks['robProcedures_defnoreturn'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    var name = Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
    var nameField = new Blockly.FieldTextInput(name, Blockly.Procedures.robRename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(nameField, 'NAME')
        .appendField('', 'WITH');
    this.appendStatementInput('STACK').appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
    if (this.workspace.device !== "thymio") {
      this.setMutator(new Blockly.MutatorPlus(['robProcedures_defnoreturn']));
    }
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.declare_ = false;
  },
  /**
   * Initialization of the block has completed, clean up anything that may be
   * inconsistent as a result of the XML loading.
   * @this Blockly.Block
   */
  validate: function () {
    var name = Blockly.Procedures.findLegalName(
        this.getFieldValue('NAME'), this);
    this.setFieldValue(name, 'NAME');
  },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - that it DOES NOT have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this, false];
  },
  /**
   * Create XML to represent whether a statement list of variable declarations
   * should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.declare_ === undefined) {
      return false;
    }
    var container = document.createElement('mutation');
    container.setAttribute('declare', (this.declare_ == true));
    return container;
  },
  /**
   * Parse XML to restore the statement list.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.declare_ = (xmlElement.getAttribute('declare') != 'false');
    if (this.declare_) {
      this.setFieldValue(Blockly.Msg.PROCEDURES_BEFORE_PARAMS, 'WITH');
      var stackConnectionTarget = this.getInput('STACK').connection.targetConnection;
      this.removeInput('STACK');
      this.appendStatementInput('ST');
      this.getInput('ST').connection.setCheck('declarationLocal');
      this.appendStatementInput('STACK').appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
      if (stackConnectionTarget) {
        this.getInput('STACK').connection.connect(stackConnectionTarget);
      }
    }
  },
  /**
   * Update the shape according, if declarations exists.
   * @param {Number} number 1 add a variable declaration, -1 remove a variable
   *            declaration.
   * @this Blockly.Block
   */
  updateShape_: function(num) {
    if (num == 1) {
      if (!this.declare_) {
        this.declare_ = true;
        this.setFieldValue(Blockly.Msg.PROCEDURES_BEFORE_PARAMS, 'WITH');
        var stackConnectionTarget = this.getInput('STACK').connection.targetConnection;
        this.removeInput('STACK');
        this.appendStatementInput('ST');
        // making sure only declarations can connect to the statement list
        this.getInput('ST').connection.setCheck('declarationLocal');
        this.appendStatementInput('STACK').appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        if (stackConnectionTarget) {
          this.getInput('STACK').connection.connect(stackConnectionTarget);
        }
      }
      var vd = this.workspace.newBlock('robLocalVariables_declare');
      vd.surroundParentName = this.getFieldValue('NAME');
      vd.initSvg();
      vd.render();
      var connection;
      if (this.getInput('ST').connection.targetConnection) {
        var block = this.getInput('ST').connection.targetConnection.sourceBlock_;
        if (block) {
          // look for the last variable declaration block in the sequence
          while (block.getNextBlock()) {
            block = block.getNextBlock();
          }
        }
        block.setNext(true);
        connection = block.nextConnection;
      } else {
        connection = this.getInput('ST').connection;
      }
      connection.connect(vd.previousConnection);
      Blockly.Procedures.updateCallers(vd.getFieldValue('VAR'), 'Number', this.workspace, num);
    } else if (num == -1) {
      this.setFieldValue('', 'WITH');
      this.removeInput('ST');
      this.declare_ = false;
    }
  }
};

Blockly.Blocks['robProcedures_defreturn'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    var returnDropdown = Blockly.TYPE_DROPDOWN(this.workspace.device, 'none');
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    var name = Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
    var nameField = new Blockly.FieldTextInput(name, Blockly.Procedures.robRename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(nameField, 'NAME')
        .appendField('', 'WITH');
    this.appendStatementInput('STACK').appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
    this.setMutator(new Blockly.MutatorPlus(['robProcedures_defreturn']));
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
    this.appendValueInput('RETURN').
         setAlign(Blockly.ALIGN_RIGHT).
         appendField(Blockly.Msg.RETURN).
         appendField(returnDropdown, 'TYPE').
         appendField(Blockly.Msg.PROCEDURES_DEFRETURN_BACK).
         setCheck('Number');
    this.declare_ = false;
    this.returnType_ = 'Number';
  },
  /**
   * Initialization of the block has completed, clean up anything that may be
   * inconsistent as a result of the XML loading.
   * @this Blockly.Block
   */
  validate: function () {
    var name = Blockly.Procedures.findLegalName(
        this.getFieldValue('NAME'), this);
    this.setFieldValue(name, 'NAME');
  },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - that it DOES NOT have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this, true];
  },
  getReturnType: function() {
    return this.returnType_;
  },
  /**
   * Create XML to represent whether a statement list of variable declarations
   * should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.declare_ === undefined) {
      return false;
    }
    var container = document.createElement('mutation');
    container.setAttribute('declare', (this.declare_ == true));
    container.setAttribute('return_type', this.returnType_);
    return container;
  },
  /**
   * Parse XML to restore the statement list.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.declare_ = (xmlElement.getAttribute('declare') != 'false');
    if (this.declare_) {
      this.addDeclarationStatement_();
    }
    this.returnType_ = xmlElement.getAttribute('return_type');
    if (this.returnType_) {
      this.updateType_(this.returnType_);
    }
  },
  /**
   * Update the shape according, if declarations exists.
   * @param {Number} number 1 add a variable declaration, -1 remove a variable
   *            declaration.
   * @this Blockly.Block
   */
  updateShape_: function(num, opt_option) {
    if (num == 1) {
      if (!this.declare_) {
        this.addDeclarationStatement_();
        this.declare_ = true;
      }
      var vd = this.workspace.newBlock('robLocalVariables_declare');
      vd.surroundParentName = this.getFieldValue('NAME');
      vd.initSvg();
      vd.render();
      var connection;
      if (this.getInput('ST').connection.targetConnection) {
        var block = this.getInput('ST').connection.targetConnection.sourceBlock_;
        if (block) {
          // look for the last variable declaration block in the sequence
          while (block.getNextBlock()) {
            block = block.getNextBlock();
          }
        }
        block.setNext(true);
        connection = block.nextConnection;
      } else {
        connection = this.getInput('ST').connection;
      }
      connection.connect(vd.previousConnection);
      Blockly.Procedures.updateCallers(vd.getFieldValue('VAR'), 'Number', this.workspace, num);
    } else if (num == 0) {
            var option = opt_option || this.getFieldValue('TYPE');
            this.getInput('RETURN').connection.setCheck(option);
    } else if (num == -1) {
      this.setFieldValue('', 'WITH');
      this.removeInput('ST');
      this.declare_ = false;
    }
  },
  /**
   * Update the shape according, if declarations exists.
   *
   * @this Blockly.Block
   */
  addDeclarationStatement_ : function() {
    var returnDropdown = Blockly.TYPE_DROPDOWN(this.workspace.device, 'none');
    this.setFieldValue(Blockly.Msg.PROCEDURES_BEFORE_PARAMS, 'WITH');
    var returnConnectionTarget = this.getInput('RETURN').connection.targetConnection;
    var stackConnectionTarget = this.getInput('STACK').connection.targetConnection;
    this.removeInput('RETURN');
    this.removeInput('STACK');
    this.appendStatementInput('ST');
    // making sure only declarations can connect to the statement list
    this.getInput('ST').connection.setCheck('declarationLocal');
    this.appendStatementInput('STACK').appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
    this.appendValueInput('RETURN').
         setAlign(Blockly.ALIGN_RIGHT).
         appendField(Blockly.Msg.RETURN).
         appendField(returnDropdown, 'TYPE').
         appendField(Blockly.Msg.PROCEDURES_DEFRETURN_BACK).
         setCheck(this.returnType_);
    this.setFieldValue(this.returnType_, 'TYPE');
    if (returnConnectionTarget) {
      this.getInput('RETURN').connection.connect(returnConnectionTarget);
    }
    if (stackConnectionTarget) {
      this.getInput('STACK').connection.connect(stackConnectionTarget);
    }
  },

  updateType_: function(option) {
    if (option && this.getFieldValue('TYPE') !== option) {
      this.returnType_ = option;
      this.getInput('RETURN').setCheck(this.returnType_);
      Blockly.Procedures.updateCallers(
                         this.getFieldValue('NAME'),
                         this.returnType_,
                         this.workspace,
                         99,
                         this.getFieldValue('NAME'));
    }
  }
};

Blockly.Blocks['robProcedures_callnoreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL).appendField('', 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Tooltip is set in domToMutation.
    this.arguments_ = [];
    this.argumentsTypes_ = [];
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming. If the name matches this
   * block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      this.setTooltip(
           (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).
           replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramTypes Types of the params
   * @this Blockly.Block
   */
  setProcedureParameters: function(paramNames, paramTypes, opt_update) {
    if (paramTypes.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    var childConnections = [];
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        var name = input.fieldRow[0].getText();
        childConnections[x] = ({
          'name': name,
          'conn': connection
        });
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
      if (opt_update) {
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.argumentsTypes_ = [].concat(paramTypes);
    var removed = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x).
                       setAlign(Blockly.ALIGN_RIGHT).
                       appendField(this.arguments_[x]).
                       setCheck(this.argumentsTypes_[x]);
      input.init();
      // Reconnect any child blocks.
      if (childConnections.length > 0) {
        var target = null;
        for (var i = 0; i < childConnections.length; i++) {
          if (childConnections[i].name == this.arguments_[x]) {
            target = childConnections[i];
            childConnections.splice(i, 1);
            break;
          }
        }
        if (target && target.conn) {
          var connection = target.conn;
          if (connection &&
              connection.targetConnection &&
              connection.sourceBlock_.workspace != this.workspace) {
            // Block no longer exists or has been attached elsewhere.
            // delete this.quarkConnections_[quarkName];
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    for (var i = 0; i < childConnections.length; i++) {
      var targetNotUsed = childConnections[i];
      if (targetNotUsed && targetNotUsed.conn) {
        targetNotUsed.conn.sourceBlock_.moveBy(50, 15);
        targetNotUsed.conn.sourceBlock_.setInTask(false);
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    this.render();
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {String} name of the parameter
   * @param {String} type of the parameter
   * @param {Number} action
   *                 0 parameter has changed the type
   *                 1 new parameter
   *                -1 delete parameter
   * @this Blockly.Block
   */
  updateProcedureParameters: function(varName, varType, action) {
    if (action == 1 || action == -1 || action == 11) {
      var def = Blockly.Procedures.getDefinition(this.getFieldValue('NAME'), this.workspace);
      var declarations = def.getDescendants();
      var args = [];
      var argsType = [];
      if (declarations) {
        for (var t = 0; t < declarations.length; t++) {
          if (declarations[t].getProcedureDef)
            continue;
          if (declarations[t].getVarDecl && declarations[t].type === "robLocalVariables_declare") {
            args.push(declarations[t].getVarDecl()[0]);
            argsType.push(declarations[t].getType());
          }
        }
      }
      this.setProcedureParameters(args, argsType, true);
    } else if (action == 0) {
      var index = this.arguments_.indexOf(varName);
      if (index >= 0) {
        this.argumentsTypes_[index] = varType;
        var input = this.getInput('ARG' + index);
        input.setCheck(this.argumentsTypes_[index]);
      }
    }
    this.render();
  },
  /**
   * Create XML to represent the (non-editable) name and parameters.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      parameter.setAttribute('type', this.argumentsTypes_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.setFieldValue(name, 'NAME');
    this.setTooltip(
         (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).
         replace('%1', name));
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    this.arguments_ = [];
    this.argumentsTypes_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
        this.argumentsTypes_.push(childNode.getAttribute('type'));
      }
    }
    this.setProcedureParameters(this.arguments_, this.argumentsTypes_);
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {
      enabled: true
    };
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  },
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (event.type == Blockly.Events.DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    }
  }
};


Blockly.Blocks['robProcedures_callreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.appendDummyInput().
         appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL).
         appendField('', 'NAME');
    this.setOutput(true, 'Number');
    // Tooltip is set in domToMutation.
    this.arguments_ = [];
    this.argumentsTypes_ = [];
    this.outputType_ = 'Number';
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming. If the name matches this
   * block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      this.setTooltip(
           (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).
           replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramTypes Types of the params
   * @this Blockly.Block
   */
  setProcedureParameters: function(paramNames, paramTypes, opt_update) {
    if (paramTypes.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    var childConnections = [];
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        var name = input.fieldRow[0].getText();
        childConnections[x] = ({
          'name': name,
          'conn': connection
        });
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
      if (opt_update) {
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.argumentsTypes_ = [].concat(paramTypes);
    var removed = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x).
                       setAlign(Blockly.ALIGN_RIGHT).
                       appendField(this.arguments_[x]).
                       setCheck(this.argumentsTypes_[x]);
      input.init();
      // Reconnect any child blocks.
      if (childConnections.length > 0) {
        var target = null;
        for (var i = 0; i < childConnections.length; i++) {
          if (childConnections[i].name == this.arguments_[x]) {
            target = childConnections[i];
            childConnections.splice(i, 1);
            break;
          }
        }
        if (target && target.conn) {
          var connection = target.conn;
          if (connection &&
              connection.targetConnection &&
              connection.sourceBlock_.workspace != this.workspace) {
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    for (var i = 0; i < childConnections.length; i++) {
      var targetNotUsed = childConnections[i];
      if (targetNotUsed && targetNotUsed.conn) {
        targetNotUsed.conn.sourceBlock_.moveBy(50, 15);
        targetNotUsed.conn.sourceBlock_.setInTask(false);
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    this.render();
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {String} name of the parameter
   * @param {String} type of the parameter
   * @param {Number} action
   *                 0 parameter has changed the type
   *                 1 new parameter
   *                -1 delete parameter
   * @this Blockly.Block
   */
  updateProcedureParameters: function(varName, varType, action) {
    if (action == 1 || action == -1 || action == 11) {
      var def = Blockly.Procedures.getDefinition(this.getFieldValue('NAME'), this.workspace);
      var declarations = def.getDescendants();
      var args = [];
      var argsType = [];
      if (declarations) {
        for (var t = 0; t < declarations.length; t++) {
          if (declarations[t].getProcedureDef)
            continue;
          if (declarations[t].getVarDecl && declarations[t].type === "robLocalVariables_declare") {
            args.push(declarations[t].getVarDecl()[0]);
            argsType.push(declarations[t].getType());
          }
        }
      }
      this.setProcedureParameters(args, argsType, true);
    } else if (action == 0) {
      var index = this.arguments_.indexOf(varName);
      if (index >= 0) {
        this.argumentsTypes_[index] = varType;
        var input = this.getInput('ARG' + index);
        input.setCheck(this.argumentsTypes_[index]);
      }
    } else if (action == 99) {
      // update output
      this.outputType_ = varType;
      this.outputConnection.setCheck(this.outputType_);
    }
    this.render();
  },
  /**
   * Create XML to represent the (non-editable) name and parameters.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      parameter.setAttribute('type', this.argumentsTypes_[x]);
      container.appendChild(parameter);
    }
    container.setAttribute('output_type', this.outputType_);
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.setFieldValue(name, 'NAME');
    this.setTooltip(
         (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).
         replace('%1', name));
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    this.arguments_ = [];
    this.argumentsTypes_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
        this.argumentsTypes_.push(childNode.getAttribute('type'));
      }
    }
    this.setProcedureParameters(this.arguments_, this.argumentsTypes_);
    this.outputType_ = xmlElement.getAttribute('output_type');
    this.setOutput(true, this.outputType_);
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {
      enabled: true
    };
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  },
  onchange: Blockly.Blocks['robProcedures_callnoreturn'].onchange
};

Blockly.Blocks['robProcedures_ifreturn'] = {
  /**
   * Block for conditionally returning a value from a procedure.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://c2.com/cgi/wiki?GuardClause');
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput('VALUE')
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
    this.hasReturnValue_ = true;
    this.returnType_ = null;
  },
  /**
   * Create XML to represent whether this block has a return value.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('value', Number(this.hasReturnValue_));
    if (this.returnType_) {
      container.setAttribute('return_type', this.returnType_);
    }
    return container;
  },
  /**
   * Parse XML to restore whether this block has a return value.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var value = xmlElement.getAttribute('value');
    this.hasReturnValue_ = (value == 1);
    if (!this.hasReturnValue_) {
      this.removeInput('VALUE');
      this.appendDummyInput('VALUE')
        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    } else {
      if (this.returnType_) {
        this.getInput('VALUE').setCheck(this.returnType_);
      }
    }
  },
  /**
   * Returns the name of the procedure this block calls.
   *
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall : function() {
    return this.type;
  },
  updateProcedureParameters : function(varName, varType, action) {
    if (action == 99) {
      // update input
      var block = this;
      do {
        if (block.type == 'robProcedures_defreturn' && block.getFieldValue('NAME') == varName) {
          this.returnType_ = varType;
          this.getInput('VALUE').setCheck(this.returnType_);
          this.render();
            break;
        }
        block = block.getSurroundParent();
      } while (block);
    }
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @this Blockly.Block
   */
  onchange: function() {
    var legal = false;
    // Is the block nested in a procedure?
    var block = this;
    do {
      if (block.type == 'robProcedures_defnoreturn' ||
          block.type == 'robProcedures_defreturn') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      // If needed, toggle whether this block has a return value.
      if (block.type == 'robProcedures_defnoreturn' && this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendDummyInput('VALUE')
          .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = false;
      } else if (block.type == 'robProcedures_defreturn' &&
                 !this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendValueInput('VALUE')
          .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = true;
      }
      if (block.type == 'robProcedures_defreturn') {
        this.returnType_ = block.getReturnType();
        this.getInput('VALUE').setCheck(this.returnType_);
        this.render();
      }
      this.setWarningText(null);
    } else {
      this.returnType_ = null;
      if (this.hasReturnValue) {
        this.getInput('VALUE').setCheck(this.returnType_);
      }
      this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
    }
  }
};