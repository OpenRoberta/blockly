'use strict';

goog.provide('Blockly.Blocks.actions');

goog.require('Blockly.Blocks');

Blockly.Blocks['actions_motor_on'] = {
    /**
     * Turn motor on with specific power.
     *
     * @constructs actions_motor_on
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'encoder' configuration
     * @param {Number}
     *            POWER         Speed (in %) to switch motor on with
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('motor');
        this.jsonInit({
            message0: Blockly.Msg.ACTION_MOTOR + ' %1 ' + Blockly.Msg.ON + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_REGULATION + ' %1',
            lastDummyAlign1: 'RIGHT',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'field_checkbox', checked: 'TRUE', name: 'REGULATION'
            }],
            inputsInline: false,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTOR_ON_TOOLTIP
        });
        this.dependConfig = {
            type: 'motor', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motor_on_for'] = {
    /**
     * Turn motor on with specific power and unit.
     *
     * @constructs actions_motor_on_for
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'encoder' configuration
     * @param {Number}
     *            POWER         Speed (in %) to switch motor on with
     * @param {String|Dropdown}
     *            UNIT          Dropdown with either ROTATIONS or DEGREES
     * @param {Number}
     *            VALUE         Value of UNIT to be used
     * @returns after execution of the block
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('motor');
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.ACTION_MOTOR + ' %1 ' + Blockly.Msg.ON + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.FOR + ' %1 %2',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'field_dropdown',
                name: 'UNIT',
                options: [[Blockly.Msg.MOTOR_ROTATION, 'ROTATIONS'], [Blockly.Msg.MOTOR_DEGREE, 'DEGREES']]
            }, {
                type: 'input_value', name: 'VALUE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTOR_ON_FOR_TOOLTIP
        });
        this.dependConfig = {
            type: 'motor', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motor_getPower'] = {
    /**
     * Get current power of selected motor.
     *
     * @constructs actions_motor_getPower
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'encoder' configuration
     * @returns immediately
     * @returns {Number} current power (in %) of selected motor
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('motor');
        this.jsonInit({
            message0: Blockly.Msg.GET + ' ' + Blockly.Msg.MOTOR_SPEED + ' %1', args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }], colour: Blockly.CAT_ACTION_RGB, output: 'Number', tooltip: Blockly.Msg.MOTOR_GETPOWER_TOOLTIP
        });
        this.dependConfig = {
            type: 'motor', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motor_setPower'] = {
    init: function() {
        var ports = getConfigPorts('motor');
        this.jsonInit({
            message0: Blockly.Msg.SET + ' %1 ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTOR_SETPOWER_TOOLTIP
        });
        this.dependConfig = {
            type: 'motor', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motor_stop'] = {
    init: function() {
        var ports = getConfigPorts('motor');
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STOP + ' ' + Blockly.Msg.ACTION_MOTOR + ' %1 %2',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'field_dropdown',
                name: 'CONTROL',
                options: [[Blockly.Msg.MOTOR_FLOAT, 'COAST'], [Blockly.Msg.MOTOR_BRAKE, 'BRAKE']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTOR_STOP_TOOLTIP
        });
        this.dependConfig = {
            type: 'motor', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motorDiff_on'] = {
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_DRIVE + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_REGULATION + ' %1',
            lastDummyAlign1: 'RIGHT',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'field_checkbox', checked: 'TRUE', name: 'REGULATION'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTORDIFF_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_on_for'] = {
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_DRIVE + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_DISTANCE + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'DISTANCE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_stop'] = {
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STOP + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'CONTROL',
                options: [[Blockly.Msg.MOTOR_FLOAT, 'COAST'], [Blockly.Msg.MOTOR_BRAKE, 'BRAKE']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: true,
            tooltip: Blockly.Msg.MOTORDIFF_STOP_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_turn'] = {
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_TURN + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_REGULATION + ' %1',
            lastDummyAlign1: 'RIGHT',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'field_checkbox', checked: 'true', name: 'REGULATION'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTORDIFF_TURN_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_turn_for'] = {
    /**
     * Turn the robot (in differential drive mode) in defined DIRECTION for defined DEGREES.
     *
     * @constructs actions_motorDiff_turn_for
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either LEFT or RIGHT
     * @param {Number}
     *            POWER         Speed (in %) to turn in DIRECTION mentioned
     * @param {Number}
     *            DEGREES       Value (in °) to turn in DIRECTION mentioned
     * @returns after execution of the block (turning DEGREES °)
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_TURN + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_DEGREE + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'DEGREES', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_TURN_FOR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_curve'] = {
    /**
     * Steer the robot (in differential drive mode) in defined DIRECTION.
     *
     * @constructs actions_motorDiff_curve
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either FORWARD or BACKWARD
     * @param {Number}
     *            POWER_LEFT    Speed (in %) to supply LEFT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *            POWER_RIGHT   Speed (in %) to supply RIGHT wheel to steer in DIRECTION mentioned
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STEER + ' %1 ' + Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %1',
            message2: Blockly.Msg.MOTOR_REGULATION + ' %1',
            lastDummyAlign2: 'RIGHT',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER_LEFT', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'POWER_RIGHT', check: 'Number', align: 'RIGHT'
            }],
            args2: [{
                type: 'field_checkbox', checked: 'TRUE', name: 'REGULATION'
            }],
            inputsInline: false,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorDiff_curve_for'] = {
    /**
     * Steer the robot (in differential drive mode) in defined DIRECTION for defined DISTANCE.
     *
     * @constructs actions_motorDiff_curve
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either FORWARD or BACKWARD
     * @param {Number}
     *            POWER_LEFT    Speed (in %) to supply LEFT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *            POWER_RIGHT   Speed (in %) to supply RIGHT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *           DISTANCE       Value (in cm) to steer in DIRECTION mentioned
     * @returns after execution of the block (steering DISTANCE cm)
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STEER + ' %1 ' + Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %1',
            message2: Blockly.Msg.MOTOR_DISTANCE + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER_LEFT', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'POWER_RIGHT', check: 'Number', align: 'RIGHT'
            }],
            args2: [{
                type: 'input_value', name: 'DISTANCE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_play_tone'] = {
    /**
     * Play a tone.
     *
     * @constructs actions_play_tone
     * @this.Blockly.Block
     * @param {Number}
     *            FREQUENCY     Frequency to be played (in Hz)
     * @param {Number}
     *            DURATION      Time (in ms)
     * @returns after execution of the block (playing DURATION ms)
     * @memberof Block
     */
    init: function() {
        this.setBlocking(true);
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.PLAY + '  ' + Blockly.Msg.PLAY_FREQUENZ + ' %1',
            message1: Blockly.Msg.PLAY_DURATION + ' %1',
            args0: [{
                type: 'input_value', name: 'FREQUENCY', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'DURATION', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_TONE_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_play_note'] = {
    /**
     * Play a note.
     *
     * @constructs actions_play_note
     * @this.Blockly.Block
     * @param {Number}
     *            DURATION      Time (in ms)
     * @param {Number}
     *            FREQUENCY     Frequency to be played (in Hz)
     * @returns after execution of the block (playing DURATION ms)
     * @memberof Block
     */
    init: function() {
        this.setBlocking(true);
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.PLAY + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'DURATION',
                options: [[Blockly.Msg.PLAY_WHOLE, '2000'], [Blockly.Msg.PLAY_HALF, '1000'], [Blockly.Msg.PLAY_QUARTER, '500'], [Blockly.Msg.PLAY_EIGHTH, '250'], [Blockly.Msg.PLAY_SIXTEENTH, '125']]
            }, {
                type: 'field_note', name: 'FREQUENCY', note: '261.626'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_NOTE_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_play_setVolume'] = {
    /**
     * Set volume.
     *
     * @constructs actions_play_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME        Value (in %)
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME + ' ' + Blockly.Msg.SENSOR_UNIT_PERCENT + ' %1',
            args0: [{
                type: 'input_value', name: 'VOLUME', check: 'Number'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_SETVOLUME_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_play_getVolume'] = {
    /**
     * Get volume
     *
     * @constructs actions_play_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number} Current volume (in %)
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME,
            colour: Blockly.CAT_ACTION_RGB,
            output: 'Number',
            tooltip: Blockly.Msg.PLAY_GETVOLUME_TOOLTIP
        });
    }
};

Blockly.Blocks['colour_picker_spike'] = {
    init: function() {
        this.jsonInit({
            message0: '%1', args0: [{
                type: 'field_colour', name: 'COLOUR', 'colour': '#E701A7'
            }], output: 'Colour', colour: Blockly.CAT_COLOUR_RGB
        });

        // Colour block is trivial.  Use tooltip of parent block if it exists.
        this.setTooltip(function() {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) || Blockly.Msg.COLOUR_PICKER_TOOLTIP;
        });
        this.getField('COLOUR').setColours(['#E701A7', '#571CC1', '#3590F5', '#77E7FF', '#0FCB54', '#0BA845', '#F7F700', '#FAAC01', '#FA010C', '#000000', '#FFFFFF', Blockly.CAT_COLOUR_RGB]).setColumns(1);
        var thisBlock = this;
        var validator = function(newValue) {
            switch (newValue.toUpperCase()) {
                case '#E701A7':
                case '#3590F5':
                case '#77E7FF':
                case '#0FCB54':
                case '#F7F700':
                case '#FA010C':
                case '#FFFFFF':
                case '#000000':
                case Blockly.CAT_COLOUR_RGB: {
                    thisBlock.setOutput(true, ['Colour']);
                    break;
                }
                default: {
                    thisBlock.setOutput(true, ['ColourLed']);
                }
            }
            return newValue;
        };
        this.getField('COLOUR').setValidator(validator);
    }
};

Blockly.Blocks['colour_picker_rcj'] = {
    init: function() {
        this.jsonInit({
            message0: '%1', args0: [{
                type: 'field_colour', name: 'COLOUR', 'colour': '#1e5aa8'
            }], output: 'Colour', colour: Blockly.CAT_COLOUR_RGB
        });
        this.setTooltip(function() {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) || Blockly.Msg.COLOUR_PICKER_TOOLTIP;
        });
        this.getField('COLOUR').setColours([ '#1e5aa8',  '#00852a', '#F7F700', '#FA010C', '#000000', '#FFFFFF','#33B8CA', Blockly.CAT_COLOUR_RGB]).setColumns(1);
    }
};

Blockly.Blocks['actions_rgbLed_hidden_on'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' ' + Blockly.Msg.BRICKLIGHT_COLOR + '%1',
            args0: [{
                type: 'input_value', name: 'COLOUR', check: ['Colour', 'ColourLed']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_hidden_off'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_on'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        var that = this;
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: function() {
                return Blockly.Msg['RGB_LED_ON_TOOLTIP_' + that.workspace.device.toUpperCase()] || Blockly.Msg.RGB_LED_ON_TOOLTIP;
            }
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_rgbLed_off'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: ports.menuGenerator_
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_led'] = {
    init: function() {
        var ports = getConfigPorts('led');
        this.jsonInit({
            message0: Blockly.Msg.SET_LED + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: ports.menuGenerator_
            }, {
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.ON, 'ON'],
                    [Blockly.Msg.OFF, 'OFF']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'led',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_led_set_brightness'] = {
    init: function() {
        var ports = getConfigPorts('led');
        this.jsonInit({
            message0: Blockly.Msg.SET + ' ' + Blockly.Msg.LED + ' %1' + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS + ' %' + ' %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'ACTORPORT',
                    options: ports.menuGenerator_
                }, {
                    type: 'input_value', name: 'BRIGHTNESS', check: 'Number'
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_SET_BRIGHTNESS_TOOLTIP_PERCENT
        });
        this.dependConfig = {
            'type': 'led',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_led_botnroll'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.SET_LED + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.ON, 'ON'],
                    [Blockly.Msg.OFF, 'OFF']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_on_thymio'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.SENSOR_TOP, 'TOP'],
                    [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'],
                    [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_off_thymio'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.SENSOR_TOP, 'TOP'],
                    [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'],
                    [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_bricklight_on_ev3'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TURN_BRICKLIGHT + ' ' + Blockly.Msg.BRICKLIGHT_COLOR + ' %1 ',
            args0: [{
                type: 'field_dropdown',
                name: 'COLOUR',
                options: [[Blockly.Msg.BRICKLIGHT_GREEN, 'GREEN'],
                    [Blockly.Msg.BRICKLIGHT_ORANGE, 'ORANGE'],
                    [Blockly.Msg.BRICKLIGHT_RED, 'RED']]
            }],
            message1: '%1',
            args1: [{
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.ON, 'ON'],
                    [Blockly.Msg.BRICKLIGHT_FLASH, 'FLASH'],
                    [Blockly.Msg.BRICKLIGHT_DOUBLE_FLASH, 'DOUBLE_FLASH']]
            }],
            lastDummyAlign1: 'RIGHT',
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.BRICKLIGHT_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_bricklight_off_ev3'] = {
    init: function() {
        var that = this;
        this.jsonInit({
            message0: Blockly.Msg.TURN_BRICKLIGHT + ' %1 ',
            args0: [{
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.OFF, 'OFF'],
                    [Blockly.Msg.RESET, 'RESET']]
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: function() {
                return that.getFieldValue('MODE') === 'OFF' ? Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP : Blockly.Msg.BRICKLIGHT_RESET_TOOLTIP;
            }
        });
    }
};

Blockly.Blocks['actions_rgbled_on_nxt'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    ['Port 1', '1'],
                    ['Port 2', '2'],
                    ['Port 3', '3'],
                    ['Port 4', '4']
                ]
            }, {
                type: 'field_dropdown',
                name: 'COLOUR',
                options: [[Blockly.Msg.BRICKLIGHT_RED, 'RED'],
                    [Blockly.Msg.BRICKLIGHT_GREEN, 'GREEN'],
                    [Blockly.Msg.BRICKLIGHT_BLUE, 'BLUE']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.BRICKLIGHT_ON_TOOLTIP
        });
    }
};
Blockly.Blocks['actions_rgbled_off_nxt'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    ['Port 1', '1'],
                    ['Port 2', '2'],
                    ['Port 3', '3'],
                    ['Port 4', '4']
                ]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_on_nao'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.NAO_LED_EYES, 'EYES'], [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_EYE, 'LEFTEYE'],
                    [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_EYE, 'RIGHTEYE'],
                    [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_FOOT, 'LEFTFOOT'],
                    [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_FOOT, 'RIGHTFOOT'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_off_nao'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TURN_RGBLED + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.NAO_LED_EYES, 'EYES'], [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_EYE, 'LEFTEYE'],
                    [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_EYE, 'RIGHTEYE'],
                    [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_FOOT, 'LEFTFOOT'],
                    [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_FOOT, 'RIGHTFOOT'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            },
                {
                    type: 'field_dropdown',
                    name: 'MODE',
                    options: [[Blockly.Msg.OFF, 'OFF'],
                        [Blockly.Msg.RESET, 'RESET']]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_led_on_nao'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_ON + ' %1 ' + Blockly.Msg.NAO_INTENSITY + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.NAO_LED_HEAD, 'HEAD'], [Blockly.Msg.NAO_LED_EARS, 'EARS'],
                    [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_EAR, 'LEFTEAR'], [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_EAR, 'RIGHTEAR'],
                    [Blockly.Msg.NAO_LED_CHEST, 'CHEST']]
            }, {
                type: 'input_value', name: 'INTENSITY', check: ['Number']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_SET_INTENSITY_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_led_off_nao'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.SET_LED + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.NAO_LED_HEAD, 'HEAD'], [Blockly.Msg.NAO_LED_EARS, 'EARS'],
                    [Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.NAO_LED_EAR, 'LEFTEAR'], [Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.NAO_LED_EAR, 'RIGHTEAR'],
                    [Blockly.Msg.NAO_LED_CHEST, 'CHEST'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            },
                {
                    type: 'field_dropdown',
                    name: 'MODE',
                    options: [[Blockly.Msg.OFF, 'OFF'],
                        [Blockly.Msg.RESET, 'RESET']]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_OFF_TOOLTIP_NAO
        });
    }
};

Blockly.Blocks['actions_rgbLed_on_nibo'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    [Blockly.Msg.NAO_LED_EYE + ' ' + Blockly.Msg.LEFT, 'EYE_2'],
                    [Blockly.Msg.NAO_LED_EYE + ' ' + Blockly.Msg.RIGHT, 'EYE_1']
                ]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        if (this.workspace.device === 'rob3rta') {
            this.inputList[0].fieldRow[1].text_ = Blockly.Msg.NAO_LED_HEAD;
            this.inputList[0].fieldRow[2].prefixField = Blockly.Msg.NAO_LED_HEAD;
        }
    }
};

Blockly.Blocks['actions_rgbLed_off_nibo'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1 ',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    [Blockly.Msg.NAO_LED_EYE + ' ' + Blockly.Msg.LEFT, 'EYE_2'],
                    [Blockly.Msg.NAO_LED_EYE + ' ' + Blockly.Msg.RIGHT, 'EYE_1']
                ]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        if (this.workspace.device === 'rob3rta') {
            this.inputList[0].fieldRow[1].text_ = Blockly.Msg.NAO_LED_HEAD;
            this.inputList[0].fieldRow[2].prefixField = Blockly.Msg.NAO_LED_HEAD;
        }
    }
};

Blockly.Blocks['actions_led_nibo'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.SET_LED + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    [Blockly.Msg.NAO_PART_BODY + ' ' + Blockly.Msg.LEFT, 'LED_4'],
                    [Blockly.Msg.NAO_PART_BODY + ' ' + Blockly.Msg.RIGHT, 'LED_3']
                ]
            }, {
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.ON, 'ON'],
                    [Blockly.Msg.OFF, 'OFF']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_TOOLTIP_NIBO
        });
    }
};

Blockly.Blocks['actions_rgbLed_on_mbot'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.LEFT, '2'],
                    [Blockly.Msg.RIGHT, '1']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_off_mbot'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [[Blockly.Msg.LEFT, '2'],
                    [Blockly.Msg.RIGHT, '1']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_hidden_on_calliope'] = {
    init: function() {
        var ports = getConfigPorts('rgbledh');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' ' + Blockly.Msg.BRICKLIGHT_COLOR + '%1',
            args0: [{
                type: 'input_value', name: 'COLOUR', check: ['Colour', 'ColourLed']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbledh',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_hidden_off_calliope'] = {
    init: function() {
        var ports = getConfigPorts('rgbledh');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbledh',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_hidden_on_mbot2'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'SLOT',
                options: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour', 'ColourLed']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_hidden_off_mbot2'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'SLOT',
                options: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_led_edison'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.SET_LED + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [

                    [Blockly.Msg.LEFT, 'LLED'],
                    [Blockly.Msg.RIGHT, 'RLED']
                ]
            }, {
                type: 'field_dropdown',
                name: 'MODE',
                options: [[Blockly.Msg.ON, 'ON'],
                    [Blockly.Msg.OFF, 'OFF']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_on_thymio'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    [Blockly.Msg.SENSOR_TOP, 'TOP'],
                    [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'],
                    [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']
                ]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_rgbLed_off_thymio'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1 ',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: [
                    [Blockly.Msg.SENSOR_TOP, 'TOP'],
                    [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'],
                    [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']
                ]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
    }
};

Blockly.Blocks['actions_display_image'] = {
    init: function() {
        var types = [[Blockly.Msg.DISPLAY_IMAGE, 'IMAGE'], [Blockly.Msg.DISPLAY_ANIMATION, 'ANIMATION']];
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.DISPLAY_SHOW + '%1' + Blockly.Msg.LED_MATRIX + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'TYPE',
                options: types
            }, {
                type: 'input_value',
                name: 'VALUE',
                check: ["Image","Array_Image"]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.DISPLAY_PICTURE_TOOLTIP
        });
        this.getField('TYPE').setValidator(this.validateType);
        this.dependConfig = {
            'type': 'display',
            'dropDown': 'hide'
        };
    },
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.getFieldValue('TYPE'));
        return container;
    },
    domToMutation: function(xmlElement) {
        this.validateType(xmlElement.getAttribute('type'));
    },
    validateType: function(type) {
        if (type) {
            if ((this.sourceBlock_ && !this.sourceBlock_.workspace) || Blockly.Block.dragMode_ == 2) {
                return;
            }
            if (type === 'IMAGE') {
                this.sourceBlock_ && this.sourceBlock_.getInput('VALUE').setCheck('Image');
                this.sourceBlock_ && this.sourceBlock_.blocking && this.sourceBlock_.blocking && this.sourceBlock_.setBlocking(false);
            } else {
                this.sourceBlock_ && this.sourceBlock_.getInput('VALUE').setCheck('Array_Image');
                this.sourceBlock_ && this.sourceBlock_.setBlocking(true);
            }
        }
    }
};

Blockly.Blocks['actions_display_text'] = {
    init: function() {
        var types = [[Blockly.Msg.DISPLAY_TEXT, 'TEXT'], [Blockly.Msg.DISPLAY_CHARACTER, 'CHARACTER']];
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.DISPLAY_SHOW + '%1' + Blockly.Msg.LED_MATRIX + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'TYPE',
                options: types
            }, {
                type: 'input_value',
                name: 'TEXT',
                check: ['Number', 'Boolean', 'String']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.DISPLAY_TEXT_TOOLTIP
        });
        this.setBlocking(true);
        this.dependConfig = {
            'type': 'display',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_display_clear'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.CLEAR + ' ' + Blockly.Msg.LED_MATRIX,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.DISPLAY_CLEAR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'display',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_play_expression'] = {
    init: function() {
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.ACTION_PLAY + ' ' + Blockly.Msg.PLAY_SOUND + ' %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'FILE',
                    options: [
                        [Blockly.Msg.SOUND_GIGGLE, 'GIGGLE'],
                        [Blockly.Msg.SOUND_HAPPY, 'HAPPY'],
                        [Blockly.Msg.SOUND_HELLO, 'HELLO'],
                        [Blockly.Msg.SOUND_MYSTERIOUS, 'MYSTERIOUS'],
                        [Blockly.Msg.SOUND_SAD, 'SAD'],
                        [Blockly.Msg.SOUND_SLIDE, 'SLIDE'],
                        [Blockly.Msg.SOUND_SOARING, 'SOARING'],
                        [Blockly.Msg.SOUND_SPRING, 'SPRING'],
                        [Blockly.Msg.SOUND_TWINKLE, 'TWINKLE'],
                        [Blockly.Msg.SOUND_YAWN, 'YAWN']
                    ]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_EXPRESSION_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_play_file_port'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setBlocking(true);
        var ports = getConfigPorts('buzzer');
        this.jsonInit({
            message0: Blockly.Msg.ACTION_PLAY + ' %1 ' + Blockly.Msg.PLAY_FILE + ' %2',
            args0: [
                {
                    type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
                },
                {
                    type: 'field_dropdown',
                    name: 'FILE',
                    options: [
                        [Blockly.Msg.SOUND_DADADADUM, 'DADADADUM'],
                        [Blockly.Msg.SOUND_ENTERTAINER, 'ENTERTAINER'],
                        [Blockly.Msg.SOUND_PRELUDE, 'PRELUDE'],
                        [Blockly.Msg.SOUND_ODE, 'ODE'],
                        [Blockly.Msg.SOUND_NYAN, 'NYAN'],
                        [Blockly.Msg.SOUND_RINGTONE, 'RINGTONE'],
                        [Blockly.Msg.SOUND_FUNK, 'FUNK'],
                        [Blockly.Msg.SOUND_BLUES, 'BLUES'],
                        [Blockly.Msg.SOUND_BIRTHDAY, 'BIRTHDAY'],
                        [Blockly.Msg.SOUND_WEDDING, 'WEDDING'],
                        [Blockly.Msg.SOUND_FUNERAL, 'FUNERAL'],
                        [Blockly.Msg.SOUND_PUNCHLINE, 'PUNCHLINE'],
                        [Blockly.Msg.SOUND_PYTHON, 'PYTHON'],
                        [Blockly.Msg.SOUND_BADDY, 'BADDY'],
                        [Blockly.Msg.SOUND_CHASE, 'CHASE'],
                        [Blockly.Msg.SOUND_BA_DING, 'BA_DING'],
                        [Blockly.Msg.SOUND_WAWAWAWAA, 'WAWAWAWAA'],
                        [Blockly.Msg.SOUND_JUMP_UP, 'JUMP_UP'],
                        [Blockly.Msg.SOUND_JUMP_DOWN, 'JUMP_DOWN'],
                        [Blockly.Msg.SOUND_POWER_UP, 'POWER_UP'],
                        [Blockly.Msg.SOUND_POWER_DOWN, 'POWER_DOWN']
                    ]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_FILE_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};


Blockly.Blocks['actions_play_file'] = {
    init: function() {
        this.setBlocking(true);
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.ACTION_PLAY + ' ' + Blockly.Msg.PLAY_FILE + ' %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'FILE',
                    options: [
                        [Blockly.Msg.SOUND_DADADADUM, 'DADADADUM'],
                        [Blockly.Msg.SOUND_ENTERTAINER, 'ENTERTAINER'],
                        [Blockly.Msg.SOUND_PRELUDE, 'PRELUDE'],
                        [Blockly.Msg.SOUND_ODE, 'ODE'],
                        [Blockly.Msg.SOUND_NYAN, 'NYAN'],
                        [Blockly.Msg.SOUND_RINGTONE, 'RINGTONE'],
                        [Blockly.Msg.SOUND_FUNK, 'FUNK'],
                        [Blockly.Msg.SOUND_BLUES, 'BLUES'],
                        [Blockly.Msg.SOUND_BIRTHDAY, 'BIRTHDAY'],
                        [Blockly.Msg.SOUND_WEDDING, 'WEDDING'],
                        [Blockly.Msg.SOUND_FUNERAL, 'FUNERAL'],
                        [Blockly.Msg.SOUND_PUNCHLINE, 'PUNCHLINE'],
                        [Blockly.Msg.SOUND_PYTHON, 'PYTHON'],
                        [Blockly.Msg.SOUND_BADDY, 'BADDY'],
                        [Blockly.Msg.SOUND_CHASE, 'CHASE'],
                        [Blockly.Msg.SOUND_BA_DING, 'BA_DING'],
                        [Blockly.Msg.SOUND_WAWAWAWAA, 'WAWAWAWAA'],
                        [Blockly.Msg.SOUND_JUMP_UP, 'JUMP_UP'],
                        [Blockly.Msg.SOUND_JUMP_DOWN, 'JUMP_DOWN'],
                        [Blockly.Msg.SOUND_POWER_UP, 'POWER_UP'],
                        [Blockly.Msg.SOUND_POWER_DOWN, 'POWER_DOWN']
                    ]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_EXPRESSION_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_sound_toggle'] = {
    init: function() {
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.SPEAKER + ' %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'MODE',
                    options: [
                        [Blockly.Msg.ON, 'ON'],
                        [Blockly.Msg.OFF, 'OFF']
                    ]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.SOUND_TOGGLE_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLed_on_joycar'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 %2' + Blockly.Msg.BRICKLIGHT_COLOR + '%3',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: ports.menuGenerator_
            }, {
                type: 'field_dropdown',
                name: 'SLOT',
                options: [[Blockly.Msg.SLOT_OUTER, '0'], [Blockly.Msg.SLOT_INNER, '1']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_rgbLed_off_joycar'] = {
    init: function() {
        var ports = getConfigPorts('rgbled');
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1 %2',
            args0: [{
                type: 'field_dropdown',
                name: 'ACTORPORT',
                options: ports.menuGenerator_
            }, {
                type: 'field_dropdown',
                name: 'SLOT',
                options: [[Blockly.Msg.SLOT_OUTER, '0'], [Blockly.Msg.SLOT_INNER, '1']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_motor_on_txt4'] = {
    /**
     * Turn motor on with specific power.
     *
     * @constructs actions_motor_on_txt4
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'encoder' and 'motor' configuration
     * @param {Number}
     *            POWER         Speed (in %) to switch motor on with
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var encoderPorts = getConfigPorts('encodermotor').getOptions_();
        var motorPorts = getConfigPorts('motor').getOptions_();
        var portsAsDropdown;
        if (encoderPorts[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            portsAsDropdown = new Blockly.FieldDropdown(motorPorts);
        } else if (motorPorts[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            portsAsDropdown = new Blockly.FieldDropdown(encoderPorts);
        } else {
            portsAsDropdown = new Blockly.FieldDropdown(encoderPorts.concat(motorPorts));
        }
        this.jsonInit({
            message0: Blockly.Msg.ACTION_MOTOR + ' %1 ' + Blockly.Msg.ON + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            lastDummyAlign1: 'RIGHT',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: portsAsDropdown.menuGenerator_
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            inputsInline: false,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTOR_ON_TOOLTIP
        });
        this.dependConfig = {
            type: 'encoder', dropDown: this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_motor_on_for_txt4'] = {
    /**
     * Turn motor on with specific power and unit.
     *
     * @constructs actions_motor_on_for_txt4
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'encoder' configuration
     * @param {Number}
     *            POWER         Speed (in %) to switch motor on with
     * @param {String|Dropdown}
     *            UNIT          Dropdown with either ROTATIONS or DEGREES
     * @param {Number}
     *            VALUE         Value of UNIT to be used
     * @returns after execution of the block
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('encodermotor');
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.ACTION_MOTOR + ' %1 ' + Blockly.Msg.ON + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.FOR + ' %1 %2',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'field_dropdown',
                name: 'UNIT',
                options: [[Blockly.Msg.MOTOR_ROTATION, 'ROTATIONS'], [Blockly.Msg.MOTOR_DEGREE, 'DEGREES']]
            }, {
                type: 'input_value', name: 'VALUE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTOR_ON_FOR_TOOLTIP
        });
        this.dependConfig = {
            type: 'encoder', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motor_stop_txt4'] = {
    init: function() {
        var encoderPorts = getConfigPorts('encodermotor').getOptions_();
        var motorPorts = getConfigPorts('motor').getOptions_();
        var portsAsDropdown;
        if (encoderPorts[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            portsAsDropdown = new Blockly.FieldDropdown(motorPorts);
        } else if (motorPorts[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            portsAsDropdown = new Blockly.FieldDropdown(encoderPorts);
        } else {
            portsAsDropdown = new Blockly.FieldDropdown(encoderPorts.concat(motorPorts));
        }
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STOP + ' ' + Blockly.Msg.ACTION_MOTOR + ' %1',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: portsAsDropdown.menuGenerator_
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTOR_STOP_TOOLTIP
        });
        this.dependConfig = {
            type: 'encoder', dropDown: this.getField('ACTORPORT')
        };

    }
};

Blockly.Blocks['actions_motorOmniDiff_on_txt4'] = {
    init: function() {
        var ports = getConfigPorts('omnidrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        var directions = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD'], [Blockly.Msg.LEFT, 'LEFT'], [Blockly.Msg.RIGHT, 'RIGHT'], ['forward left', 'FORWARDLEFT'],
            ['backward left', 'BACKWARDLEFT'], ['forward right', 'FORWARDRIGHT'], ['backward right', 'BACKWARDRIGHT']], 'DIRECTION');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            directions = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]);
            ports = getConfigPorts('differentialdrive');
        }
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_DRIVE + ' %1 ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: directions.menuGenerator_
            },
                {
                    type: 'input_value', name: 'POWER', check: 'Number'
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTORDIFF_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'omnidrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_on_for_txt4'] = {
    init: function() {
        var ports = getConfigPorts('omnidrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        var directions = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD'], [Blockly.Msg.LEFT, 'LEFT'], [Blockly.Msg.RIGHT, 'RIGHT'], ['forward left', 'FORWARDLEFT'],
            ['backward left', 'BACKWARDLEFT'], ['forward right', 'FORWARDRIGHT'], ['backward right', 'BACKWARDRIGHT']], 'DIRECTION');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            directions = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]);
            ports = getConfigPorts('differentialdrive');
        }
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_DRIVE + ' %1 ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_DISTANCE + ' %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'DIRECTION',
                    options: directions.menuGenerator_
                }, {
                    type: 'input_value', name: 'POWER', check: 'Number'
                }],
            args1: [{
                type: 'input_value', name: 'DISTANCE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTORDIFF_ON_TOOLTIP
        });

        this.dependConfig = {
            'type': 'omnidrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_stop_txt4'] = {
    init: function() {
        var ports = getConfigPorts('omnidrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STOP,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: true,
            tooltip: Blockly.Msg.MOTORDIFF_STOP_TOOLTIP
        });
        this.dependConfig = {
            'type': 'omnidrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_turn_txt4'] = {
    /**
     * Turn the robot (in omnidrive or differentialdrive mode) in defined DIRECTION.
     *
     * @constructs actions_motorOmni_turn_txt4
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either LEFT or RIGHT
     * @param {Number}
     *            POWER         Speed (in %) to turn in DIRECTION mentioned
     * @param {Number}
     *            DEGREES       Value (in °) to turn in DIRECTION mentioned
     * @returns after execution of the block (turning DEGREES °)
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('omnidrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_TURN + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_TURN_TOOLTIP
        });
        this.dependConfig = {
            'type': 'omnidrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_turn_for_txt4'] = {
    /**
     * Turn the robot (in omnidrive or differentialdrive mode) in defined DIRECTION for defined DEGREES.     *
     * @constructs actions_motorOmni_turn_txt4
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either LEFT or RIGHT
     * @param {Number}
     *            POWER         Speed (in %) to turn in DIRECTION mentioned
     * @param {Number}
     *            DEGREES       Value (in °) to turn in DIRECTION mentioned
     * @returns after execution of the block (turning DEGREES °)
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('omnidrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_TURN + ' %1 ' + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_DEGREE + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]
            }, {
                type: 'input_value', name: 'POWER', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'DEGREES', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_TURN_FOR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'omnidrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['robActions_servo_on_for_txt4'] = {
    /**
     * Turn motor on with specific power and unit.
     *
     * @constructs actions_servo_on_for
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            ACTORPORT     Dropdown computed from the robot's 'servo' configuration
     * @param {Number}
     *            VALUE         Value of degrees to rotate
     * @returns after execution of the block
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('servo');
        this.jsonInit({
            message0: Blockly.Msg.SET + ' ' + Blockly.Msg.ACTION_SERVO_ARDUINO + ' %1 ' + Blockly.Msg.TO + ' °%2',
            args0: [{
                type: 'field_dropdown', name: 'ACTORPORT', options: ports.menuGenerator_
            }, {
                type: 'input_value', name: 'VALUE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            inputsInline: false,
            tooltip: Blockly.Msg.MOTOR_ON_FOR_TOOLTIP_SERVO
        });
        this.dependConfig = {
            type: 'servo', dropDown: this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_curve'] = {
    /**
     * Steer the robot (in differential and omni drive mode) in defined DIRECTION.
     *
     * @constructs actions_motorDiff_curve
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either FORWARD or BACKWARD
     * @param {Number}
     *            POWER_LEFT    Speed (in %) to supply LEFT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *            POWER_RIGHT   Speed (in %) to supply RIGHT wheel to steer in DIRECTION mentioned
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STEER + ' %1 ' + Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %1',
            lastDummyAlign2: 'RIGHT',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER_LEFT', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'POWER_RIGHT', check: 'Number', align: 'RIGHT'
            }],
            args2: [{
                type: 'field_checkbox', checked: 'TRUE', name: 'REGULATION'
            }],
            inputsInline: false,
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_motorOmniDiff_curve_for'] = {
    /**
     * Steer the robot (in differential and omni drive mode) in defined DIRECTION for defined DISTANCE.
     *
     * @constructs actions_motorDiff_curve
     * @this.Blockly.Block
     * @param {String|Dropdown}
     *            DIRECTION     Either FORWARD or BACKWARD
     * @param {Number}
     *            POWER_LEFT    Speed (in %) to supply LEFT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *            POWER_RIGHT   Speed (in %) to supply RIGHT wheel to steer in DIRECTION mentioned
     * @param {Number}
     *           DISTANCE       Value (in cm) to steer in DIRECTION mentioned
     * @returns after execution of the block (steering DISTANCE cm)
     * @memberof Block
     */
    init: function() {
        var ports = getConfigPorts('differentialdrive');
        if (ports.getOptions_()[0][0] === (Blockly.Msg.CONFIGURATION_NO_PORT)) {
            ports = getConfigPorts('differentialdrive');
        }
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.setBlocking(true);
        this.jsonInit({
            message0: Blockly.Msg.MOTOR_STEER + ' %1 ' + Blockly.Msg.MOTOR_LEFT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %2',
            message1: Blockly.Msg.MOTOR_RIGHT + ' ' + Blockly.Msg.MOTOR_SPEED + ' %1',
            message2: Blockly.Msg.MOTOR_DISTANCE + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'DIRECTION',
                options: [[Blockly.Msg.MOTOR_FOREWARD, 'FORWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]
            }, {
                type: 'input_value', name: 'POWER_LEFT', check: 'Number'
            }],
            args1: [{
                type: 'input_value', name: 'POWER_RIGHT', check: 'Number', align: 'RIGHT'
            }],
            args2: [{
                type: 'input_value', name: 'DISTANCE', check: 'Number', align: 'RIGHT'
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP
        });
        this.dependConfig = {
            'type': 'differentialdrive',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_display_text_txt4'] = {
    init: function() {
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT + '%1',
            message1: Blockly.Msg.DISPLAY_ROW + '%1',
            args0: [{
                type: 'input_value',
                name: 'TEXT',
                check: ['Number', 'Boolean', 'String']
            }],
            args1: [{
                type: 'input_value',
                name: 'ROW',
                check: ['Number']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.DISPLAY_TEXT_TOOLTIP
        });
        this.dependConfig = {
            'type': 'display',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_display_text_rcj'] = Blockly.Blocks['actions_display_text_txt4'];

Blockly.Blocks['actions_display_rgbLed_hidden_on_txt4'] = {
    init: function() {
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_label',
                name: 'DISPLAY',
                text: Blockly.Msg.ACTION_DISPLAY
            }, {
                type: 'input_value',
                name: 'COLOUR',
                check: ['Colour', 'ColourLed']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'display',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};


Blockly.Blocks['actions_display_rgbLed_hidden_off_txt4'] = {
    init: function() {
        var ports = getConfigPorts('display');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + '%1 ',
            args0: [{
                type: 'field_label',
                name: 'DISPLAY',
                text: Blockly.Msg.ACTION_DISPLAY
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'display',
            'dropDown': this.getField('ACTORPORT')
        };
    }
};

Blockly.Blocks['colour_compare'] = {
    init: function() {
        this.setInputsInline(true);
        this.jsonInit({
            message0: '%1 %2 %3 ' + Blockly.Msg.HUE_TOLERANCE + '%4',
            args0: [{
                type: 'input_value',
                name: 'COLOUR1',
                check: ['Colour']

            },
                {
                    type: 'field_dropdown',
                    name: 'OP',
                    options: [['=', 'EQ']]
                },
                {
                    type: 'input_value',
                    name: 'COLOUR2',
                    check: ['Colour']
                }, {
                    type: 'input_value',
                    name: 'TOLERANCE',
                    check: ['Number']
                }],
            output: 'Boolean',
            colour: Blockly.CAT_COLOUR_RGB,
            tooltip: Blockly.Msg.COLOUR_COMPARE_TOOLTIP
        });
    }
};

Blockly.Blocks['robSensors_environmental_calibrate'] = {
    init: function() {
        var ports = getConfigPorts('environmental');
        this.jsonInit({
            message0: Blockly.Msg.SENSOR_CALIBRATE + ' ' + Blockly.Msg.SENSOR_ENVIRONMENTAL + '%1',
            args0: [{
                type: 'field_dropdown', name: 'SENSORPORT', options: ports.menuGenerator_
            }],
            colour: Blockly.CAT_SENSOR_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.SENSOR_ENVIRONMENTAL_CALIBRATION_TOOLTIP
        });
        this.dependConfig = {
            type: 'environmental', dropDown: this.getField('SENSORPORT')
        };
    }
};

Blockly.Blocks['actions_play_file_txt4'] = {
    init: function() {
        this.setBlocking(true);
        var ports = getConfigPorts('buzzer');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.ACTION_PLAY + ' ' + Blockly.Msg.PLAY_FILE + ' %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'FILE',
                    options: [
                        [Blockly.Msg.SOUND_AIRPLANE, '01_Airplane'],
                        [Blockly.Msg.SOUND_ALARM, '02_Alarm'],
                        [Blockly.Msg.SOUND_BELL, '03_Bell'],
                        [Blockly.Msg.SOUND_BRAKING, '04_Braking'],
                        [Blockly.Msg.SOUND_CARHORN_LONG, '05_Car_horn_long'],
                        [Blockly.Msg.SOUND_CARHORN_SHORT, '06_Car_horn_short'],
                        [Blockly.Msg.SOUND_CRACKLING_WOOD, '07_Crackling_wood'],
                        [Blockly.Msg.SOUND_EXCAVATOR, '08_Excavator'],
                        [Blockly.Msg.SOUND_FANTASY + ' 1', '09_Fantasy_1'],
                        [Blockly.Msg.SOUND_FANTASY + ' 2', '10_Fantasy_2'],
                        [Blockly.Msg.SOUND_FANTASY + ' 3', '11_Fantasy_3'],
                        [Blockly.Msg.SOUND_FANTASY + ' 4', '12_Fantasy_4'],
                        [Blockly.Msg.SOUND_FARM, '13_Farm'],
                        [Blockly.Msg.SOUND_FIRE_DEPARTMENT, '14_Fire_department'],
                        [Blockly.Msg.SOUND_FIRE, '15_Fire_noises'],
                        [Blockly.Msg.SOUND_FORMULAONE, '16_Formula1'],
                        [Blockly.Msg.SOUND_HELICOPTER, '17_Helicopter'],
                        [Blockly.Msg.SOUND_HYDRAULIC, '18_Hydraulic'],
                        [Blockly.Msg.MOTOR, '19_Motor_sound'],
                        [Blockly.Msg.SOUND_MOTOR_STARTING, '20_Motor_starting'],
                        [Blockly.Msg.SOUND_PROPELLER, '21_Propeller_airplane'],
                        [Blockly.Msg.SOUND_ROLLER_COASTER, '22_Roller_coaster'],
                        [Blockly.Msg.SOUND_HORN_SHIP, '23_Ships_horn'],
                        [Blockly.Msg.SOUND_TRACTOR, '24_Tractor'],
                        [Blockly.Msg.SOUND_TRUCK, '25_Truck'],
                        [Blockly.Msg.SOUND_WINK, '26_Augenzwinkern'],
                        [Blockly.Msg.MOTOR_DRIVE, '27_Fahrgeraeusch'],
                        [Blockly.Msg.SOUND_TILT_HEAD, '28_Kopf_heben'],
                        [Blockly.Msg.SOUND_RAISE_HEAD, '29_Kopf_neigen']
                    ]
                }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.PLAY_EXPRESSION_TOOLTIP
        });
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLeds_hidden_on_calliopev3'] = {
    init: function() {
        var ports = getConfigPorts('rgbledh');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_ON + ' %1 ' + Blockly.Msg.BRICKLIGHT_COLOR + '%2',
            args0: [{
                type: 'field_dropdown',
                name: 'SLOT',
                options: [[Blockly.Msg.LEFT, '0'], [Blockly.Msg.CENTER, '1'], [Blockly.Msg.RIGHT, '2'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            }, {
                type: 'input_value', name: 'COLOUR', check: ['Colour', 'ColourLed']
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_ON_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbledh',
            'dropDown': 'hide'
        };
    }
};

Blockly.Blocks['actions_rgbLeds_hidden_off_calliopev3'] = {
    init: function() {
        var ports = getConfigPorts('rgbledh');
        this.hide = {};
        this.hide.name = 'ACTORPORT';
        this.hide.port = true;
        this.hide.value = ports.getValue();
        this.jsonInit({
            message0: Blockly.Msg.RGBLED_OFF + ' %1',
            args0: [{
                type: 'field_dropdown',
                name: 'SLOT',
                options: [[Blockly.Msg.LEFT, '0'], [Blockly.Msg.CENTER, '1'], [Blockly.Msg.RIGHT, '2'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]
            }],
            colour: Blockly.CAT_ACTION_RGB,
            previousStatement: true,
            nextStatement: true,
            tooltip: Blockly.Msg.RGB_LED_OFF_TOOLTIP
        });
        this.dependConfig = {
            'type': 'rgbledh',
            'dropDown': 'hide'
        };
    }
};
