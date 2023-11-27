/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robConfig');

goog.require('Blockly.Blocks.robConfigDefinitions');
goog.require('Blockly.Blocks');

Blockly.Blocks['robConf_generic'] = {
    /*- Generic sensor definition. Will create e.g. the following xml:
     *
     * <block type="robSensors_ultrasonic_getSample" id="vG?X/lTw]%:p!z.},u;r" intask="true">
     *     <mutation mode="DISTANCE"></mutation>
     *     <field name="NAME"></field>
     *     <field name="TRIG">1</field>
     *     <field name="ECHO">2</field>
     * </block>
     *
     */
    /**
     * @param {Object
     *            sensor}
     *
     * @memberof Block
     */
    init: function(confBlock, confBlockName) {
        this.setColour(confBlock.sensor ? Blockly.CAT_SENSOR_RGB : Blockly.CAT_ACTION_RGB);

        var validateName = function(name) {
            var block = this.sourceBlock_;
            name = name.replace(/[\s\xa0]+/g, '').replace(/^ | $/g, '');
            // no name set -> invalid
            if (name === '')
                return null;
            if (!name.match(/^[_a-zA-Z][a-zA-Z_$0-9]*$/))
                return null;

            var subComp = block.inputList.filter(function(item) {
                return (item.nameOld) ? item.nameOld === name : item.fieldRow[1].getText() === name;
            })[0];
            var nameOld = block.nameOld;
            // Ensure two identically-named variables don't exist.
            name = Blockly.RobConfig.findLegalName(name, block, nameOld);
            Blockly.RobConfig.renameConfig(this.sourceBlock_, nameOld, name, Blockly.Workspace.getByContainer('blocklyDiv'));
            block.nameOld = name;
            return name;
        };

        var type = confBlock.sensor ? 'SENSOR_' : 'ACTION_';
        var msg = Blockly.Msg[type + confBlock.title + '_' + this.workspace.device.toUpperCase()] || Blockly.Msg[type + confBlock.title];

        var nameBase = msg.charAt(0).toUpperCase() || Blockly.Msg[type + confBlock.title] || Blockly.checkMsgKey('CONFIGURATION_PORT');
        if (confBlock.inbuilt) {
            nameBase = '_' + nameBase;
        }
        var name = Blockly.RobConfig.findLegalName(nameBase, this);
        this.nameOld = name;
        var nameField = new Blockly.FieldTextInput(name, validateName);
        if (confBlock.inbuilt) {
            nameField.setVisible(false);
        }
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg[type + confBlock.title + '_' + this.workspace.device.toUpperCase()]
            || Blockly.Msg[type + confBlock.title] || type + confBlock.title, 'SENSORTITLE').appendField(nameField, 'NAME');

        if (confBlock.bricks) {
            var container = Blockly.Workspace.getByContainer('bricklyDiv');
            if (container) {
                var topBlocks = Blockly.getMainWorkspace().getTopBlocks(true);
                var variableList = [];
                for (var i = 0; i < topBlocks.length; i++) {
                    var block = topBlocks[i];
                    if (block.type.indexOf('robBrick_') !== -1) {
                        if (block.getVarDecl) {
                            variableList.push([block.getVarDecl()[0], block.getVarDecl()[0]]);
                        }
                    }
                }
            }
            if (variableList.length == 0) {
                variableList.push([['INVALID_NAME', 'INVALID_NAME']]);
            }
            var brickName = new Blockly.FieldDropdown(variableList);
            this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg['BRICKNAME_' + this.workspace.device.toUpperCase()]).appendField(brickName, 'VAR');
            this.getVars = function() {
                return [this.getFieldValue('VAR')];
            };
            this.renameVar = function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            };
        }

        /**
         * Checking for generic block parts like text inputs or dropdowns
         */
        if (confBlock.inputs) {
            for (var i = 0; i < confBlock.inputs.length; i++) {
                var textFieldName = confBlock.inputs[i][0];
                var textField = new Blockly.FieldTextInput(confBlock.inputs[i][1]);
                this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg[confBlock.inputs[i][0]]).appendField(textField, textFieldName);
            }
        }
        if (confBlock.dropdowns) {
            for (var i = 0; i < confBlock.dropdowns.length; i++) {
                var dropDownName = confBlock.dropdowns[i][0];
                var dropDownEntries = confBlock.dropdowns[i][1];
                var dropDownList = [];
                for (var j = 0; j < dropDownEntries.length; j++) {
                    dropDownList.push([Blockly.Msg[dropDownEntries[j][0]] || dropDownEntries[j][0], dropDownEntries[j][1]]);
                }
                var fieldDropDown = new Blockly.FieldDropdown(dropDownList);
                this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg[dropDownName]).appendField(fieldDropDown, dropDownName);
            }
        }

        var ports, pins;
        var portList = [];
        if (confBlock.ports) {
            for (var i = 0; i < confBlock.ports.length; i++) {
                portList.push([Blockly.Msg[confBlock.ports[i][0]] || confBlock.ports[i][0], confBlock.ports[i][1]]);
            }
            ports = new Blockly.FieldDropdown(portList);
        } else {
            ports = new Blockly.FieldHidden();
        }

        if (confBlock.pins) {
            for (var i = 0; i < portList.length; i++) {
                // If no pins for the device are available check the subdevices pins
                var dropDownContent = confBlock.pins.call(this, this.workspace.device);
                if (dropDownContent === undefined) {
                    dropDownContent = confBlock.pins.call(this, this.workspace.subDevice);
                }
                pins = new Blockly.FieldDropdown(dropDownContent);
                if (confBlock.standardPins) {
                    pins.setValue(confBlock.standardPins[i]);
                }
                this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(portList[i][0]).appendField(pins, portList[i][1]);
            }
        }

        if (confBlock.fixedPorts) {
            for (var i = 0; i < confBlock.fixedPorts.length; i++) {
                var name = Blockly.Msg[confBlock.fixedPorts[i][0]] || confBlock.fixedPorts[i][0];
                var dropDown = new Blockly.FieldDropdown([[confBlock.fixedPorts[i][1], confBlock.fixedPorts[i][1]]]);
                this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(name).appendField(dropDown, confBlock.fixedPorts[i][0]);
            }
        }

        if (confBlock.previousStatement) {
            this.setPreviousStatement(true);
        }
        if (confBlock.nextStatement) {
            this.setNextStatement(true);
        }
        this.type = 'robConf_' + confBlockName;
        this.confBlock = confBlock.title.toLowerCase();
        var that = this;
        this.setTooltip(function() {
            return Blockly.Msg[confBlock.title + '_TOOLTIP_' + that.workspace.device.toUpperCase()] || Blockly.Msg[confBlock.title + '_TOOLTIP']
                || confBlock.title + '_TOOLTIP';
        });
        this.getConfigDecl = function() {
            var configDecl = [];
            configDecl.push({
                'type': confBlock.title.toLowerCase(),
                'name': that.getFieldValue('NAME')
            });
            return configDecl;
        };
        this.onDispose = function() {
            Blockly.RobConfig.disposeConfig(this);
        };
    }
};
