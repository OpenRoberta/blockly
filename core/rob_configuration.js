/**
 * @fileoverview Utility functions for handling configuration blocks.
 * @author Beate.Jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.RobConfig');

goog.require('Blockly.Workspace');

/**
 * Find all instances of this configuration block and rename the values in the
 * dropdown.
 * 
 * @param {string}
 *            oldName Configuration title to rename.
 * @param {string}
 *            newName New configuration name.
 * @param {!Blockly.Workspace}
 *            workspace Workspace rename variables in.
 */
Blockly.RobConfig.renameConfig = function(thatBlock, oldName, newName, workspace) {
    Blockly.Events.setGroup(true);
    var blocks = workspace.getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var block = blocks[x];
        if (!block.dependConfig) {
            continue;
        }
        var dependConfig;
        if (typeof block.dependConfig === "function") {
            dependConfig = block.dependConfig();
        } else {
            dependConfig = block.dependConfig;
        }
        var matchingSubCompTypes = [];
        var subComponentNames = new Set();
        for (var i = 1; i < thatBlock.inputList.length; i++) {
            var subComp = thatBlock.inputList[i].fieldRow[1];
            if (subComp.name) {
                // subcomponents may have an additional underscore in the name, to give it a unique name
                var subCompType = subComp.name.toLowerCase().split('_')[0];
                var subCompName = subComp.getText();
                if (subCompType === dependConfig.type && subCompName === oldName) {
                    matchingSubCompTypes.push([subCompType, subCompName]);
                    subComponentNames.add(subCompName);
                }
            }
        }
        if (thatBlock.confBlock !== dependConfig.type && matchingSubCompTypes.length === 0) {
            continue;
        }
        var dropDown = dependConfig.dropDown;
        if (!Array.isArray(dropDown)) {
            dropDown = [dropDown];
        }

        for (var d = 0; d < dropDown.length; d++) {
            if (block.hide && block.dropDownPorts instanceof Blockly.FieldHidden) {
                for (var i = 0; i < block.inputList.length; i++) {
                    var input = block.inputList[i];
                    for (var f = 0; f < input.fieldRow.length; f++) {
                        var field = input.fieldRow[f];
                        if (field === block.dropDownPorts) {       
                            input.removeField(field.name);
                            input.appendField(dropDown[d]);
                            var newField = input.fieldRow[input.fieldRow.length - 1];            
                            input.fieldRow.splice(f, 0, newField);
                            input.fieldRow.splice(-1,1);
                            block.dropDownPorts = newField;
                            // when an inbuilt component becomes visible, don't show the underscore name
                            if (newField.text_.indexOf('_') === 0) {
                                newField.text_ = Blockly.Msg['PORT_INTERNAL'];
                                newField.menuGenerator_[0][0] = newField.text_;
                            }
                        }
                    }
                }
            }

            var index = -1;
            for (var i = 0; i < dropDown[d].menuGenerator_.length; i++) {
                if (dropDown[d].menuGenerator_[i][1] === oldName || subComponentNames.has(dropDown[d].menuGenerator_[i][1])) {
                    index = i;
                    break;
                }
            }
            if (dropDown[d].menuGenerator_[0][0] == Blockly.Msg.CONFIGURATION_NO_PORT) {
                dropDown[d].menuGenerator_[0][0] = newName;
                dropDown[d].menuGenerator_[0][1] = newName;
                dropDown[d].setValue(newName);            
            } else if (index >= 0) {
                dropDown[d].menuGenerator_[index][0] = newName;
                dropDown[d].menuGenerator_[index][1] = newName;
                if (dropDown[d].value_ === oldName) {
                    dropDown[d].setValue(newName);
                }
            } else {
                dropDown[d].menuGenerator_.push([ newName, newName ]);
                if (dropDown[d].arrow_) {
                    dropDown[d].arrow_.replaceChild(document.createTextNode(dropDown[d].sourceBlock_.RTL ? Blockly.FieldDropdown.ARROW_CHAR + ' ' : ' '
                            + Blockly.FieldDropdown.ARROW_CHAR), dropDown[d].arrow_.childNodes[0]);
                }   
                dropDown[d].render_();
            }
        }
        block.render();
    }
    Blockly.Events.setGroup(false);
};

Blockly.RobConfig.disposeConfig = function(thisBlock) {
    Blockly.Events.setGroup(true);
    var blocks = Blockly.Workspace.getByContainer("blocklyDiv").getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var block = blocks[x];
        if (!block.dependConfig) {
            continue;
        }
        var dependConfig;
        if (typeof block.dependConfig === "function") {
            dependConfig = block.dependConfig();
        } else {
            dependConfig = block.dependConfig;
        }
        var subComponentTypes = new Set();
        var subComponentNames = new Set();
        for (var i = 1; i < thisBlock.inputList.length; i++) {
            var subComp = thisBlock.inputList[i].fieldRow[1];
            if (subComp.name) {
                // subcomponents may have an additional underscore in the name, to give it a unique name
                subComponentTypes.add(subComp.name.toLowerCase().split('_')[0]);
                subComponentNames.add(subComp.getText());
            }
        }
        if (thisBlock.confBlock !== dependConfig.type && !subComponentTypes.has(dependConfig.type)) {
            continue;
        }
        var dropDown = dependConfig.dropDown;
        if (!Array.isArray(dropDown)) {
            dropDown = [dropDown];
        }
        for (var d = 0; d < dropDown.length; d++) {
            var toRemove = new Set();
            if (dropDown[d].menuGenerator_) {
                for (var i = 0; i < dropDown[d].menuGenerator_.length; i++) {
                    var dropDownEntry = dropDown[d].menuGenerator_[i][1];
                    if (dropDownEntry === thisBlock.getFieldValue('NAME') || subComponentNames.has(dropDownEntry)) {
                        toRemove.add(dropDownEntry);
                    }
                }
            }
            if (dropDown[d].menuGenerator_ && toRemove.size > 0) {
                dropDown[d].menuGenerator_ = dropDown[d].menuGenerator_.filter(function(item) {
                    return !toRemove.has(item[0]);
                });
                if (dropDown[d].menuGenerator_.length == 0) {
                    dropDown[d].menuGenerator_.push([ Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'),
                            (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase() ]);
                    dropDown[d].setValue((Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase());
                    if (dropDown[d].arrow_) {
                        dropDown[d].arrow_.replaceChild(document.createTextNode(''), dropDown[d].arrow_.childNodes[0]);
                    }
                    dropDown[d].render_();
                } else if (dropDown[d].menuGenerator_.length == 1) {
                    dropDown[d].arrow_.replaceChild(document.createTextNode(''), dropDown[d].arrow_.childNodes[0]);
                    dropDown[d].render_();
                }
                if (dropDown[d].getValue() === thisBlock.getFieldValue('NAME') || subComponentNames.has(dropDown[d].getValue())) {
                    dropDown[d].setValue(dropDown[d].menuGenerator_[0][1]);
                }
            }
        }

        if (block.hide) {
                for (var i = 0; i < block.inputList.length; i++) {
                    var input = block.inputList[i];
                    for (var f = 0; f < input.fieldRow.length; f++) {
                        var field = input.fieldRow[f]
                        if (field instanceof Blockly.FieldDropdown && field === block.dropDownPorts && field.menuGenerator_.length < 2) {
                            input.removeField(field.name);
                            input.appendField(new Blockly.FieldHidden(), field.name);
                            var newField = input.fieldRow[input.fieldRow.length - 1];            
                            input.fieldRow.splice(f, 0, newField);
                            input.fieldRow.splice(-1,1);
                            block.dropDownPorts = newField;
                        }
                    }
                }
        }
        block.render();
    }
    Blockly.Events.setGroup(false);
}

/**
 * Ensure two identically-named configuration blocks don't exist.
 * 
 * @param {string}
 *            name Proposed variable name.
 * @param {!Blockly.Block}
 *            block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.RobConfig.findLegalName = function(name, block, opt_oldName) {
    while (!Blockly.RobConfig.isLegalName(name, block, opt_oldName) || Blockly.Variables.isReservedName(name, block)) {
        // Collision with another variable.
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
            name += '2';
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
};

Blockly.RobConfig.isLegalName = function(name, block, opt_oldName) {
    var blocks = Blockly.mainWorkspace.getAllBlocks();

    var names = [];
    // Iterate through every block.
    for (var x = 0; x < blocks.length; x++) {
        if (blocks[x] == block) {
            continue;
        }
        var func = blocks[x].getConfigDecl;
        if (func) {
            var configs = func.call(blocks[x]);
            for (var i = 0; i < configs.length; i++) {
                names.push(configs[i].name);
            }
        }
    }
    // Iterate through the block itself, as it may be a super block with subcomponents
    if (block.super) {
        for (var i = 0; i < block.inputList.length; i++) { // leave out the name itself
            var nName = block.inputList[i].fieldRow[1].getText();
            if (nName !== opt_oldName) {
                names.push(nName);
            }
        }
    }

    for (var i = 0; i < names.length; i++) {
        if (Blockly.Names.equals(name, names[i])) {
            return false;
        }
    }
    return true;
};