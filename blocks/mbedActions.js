/**
 * @fileoverview Action blocks for MakeBlock.
 * @requires Blockly.Blocks
 * @author Artem
 */
'use strict';

goog.provide('Blockly.Blocks.mbedActions');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['mbedActions_motor_on'] = {
    /**
     * Turn motor on with specific power.
     * 
     * @constructs mbedActions_motor_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, A + B
     * @param {Number}
     *            POWER relative - 0-100
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('motor');
        this.dependConfig = {
            'type' : 'motor',
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('POWER').appendField(Blockly.Msg.MOTOR).appendField(this.dropDownPorts, 'MOTORPORT').appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var motorPort = parseInt(thisBlock.getFieldValue('MOTORPORT')); // TODO
            if (motorPort === 0 || motorPort === 2 || motorPort === 3) {
                return Blockly.Msg['MOTOR_ON_TOOLTIP_' + thisBlock.workspace.device.toUpperCase() + "_CB"] || Blockly.Msg.MOTOR_ON_TOOLTIP;
            } else {
                return Blockly.Msg['MOTOR_ON_TOOLTIP_' + thisBlock.workspace.device.toUpperCase()] || Blockly.Msg.MOTOR_ON_TOOLTIP;
            }
        });
    }
};

Blockly.Blocks['mbedActions_motors_on'] = {
    /**
     * 
     * Turn both motor on with specific power.
     * 
     * @constructs mbedActions_motors_on
     * @this.Blockly.Block
     * @param {Number}
     *            POWER relative - 0-100
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPortsA = getConfigPorts('motor');
        this.dropDownPortsB = getConfigPorts('motor');
        this.dependConfig = {
            'type' : 'motor',
            'dropDown' : [this.dropDownPortsA, this.dropDownPortsB]
        };
        this.appendValueInput('POWER_A').appendField(Blockly.Msg.MOTOR).appendField(this.dropDownPortsA, 'A').appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.appendValueInput('POWER_B').setAlign(Blockly.ALIGN_RIGHT).appendField(this.dropDownPortsB, 'B').appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
            if (thisBlock.getFieldValue('A') === "LEFT") { // TODO
                return Blockly.Msg['MOTORS_ON_TOOLTIP_' + thisBlock.workspace.device.toUpperCase() + "_CB"] || Blockly.Msg.MOTOR_ON_TOOLTIP;
            } else {
                return Blockly.Msg['MOTORS_ON_TOOLTIP_' + thisBlock.workspace.device.toUpperCase()] || Blockly.Msg.MOTOR_ON_TOOLTIP;
            }
        });
    }
};


Blockly.Blocks['mbedActions_single_motor_on'] = {
    /**
     * @deprecated replaced with mbedActions_motor_on with introduction of configuration
     * 
     * Turn single motor on with specific power.
     * 
     * @constructs mbedActions_single_motor_on
     * @this.Blockly.Block
     * @param {Number}
     *            POWER relative - -100-100
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('POWER').appendField(Blockly.Msg.MOTOR).appendField(Blockly.Msg.MOTOR_ON).appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['SINGLE_MOTOR_ON_TOOLTIP_' + this.workspace.device.toUpperCase()] || Blockly.Msg.SINGLE_MOTOR_ON_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_single_motor_stop'] = {
    /**
     * @deprecated replaced with mbedActions_motor_stop with introduction of configuration
     * 
     * Stop this motor.
     * 
     * @constructs mbedActions_single_motor_stop
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MODE - Float or Non Float
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_FLOAT, 'FLOAT' ], [ Blockly.Msg.MOTOR_BRAKE, 'NONFLOAT' ], [ Blockly.Msg.SLEEP, 'SLEEP' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR).appendField(Blockly.Msg.MOTOR_STOP).appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_STOP_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_motor_stop'] = {
    /**
     * Stop this motor.
     * 
     * @constructs robActions_motor_stop
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {String/dropdown}
     *            MODE - Float or Non Float
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('motor');
        this.dependConfig = {
            'type' : 'motor',
            'dropDown' : this.dropDownPorts
        };
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_FLOAT, 'FLOAT' ], [ Blockly.Msg.MOTOR_BRAKE, 'NONFLOAT' ], [ Blockly.Msg.SLEEP, 'SLEEP' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(Blockly.Msg.MOTOR).appendField(this.dropDownPorts, 'MOTORPORT').appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_STOP_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_motors_stop'] = {
    /**
     * 
     * Stop both motors.
     * 
     * @constructs robActions_motor_stop
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_STOP_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_display_text'] = {
    /**
     * Display a text on the screen.
     * 
     * @constructs mbedActions_display_text
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to show
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device !== 'mbot') {
            var what = new Blockly.FieldDropdown([ [ Blockly.Msg.DISPLAY_TEXT, 'TEXT' ], [ Blockly.Msg.DISPLAY_CHARACTER, 'CHARACTER' ] ]);
            this.appendValueInput('OUT').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').setCheck([ 'Number', 'Boolean', 'String' ]);
        } else {
            var what = new Blockly.FieldDropdown([ [ Blockly.Msg.DISPLAY_TEXT, 'TEXT' ] ]);
            var port = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
            this.appendValueInput('OUT').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').appendField(Blockly.Msg.LED_MATRIX).appendField(port, 'ACTORPORT').setCheck([
                    'Number', 'Boolean', 'String' ]);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.DISPLAY_TEXT_TOOLTIP);
    }
};

Blockly.Blocks['mBotActions_display_text'] = Blockly.Blocks.mbedActions_display_text;

Blockly.Blocks['mbedActions_display_image'] = {
    /**
     * Display an image on the screen.
     * 
     * @constructs mbedActions_display_image
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PICTURE - Smiley1-4
     * @param {Number}
     *            X Position on screen
     * @param {Number}
     *            Y Position on screen
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var what = new Blockly.FieldDropdown([ [ Blockly.Msg.DISPLAY_IMAGE, 'IMAGE' ], [ Blockly.Msg.DISPLAY_ANIMATION, 'ANIMATION' ] ], function(option) {
            if (option) {
                this.sourceBlock_.updateShape_(option);
            }
        });
        if (this.workspace.device !== 'mbot') {
            this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').setCheck('Image');
        } else {
            var port = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
            this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').appendField(Blockly.Msg.LED_MATRIX).appendField(port, 'ACTORPORT').setCheck('Image');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
    },
    /**
     * Create XML to represent the type of the element to show.
     * 
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.getFieldValue('TYPE'));
        return container;
    },
    /**
     * Parse XML to restore the type of the element to show.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.updateShape_(xmlElement.getAttribute('type'));
    },
    /**
     * Modify this block to have the correct number of inputs.
     * 
     * @private
     * @this Blockly.Block
     */
    updateShape_ : function(option) {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        if (option === 'IMAGE') {
            this.getInput('VALUE').setCheck('Image');
        } else {
            this.getInput('VALUE').setCheck('Array_Image');
        }
    }
};
Blockly.Blocks['mBotActions_display_image'] = Blockly.Blocks.mbedActions_display_image;

Blockly.Blocks['mbedActions_display_clear'] = {
    /**
     * Clear the display.
     * 
     * @constructs mbedActions_display_clear
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device !== 'mbot') {
            this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR);
        } else {
            var port = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
            this.appendDummyInput().appendField(Blockly.Msg.CLEAR).appendField(Blockly.Msg.LED_MATRIX).appendField(port, 'ACTORPORT');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['mBotActions_display_clear'] = Blockly.Blocks.mbedActions_display_clear;

Blockly.Blocks['mbedActions_display_getPixel'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.DISPLAY_PIXEL_TITLE).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Y);
        this.setTooltip(Blockly.Msg.DISPLAY_GET_PIXEL_TOOLTIP);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['mbedActions_display_setPixel'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.DISPLAY_PIXEL_TITLE).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Y);
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_SET_PIXEL_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_ledBar_set'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('ledbar');
        this.dependConfig = {
            'type' : 'ledbar',
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.LEDBAR).appendField(this.dropDownPorts).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LEDBAR_SET_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_display_getBrightness'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setTooltip(Blockly.Msg.DISPLAY_GET_BRIGHTNESS_TOOLTIP);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['mbedActions_display_setBrightness'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device !== 'mbot') {
            this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SET + ' '
                    + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        } else {
            var port = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
            this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SET + ' '
                    + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS).appendField(Blockly.Msg.LED_MATRIX).appendField(port, 'ACTORPORT');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_SET_BRIGHTNESS_TOOLTIP);
    }
};

Blockly.Blocks['mBotActions_display_setBrightness'] = Blockly.Blocks.mbedActions_display_setBrightness;

Blockly.Blocks['mbedActions_fourDigitDisplay_show'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('fourdigitdisplay');
        this.dependConfig = {
            'type' : 'fourdigitdisplay',
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW + " " + Blockly.Msg.FOURDIGITDISPLAY).appendField(this.dropDownPorts).appendField(Blockly.Msg.VARIABLES_TYPE_NUMBER).setCheck('Number');
        this.appendValueInput('POSITION').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.FROM_POSITION).setCheck('Number');
        this.appendValueInput('COLON').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLON).setCheck('Boolean');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.FOURDIGITDISPLAY_SHOW_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_fourDigitDisplay_clear'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('fourdigitdisplay');
        this.dependConfig = {
            'type' : 'fourdigitdisplay',
            'dropDown' : this.dropDownPorts
        };
        this.appendDummyInput().appendField(Blockly.Msg.CLEAR).appendField(Blockly.Msg.FOURDIGITDISPLAY).appendField(this.dropDownPorts);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.FOURDIGITDISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_play_tone'] = {
    /**
     * Play a tone.
     * 
     * @constructs robActions_play_tone
     * @this.Blockly.Block
     * @param {Number}
     *            FREQUENCE Frequence
     * @todo
     * @param {Number}
     *            DURATION Time in milliseconds
     * @returns after execution (after DURATION)
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_TONE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        // for some reason non mbed robots use mbedActions_play_tone
        if (this.workspace.device === 'calliope' || this.workspace.device === 'microbit' || this.workspace.device === 'mbot2') {
            this.dropDownPorts = getConfigPorts('buzzer');
            this.dependConfig = {
                'type' : 'buzzer',
                'dropDown' : this.dropDownPorts
            };
            this.appendValueInput('FREQUENCE').appendField(Blockly.Msg.PLAY).appendField(this.dropDownPorts, 'ACTORPORT').appendField(Blockly.Msg.PLAY_FREQUENZ).setCheck('Number');
        } else {
            this.appendValueInput('FREQUENCE').appendField(Blockly.Msg.PLAY).appendField(Blockly.Msg.PLAY_FREQUENZ).setCheck('Number');
        }
        if (this.workspace.device === 'calliope' || this.workspace.device === 'mbot2'){
             hidePortIfOnlyInbuilt(this);
        }
        this.appendValueInput('DURATION').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PLAY_DURATION);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.PLAY_TONE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_TONE_HELP));
    }
};

Blockly.Blocks['mbedActions_play_note'] = {
    /**
     * Play a tone.
     * 
     * @constructs mbedActions_play_note
     * @this.Blockly.Block
     * @param {Number}
     *            FREQUENCE Frequence
     * @todo
     * @param {Number}
     *            DURATION Time in milliseconds
     * @returns after execution (after DURATION)
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_TONE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var frequence = new Blockly.FieldNote('261.626');
        var duration = new Blockly.FieldDropdown([ [ Blockly.Msg.PLAY_WHOLE, '2000' ], [ Blockly.Msg.PLAY_HALF, '1000' ], [ Blockly.Msg.PLAY_QUARTER, '500' ],
                [ Blockly.Msg.PLAY_EIGHTH, '250' ], [ Blockly.Msg.PLAY_SIXTEENTH, '125' ] ]);
        
        if (this.workspace.device === 'calliope' || this.workspace.device === 'microbit' || this.workspace.device === 'wedo' || this.workspace.device === 'mbot2') {
            this.dropDownPorts = getConfigPorts('buzzer');
            this.dependConfig = {
                'type' : 'buzzer',
                'dropDown' : this.dropDownPorts
            };            
            this.appendDummyInput().appendField(Blockly.Msg.PLAY).appendField(this.dropDownPorts, 'ACTORPORT').appendField(duration, 'DURATION').appendField(frequence, 'FREQUENCE');
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.PLAY).appendField(duration, 'DURATION').appendField(frequence, 'FREQUENCE');
        }
        if (this.workspace.device === 'calliope' || this.workspace.device === 'mbot2') {
            hidePortIfOnlyInbuilt(this);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.PLAY_NOTE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_TONE_HELP));
    }
};

Blockly.Blocks['mbedActions_play_setVolume'] = {
    /**
     * Set volume.
     * 
     * @constructs mbedActions_play_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME 0-100, default 50
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_SETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VOLUME').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_SETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_SETVOLUME_HELP));
    }
};

Blockly.Blocks['mbedActions_play_getVolume'] = {
    /**
     * Get current volume
     * 
     * @constructs mbedActions_play_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     * @see {@link mbedActions_play_setVolume}
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_GETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.PLAY_GETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_GETVOLUME_HELP));
    }
};

Blockly.Blocks['mbedActions_leds_on'] = {
    /**
     * Turn bricklight on.
     * 
     * @constructs mbedActions_brickLight_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SWITCH_COLOR - Green, Orange or Red
     * @param {Boolean/dropdown}
     *            SWITCH_BLINK - True or False
     * @returns immediately
     * @memberof Block
     */
    init : function() {

        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('rgbled');
        this.dependConfig = {
            'type' : 'rgbled',
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('COLOR').appendField(Blockly.Msg.LED_ON).appendField(this.dropDownPorts, 'ACTORPORT').appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');
        hidePortIfOnlyInbuilt(this);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
        var thisBlock = this;
        this.setTooltip(function() {
            if (parseInt(thisBlock.getFieldValue('ACTORPORT')) > 0) {
                return Blockly.Msg.LED_ON_TOOLTIP_CB;
            } else {
                return Blockly.Msg.LED_ON_TOOLTIP;
            }
        });
    }
};

Blockly.Blocks['mbedActions_leds_off'] = {
    /**
     * Turn bricklight off.
     * 
     * @constructs mbedActions_brickLight_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('rgbled');
        this.dependConfig = {
            'type' : 'rgbled',
            'dropDown' : this.dropDownPorts
        };
        this.appendDummyInput().appendField(Blockly.Msg.LED_OFF).appendField(this.dropDownPorts, 'ACTORPORT');
        hidePortIfOnlyInbuilt(this);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_OFF_TOOLTIP);
    }
};

// adapted from previous mbedActions_write_to_pin and robActions_write_pin from robActions.js
Blockly.Blocks['mbedActions_write_to_pin'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('digitalin');
        var that = this;
        var valueType = new Blockly.FieldDropdown([ [ Blockly.Msg.DIGITAL, 'DIGITAL' ], [ Blockly.Msg.ANALOG, 'ANALOG' ] ], function(option) {
            if (option && this.sourceBlock_.getFieldValue('VALUETYPE') !== option) {
                that.updatePins_(option);
            }
        });
        this.protocol_ = 'DIGITAL';        
        this.dependConfig = {
            'type' : this.protocol_,
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('VALUE').appendField(Blockly.Msg.PIN_WRITE).appendField(valueType, 'VALUETYPE').appendField(Blockly.Msg.VALUE_TO + ' ' + Blockly.Msg.SENSOR_PIN).appendField(this.dropDownPorts, 'PIN').setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.WRITE_TO_PIN_TOOLTIP);
        this.updatePins_(this.protocol_);
    },
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('protocol', this.protocol_);
        return container;
    },
    domToMutation : function(xmlElement) {
        var input = xmlElement.getAttribute('protocol');
        this.protocol_ = input;
        this.updatePins_(this.protocol_);
    },
    updatePins_ : function(option) {
    	this.protocol_ = option;
        var configBlockName = option.toLowerCase() + 'in';
        var dropDownPorts = getConfigPorts(configBlockName);
        this.dependConfig.type = configBlockName;
        this.dropDownPorts.menuGenerator_ = dropDownPorts.menuGenerator_;
        this.dropDownPorts.arrow_ && this.dropDownPorts.arrow_.replaceChild(document.createTextNode(' '), this.dropDownPorts.arrow_.childNodes[0]);
        if (this.dropDownPorts.arrow_ && this.dropDownPorts.menuGenerator_.length > 1) {
            this.dropDownPorts.arrow_.replaceChild(document.createTextNode(' ' + Blockly.FieldDropdown.ARROW_CHAR), this.dropDownPorts.arrow_.childNodes[0]);
        }
        this.dropDownPorts.setValue(this.dropDownPorts.menuGenerator_[0][0]);
    }
};

Blockly.Blocks['mbedActions_pin_set_pull'] = {
    /**
     * Sets the chosen pin to the specified pull.
     * 
     * @constructs mbedActions_pin_set_pull
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PULL - up, down, none
     * @param {String/dropdown}
     *            PIN - 0-3
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var pull = new Blockly.FieldDropdown(
                [ [ Blockly.Msg.PIN_PULL_UP, 'UP' ], [ Blockly.Msg.PIN_PULL_DOWN, 'DOWN' ], [ Blockly.Msg.PIN_PULL_NONE, 'NONE' ] ]);
        this.dropDownPorts = getConfigPorts('');
        this.dependConfig = {
            'type': '',
            'dropDown': this.dropDownPorts
        };
        this.appendDummyInput().appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PIN_PULL).appendField(pull, 'PIN_PULL').appendField(Blockly.Msg.ON + ' '
            + Blockly.Msg.SENSOR_PIN).appendField(this.dropDownPorts, 'PIN_PORT'); // shouldnt be called PIN, would need a
        // special clause in xml.js like
        // mbedActions_write_to_pin
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PIN_SET_PULL_TOOLTIP);
        this.setWarningText(Blockly.Msg.PIN_SET_PULL_BLOCK_WARNING);
    },
    onchange : function(event) {
        if (!this.workspace || this.workspace.isFlyout || (event.type !== Blockly.Events.UI && event.type !== Blockly.Events.CREATE)) {
            return;
        }
        if (!this.warning) {
            this.setWarningText(Blockly.Msg.PIN_SET_PULL_BLOCK_WARNING);
            return;
        }
        if (event.type === Blockly.Events.CREATE) {
            this.warning.setVisible(true);
        }
    }
};

Blockly.Blocks['mbedActions_switch_led_matrix'] = {
    /**
     * Enables/Disables the leds to use the pins.
     * 
     * @constructs mbedActions_switch_led_matrix
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            STATE - on, off
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var state = new Blockly.FieldDropdown([ [ Blockly.Msg.ON, 'ON' ], [ Blockly.Msg.OFF, 'OFF' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SWITCH + ' ' + Blockly.Msg.LED_MATRIX).appendField(state, 'STATE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.SWITCH_LED_MATRIX_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_servo_set'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('servo');
        this.dependConfig = {
            'type' : 'servo',
            'dropDown' : this.dropDownPorts
        };
        this.appendValueInput('VALUE').appendField(Blockly.Msg.SET + " " + Blockly.Msg.ACTION_SERVO).appendField(this.dropDownPorts, 'PIN_PORT').appendField(Blockly.Msg.TO + ' °').setCheck('Number');
        //this.protocol_ = 'ANALOG';
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_ON_FOR_TOOLTIP_SERVO);
    }
};

Blockly.Blocks['mbedActions_motionkit_single_set'] = {
    /**
     * Turn MotionKit motor(s) on with specific direction.
     * 
     * @constructs mbedActions_motor_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - left, right, both
     * @param {String/dropdown}
     *            DIRECTION - forwards, backwards, off
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        // according to the implementation (https://github.com/tinysuperlab/motionkit/blob/master/MotionKit.ts)
        // C16 seems to be the right motor and C17 the left motor
        var motorPort = new Blockly.FieldDropdown([ [ Blockly.Msg.LEFT, 'C17' ], [ Blockly.Msg.RIGHT, 'C16' ], [ Blockly.Msg.BOTH, 'BOTH' ] ]);
        var direction = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD' ], [ Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD' ], [ Blockly.Msg.OFF, 'OFF' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.MOTIONKIT).appendField(motorPort, 'MOTORPORT').appendField(direction, 'DIRECTION');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTIONKIT_SINGLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_motionkit_dual_set'] = {
    /**
     * Turn MotionKit motors on with specific directions each.
     * 
     * @constructs mbedActions_motionkit_dual_set
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            DIRECTION_L - forwards, backwards, off
     *            DIRECTION_R - forwards, backwards, off
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dir = [ [ Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD' ], [ Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD' ], [ Blockly.Msg.OFF, 'OFF' ] ];
        var directionL = new Blockly.FieldDropdown(dir);
        var directionR = new Blockly.FieldDropdown(dir);
        this.appendDummyInput().appendField(Blockly.Msg.MOTIONKIT).appendField(Blockly.Msg.LEFT).appendField(directionL, 'DIRECTION_LEFT');
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RIGHT).appendField(directionR, 'DIRECTION_RIGHT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTIONKIT_DUAL_TOOLTIP);
    }
};