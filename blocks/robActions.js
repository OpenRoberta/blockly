/**
 * @fileoverview Action blocks.
 * @requires Blockly.Blocks
 * @author Beate
 */
'use strict';

goog.provide('Blockly.Blocks.robActions');

goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.robConfigDefinitions');

/**
 * @lends Block
 */

Blockly.Blocks['robActions_setLanguage'] = {
    /**
     * Sets the language the robot uses.
     *
     * @constructs robActions_setLanguage
     * @this.Blockly.Block
     * @param {String}
     *            LANGUAGE
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.LANGUAGE_GERMAN, 'GERMAN'], [Blockly.Msg.LANGUAGE_ENGLISH, 'ENGLISH'], [Blockly.Msg.LANGUAGE_FRENCH, 'FRENCH'], [Blockly.Msg.LANGUAGE_SPANISH, 'SPANISH'], [Blockly.Msg.LANGUAGE_ITALIAN, 'ITALIAN'], [Blockly.Msg.LANGUAGE_DUTCH, 'DUTCH'], [Blockly.Msg.LANGUAGE_FINNISH, 'FINNISH'], [Blockly.Msg.LANGUAGE_POLISH, 'POLISH'], [Blockly.Msg.LANGUAGE_RUSSIAN, 'RUSSIAN'], [Blockly.Msg.LANGUAGE_TURKISH, 'TURKISH'], [Blockly.Msg.LANGUAGE_CZECH, 'CZECH'], [Blockly.Msg.LANGUAGE_PORTUGUESE, 'PORTUGUESE'], [Blockly.Msg.LANGUAGE_DANISH, 'DANISH']]);
        if (this.workspace.device === 'nao') {
            dropdown = new Blockly.FieldDropdown([[Blockly.Msg.LANGUAGE_GERMAN, 'GERMAN'], [Blockly.Msg.LANGUAGE_ENGLISH, 'ENGLISH'], [Blockly.Msg.LANGUAGE_FRENCH, 'FRENCH'], [Blockly.Msg.LANGUAGE_JAPANESE, 'JAPANESE'], [Blockly.Msg.LANGUAGE_CHINESE, 'CHINESE'], [Blockly.Msg.LANGUAGE_SPANISH, 'SPANISH'], [Blockly.Msg.LANGUAGE_KOREAN, 'KOREAN'], [Blockly.Msg.LANGUAGE_ITALIAN, 'ITALIAN'], [Blockly.Msg.LANGUAGE_DUTCH, 'DUTCH'], [Blockly.Msg.LANGUAGE_FINNISH, 'FINNISH'], [Blockly.Msg.LANGUAGE_POLISH, 'POLISH'], [Blockly.Msg.LANGUAGE_RUSSIAN, 'RUSSIAN'], [Blockly.Msg.LANGUAGE_TURKISH, 'TURKISH'], [Blockly.Msg.LANGUAGE_ARABIC, 'ARABIC'], [Blockly.Msg.LANGUAGE_CZECH, 'CZECH'], [Blockly.Msg.LANGUAGE_PORTUGUESE, 'PORTUGUESE'], [Blockly.Msg.LANGUAGE_BRAZILIAN, 'BRAZILIAN'], [Blockly.Msg.LANGUAGE_SWEDISH, 'SWEDISH'], [Blockly.Msg.LANGUAGE_DANISH, 'DANISH'], [Blockly.Msg.LANGUAGE_NORWEGIAN, 'NORWEGIAN'], [Blockly.Msg.LANGUAGE_GREEK, 'GREEK']]);
        } else if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            dropdown = new Blockly.FieldDropdown([[Blockly.Msg.LANGUAGE_GERMAN, 'GERMAN'], [Blockly.Msg.LANGUAGE_ENGLISH, 'ENGLISH'], [Blockly.Msg.LANGUAGE_FRENCH, 'FRENCH'], [Blockly.Msg.LANGUAGE_SPANISH, 'SPANISH'], [Blockly.Msg.LANGUAGE_ITALIAN, 'ITALIAN'], [Blockly.Msg.LANGUAGE_DUTCH, 'DUTCH'], [Blockly.Msg.LANGUAGE_FINNISH, 'FINNISH'], [Blockly.Msg.LANGUAGE_POLISH, 'POLISH'], [Blockly.Msg.LANGUAGE_RUSSIAN, 'RUSSIAN'], [Blockly.Msg.LANGUAGE_TURKISH, 'TURKISH'], [Blockly.Msg.LANGUAGE_CZECH, 'CZECH'], [Blockly.Msg.LANGUAGE_PORTUGUESE, 'PORTUGUESE'], [Blockly.Msg.LANGUAGE_DANISH, 'DANISH']]);
        }
        this.appendDummyInput()
            .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.LANGUAGE)
            .appendField(dropdown, 'LANGUAGE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.SETLANGUAGE_TOOLTIP);
        if (this.workspace.device === 'nao') {
            this.setTooltip(Blockly.Msg.NAO_SETLANGUAGE_TOOLTIP);
        } else if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            this.setTooltip(Blockly.Msg.SETLANGUAGE_TOOLTIP);
        }
    }
};

Blockly.Blocks['robActions_sayText'] = {
    /**
     * Say a text.
     *
     * @constructs robActions_sayText
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to say
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.SAY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.SAY_TOOLTIP);
    }
};

Blockly.Blocks['robActions_sayText_parameters'] = {
    /**
     * Say a text with additional parameters.
     *
     * @constructs robActions_sayText_parameters
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to say
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.SAY);
        this.appendValueInput('VOICESPEED').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VOICE_SPEED).setCheck('Number');
        this.appendValueInput('VOICEPITCH').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VOICE_PITCH).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.SAY_PARAMETERS_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motor_on'] = {
    /**
     * Turn motor on with specific power.
     *
     * @constructs robActions_motor_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {Number}
     *            POWER relative - -100-100
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var ports = [];
        switch (this.workspace.device) {
            case 'ev3':
            case 'xNN':
                ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C'], [Blockly.Msg.MOTOR_PORT + ' D', 'D']];
                break;
            case 'nxt':
                ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C']];
                break;
            case 'botnroll':
                ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'B'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'C']];
                break;
            case 'mbot':
                ports = [[Blockly.Msg.MOTOR + ' ' + 'M1', '1'], [Blockly.Msg.MOTOR + ' ' + 'M2', '2']];
                break;
            case 'thymio':
                ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LEFT'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RIGHT']];
                break;
            case 'mbot2':
            case 'wedo':
                this.action = 'MOTOR';
                ports = [];
                var container = Blockly.Workspace.getByContainer('bricklyDiv');
                if (container) {
                    var blocks = Blockly.Workspace.getByContainer('bricklyDiv').getAllBlocks();
                    for (var x = 0; x < blocks.length; x++) {
                        var func = blocks[x].getConfigDecl;
                        if (func) {
                            var configs = func.call(blocks[x]);
                            for (var i = 0; i < configs.length; i++) {
                                var config = configs[i];
                                if (config.type === 'motor' || config.type === 'encoder') {
                                    ports.push([config.name, config.name]);
                                }
                            }
                        }
                    }
                }
                if (ports.length === 0) {
                    ports.push([Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'), (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase()]);
                }
                break;
            case 'edison':
                ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LMOTOR'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RMOTOR']];
                break;
            default:
                ports = ['INVALID DEVICE TYPE', 'UNDEFINED'];
        }
        var dropDownPorts = new Blockly.FieldDropdown(ports);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_ON_TOOLTIP);
        if (this.workspace.device === 'wedo') {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.ACTION_MOTOR)
                .appendField(dropDownPorts, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
            this.dependConfig = {
                type: 'motor', dropDown: dropDownPorts
            };
        } else if (this.workspace.device === 'mbot2') {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.ACTION_MOTOR)
                .appendField(dropDownPorts, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .setCheck('Number');
            this.dependConfig = {
                type: 'encoder', dropDown: dropDownPorts
            };
        } else {
            this.appendValueInput('POWER')
                .appendField(dropDownPorts, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }
    }
};

Blockly.Blocks['robActions_motor_on_for'] = {
    /**
     *
     * @constructs robActions_motor_on_for
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {String/dropdown}
     *            MOTORROTATION - Rotations or Degrees
     * @param {Number}
     *            POWER Speed relative - -100-100
     * @param {Number}
     *            VALUE Number of rotations/degrees
     * @returns after execution
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C']];
        if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            ports.push([Blockly.Msg.MOTOR_PORT + ' D', 'D']);
        } else if (this.workspace.device === 'botnroll') {
            ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'B'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'C']];
        } else if (this.workspace.device === 'mbot') {
            ports = [[Blockly.Msg.MOTOR + ' ' + 'M1', '1'], [Blockly.Msg.MOTOR + ' ' + 'M2', '2']];
        } else if (this.workspace.device === 'thymio') {
            ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LEFT'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RIGHT']];
        }
        var motorPort = new Blockly.FieldDropdown(ports);
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble') {
            motorPort = getConfigPorts('stepmotor');
            this.dependConfig = {
                type: 'stepmotor', dropDown: motorPort
            };
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_PORT_ARDUINO)
                .appendField(motorPort, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.ROTATIONS_PER_MINUTE)
                .setCheck('Number');
        } else if (this.workspace.device === 'wedo') {
            this.action = 'MOTOR';
            motorPort = getConfigPorts('motor');
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.ACTION_MOTOR)
                .appendField(motorPort, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
            this.dependConfig = {
                type: 'motor', dropDown: motorPort
            };
        } else if (this.workspace.device === 'mbot2') {
            motorPort = getConfigPorts('encoder');
            this.dependConfig = {
                type: 'encoder', dropDown: motorPort
            };
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.ACTION_MOTOR)
                .appendField(motorPort, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED, 'RPM')
                .setCheck('Number');
        } else {
            this.appendValueInput('POWER')
                .appendField(motorPort, 'MOTORPORT')
                .appendField(Blockly.Msg.ON)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }

        if (this.workspace.device === 'botnroll' || this.workspace.device === 'mbot' || this.workspace.device === 'wedo' || this.workspace.device === 'thymio') {
            this.appendValueInput('VALUE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.SENSOR_TIME + ' ' + Blockly.Msg.SENSOR_UNIT_MS)
                .setCheck('Number');
        } else {
            var motorRotation = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_ROTATION, 'ROTATIONS'], [Blockly.Msg.MOTOR_DEGREE, 'DEGREE']]);
            this.appendValueInput('VALUE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.FOR)
                .appendField(motorRotation, 'MOTORROTATION')
                .setCheck('Number');
        }

        if (this.workspace.device === 'wedo' || this.workspace.device === 'mbot' || this.workspace.device === 'botnroll') {
            this.setTooltip(Blockly.Msg.MOTOR_ON_FOR_TOOLTIP_MS);
        } else if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble') {
            this.setTooltip(Blockly.Msg.MOTOR_ON_FOR_TOOLTIP_RPM);
        } else {
            this.setTooltip(Blockly.Msg.MOTOR_ON_FOR_TOOLTIP);
        }

        this.setPreviousStatement(true);
        this.setBlocking(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['robActions_motor_on_for_ardu'] = {
    /**
     * Turn motor on and stop motor after execution of rotations/degrees.
     *
     * @constructs robActions_motor_on_for
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {String/dropdown}
     *            MOTORROTATION - Rotations or Degrees
     * @param {Number}
     *            POWER Speed relative - -100-100
     * @param {Number}
     *            VALUE Number of rotations/degrees
     * @returns after execution
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device == 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device == 'festobionic') {
            var dropDownPorts = getConfigPorts('servo');
            this.dependConfig = {
                type: 'servo', dropDown: dropDownPorts
            };
            if (this.workspace.device == 'arduino' || this.workspace.device === 'nano33ble') {
                this.appendValueInput('POWER')
                    .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.ACTION_SERVO_ARDUINO)
                    .appendField(dropDownPorts, 'MOTORPORT')
                    .appendField(Blockly.Msg.TO + ' °')
                    .setCheck('Number');
            } else {
                this.appendValueInput('POWER')
                    .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.ACTION_SERVO)
                    .appendField(dropDownPorts, 'MOTORPORT')
                    .appendField(Blockly.Msg.TO + ' °')
                    .setCheck('Number');
            }
        } else {
            var ports = [[Blockly.Msg.MOTOR_PAN, 'A'], [Blockly.Msg.MOTOR_TILT, 'D']];
            var motorPort = new Blockly.FieldDropdown(ports);
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.MOTOR)
                .appendField(motorPort, 'MOTORPORT')
                .appendField(Blockly.Msg.TO + ' °')
                .setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_ON_FOR_TOOLTIP_SERVO);
    }
};

Blockly.Blocks['robActions_motor_getPower'] = {
    /**
     * Get current power of this motor.
     *
     * @constructs robActions_getPower
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @returns immediately
     * @returns {Number} current Power
     * @memberof Block
     */
    init: function() {
        var ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C']];
        if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            ports.push([Blockly.Msg.MOTOR_PORT + ' D', 'D']);
        }
        if (this.workspace.device === 'thymio') {
            ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LEFT'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RIGHT']];
        }
        this.setColour(Blockly.CAT_ACTION_RGB);
        var motorPort = new Blockly.FieldDropdown(ports);
        this.appendDummyInput()
            .appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.MOTOR_SPEED)
            .appendField(motorPort, 'MOTORPORT');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MOTOR_GETPOWER_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.MOTOR_GETPOWER_HELP));
    }
};

Blockly.Blocks['robActions_motor_setPower'] = {
    /**
     * Set current power of this motor (not used).
     *
     * @constructs robActions_setPower
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {Number}
     *            POWER new
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C']];
        if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            ports.push([Blockly.Msg.MOTOR_PORT + ' D', 'D']);
        }
        var motorPort = new Blockly.FieldDropdown(ports);
        this.appendValueInput('POWER').appendField(Blockly.Msg.SET).appendField(motorPort, 'MOTORPORT').appendField(Blockly.Msg.MOTOR_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_SETPOWER_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motor_stop'] = {
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
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = [[Blockly.Msg.MOTOR_PORT + ' A', 'A'], [Blockly.Msg.MOTOR_PORT + ' B', 'B'], [Blockly.Msg.MOTOR_PORT + ' C', 'C']];
        if (this.workspace.device === 'ev3' || this.workspace.device === 'xNN') {
            ports.push([Blockly.Msg.MOTOR_PORT + ' D', 'D']);
        }
        if (this.workspace.device === 'mbot') {
            ports = [[Blockly.Msg.MOTOR_PORT + ' M1', '1'], [Blockly.Msg.MOTOR_PORT + ' M2', '2']];
        }
        if (this.workspace.device === 'edison') {
            ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LMOTOR'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RMOTOR']];
        }
        if (this.workspace.device === 'thymio') {
            ports = [[Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_LEFT, 'LEFT'], [Blockly.Msg.MOTOR + ' ' + Blockly.Msg.MOTOR_RIGHT, 'RIGHT']];
        }
        var motorPort = new Blockly.FieldDropdown(ports);
        if (this.workspace.device === 'wedo') {
            this.action = 'MOTOR';
            ports = getConfigPorts('motor');
            this.dependConfig = {
                type: 'motor', dropDown: ports
            };
            this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(Blockly.Msg.ACTION_MOTOR).appendField(ports, 'MOTORPORT');
        } else if (this.workspace.device === 'mbot2') {
            ports = getConfigPorts('encoder');
            this.dependConfig = {
                type: 'encoder', dropDown: ports
            };
            this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(Blockly.Msg.ACTION_MOTOR).appendField(ports, 'MOTORPORT');
        } else if (this.workspace.device === 'mbot' || this.workspace.device === 'edison' || this.workspace.device === 'thymio') {
            this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(motorPort, 'MOTORPORT');
        } else {
            var mode = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FLOAT, 'FLOAT'], [Blockly.Msg.MOTOR_BRAKE, 'NONFLOAT']]);
            this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(motorPort, 'MOTORPORT').appendField(mode, 'MODE');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_STOP_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_on'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_DRIVE)
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_DRIVE)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_on_for'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARDS']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_DRIVE)
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_DRIVE)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }
        if (this.workspace.device === 'botnroll' || this.workspace.device === 'mbot' || this.workspace.device === 'thymio') {
            this.appendValueInput('DISTANCE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.SENSOR_TIME + ' ms')
                .setCheck('Number');
        } else {
            this.appendValueInput('DISTANCE').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_DISTANCE).setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_stop'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendDummyInput().appendField(dropDownPorts, 'ACTORPORT').appendField(Blockly.Msg.MOTOR_STOP);
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_STOP_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_turn'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER')
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(Blockly.Msg.MOTOR_TURN)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_TURN)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_TURN_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_turn_for'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'], [Blockly.Msg.MOTOR_LEFT, 'LEFT']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER')
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(Blockly.Msg.MOTOR_TURN)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER')
                .appendField(Blockly.Msg.MOTOR_TURN)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .setCheck('Number');
        }
        if (this.workspace.device === 'botnroll' || this.workspace.device === 'mbot' || this.workspace.device === 'thymio') {
            this.appendValueInput('DEGREE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.SENSOR_TIME + ' ms')
                .setCheck('Number');
        } else {
            this.appendValueInput('DEGREE').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_DEGREE).setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_TURN_FOR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_curve'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER_LEFT')
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(Blockly.Msg.MOTOR_STEER)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .appendField(Blockly.Msg.MOTOR_LEFT)
                .setCheck('Number');
            this.appendValueInput('POWER_RIGHT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .appendField(Blockly.Msg.MOTOR_RIGHT)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER_LEFT')
                .appendField(Blockly.Msg.MOTOR_STEER)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .appendField(Blockly.Msg.MOTOR_LEFT)
                .setCheck('Number');
            this.appendValueInput('POWER_RIGHT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .appendField(Blockly.Msg.MOTOR_RIGHT)
                .setCheck('Number');
        }

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_motorDiff_curve_for'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD'], [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARDS']]);
        if (this.workspace.device === 'mbot2') {
            var dropDownPorts = getConfigPorts('differentialdrive');
            this.dependConfig = {
                type: 'differentialdrive', dropDown: dropDownPorts
            };
            this.appendValueInput('POWER_LEFT')
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(Blockly.Msg.MOTOR_STEER)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .appendField(Blockly.Msg.MOTOR_LEFT)
                .setCheck('Number');
            this.appendValueInput('POWER_RIGHT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.ROUNDS_PER_MINUTE_SPEED)
                .appendField(Blockly.Msg.MOTOR_RIGHT)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('POWER_LEFT')
                .appendField(Blockly.Msg.MOTOR_STEER)
                .appendField(dropdown, 'DIRECTION')
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .appendField(Blockly.Msg.MOTOR_LEFT)
                .setCheck('Number');
            this.appendValueInput('POWER_RIGHT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MOTOR_SPEED)
                .appendField(Blockly.Msg.MOTOR_RIGHT)
                .setCheck('Number');
        }
        if (this.workspace.device === 'botnroll' || this.workspace.device === 'mbot' || this.workspace.device === 'thymio') {
            this.appendValueInput('DISTANCE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.SENSOR_TIME + ' ms')
                .setCheck('Number');
        } else {
            this.appendValueInput('DISTANCE').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_DISTANCE).setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_picture'] = {
    /**
     * Display a picture on the screen.
     *
     * @constructs robActions_display_picture
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

    init: function() {
        // this.setHelpUrl(Blockly.Msg.DISPLAY_PICTURE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var picture = new Blockly.FieldDropdown([[Blockly.Msg.DISPLAY_PICTURE_GLASSES, 'OLDGLASSES'], [Blockly.Msg.DISPLAY_PICTURE_EYES_OPEN, 'EYESOPEN'], [Blockly.Msg.DISPLAY_PICTURE_EYES_CLOSED, 'EYESCLOSED'], [Blockly.Msg.DISPLAY_PICTURE_FLOWERS, 'FLOWERS'], [Blockly.Msg.DISPLAY_PICTURE_TACHO, 'TACHO']]);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_PICTURE)
            .appendField(picture, 'PICTURE');
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Y);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.DISPLAY_PICTURE_HELP));
    }
};

Blockly.Blocks['robActions_display_picture_new'] = {
    /**
     * Display a picture on the screen.
     *
     * @constructs robActions_display_picture_new
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PICTURE - Smiley1-4
     * @returns immediately
     * @memberof Block
     */

    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var picture = new Blockly.FieldDropdown([[Blockly.Msg.DISPLAY_PICTURE_GLASSES, 'OLDGLASSES'], [Blockly.Msg.DISPLAY_PICTURE_EYES_OPEN, 'EYESOPEN'], [Blockly.Msg.DISPLAY_PICTURE_EYES_CLOSED, 'EYESCLOSED'], [Blockly.Msg.DISPLAY_PICTURE_FLOWERS, 'FLOWERS'], [Blockly.Msg.DISPLAY_PICTURE_TACHO, 'TACHO']]);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_PICTURE)
            .appendField(picture, 'PICTURE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_text'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device == 'arduino' || this.workspace.device === 'nano33ble') {
            var dropDownPorts = getConfigPorts('lcd');
            this.dependConfig = {
                type: 'lcd', dropDown: dropDownPorts
            };
            this.appendDummyInput().appendField(Blockly.Msg.ACTION_LCD, 'ACTORTITEL').appendField(dropDownPorts, 'ACTORPORT');
            this.appendValueInput('OUT').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT);
        } else if (this.workspace.device === 'mbot2') {
            dropDownPorts = getConfigPorts('lcd');
            this.dependConfig = {
                type: 'lcd', dropDown: dropDownPorts
            };
            this.appendValueInput('OUT')
                .appendField(dropDownPorts, 'ACTORPORT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT);
            hidePortIfOnlyInbuilt(this);
        } else if (this.workspace.device === 'nxt') {
            this.appendValueInput('OUT')
                .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT)
                .setCheck(['Number', 'Boolean', 'String', 'Colour', 'Connection']);
        } else {
            this.appendValueInput('OUT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT);
        }
        if (this.workspace.device !== 'botnroll' && this.workspace.device !== 'wedo') {
            this.appendValueInput('COL').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_COL);
        }
        if (this.workspace.device !== 'wedo') {
            this.appendValueInput('ROW').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_ROW);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_TEXT_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_clear'] = {
    init: function() {
        // this.setHelpUrl(Blockly.Msg.DISPLAY_CLEAR_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device == 'arduino' || this.workspace.device === 'nano33ble') {
            var dropDownPorts = getConfigPorts('lcd');
            this.dependConfig = {
                type: 'lcd', dropDown: dropDownPorts
            };
            this.appendDummyInput()
                .appendField(Blockly.Msg.CLEAR)
                .appendField(Blockly.Msg.ACTION_LCD, 'ACTORTITEL')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(dropDownPorts, 'ACTORPORT');
        } else if (this.workspace.device == 'mbot2') {
            var dropDownPortsMbot2 = getConfigPorts('lcd');
            this.dependConfig = {
                type: 'lcd', dropDown: dropDownPortsMbot2
            };
            this.appendDummyInput().appendField(dropDownPortsMbot2, 'ACTORPORT').appendField(Blockly.Msg.DISPLAY_CLEAR);
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_text_i2c'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropDownPorts = getConfigPorts('lcdi2c');
        this.dependConfig = {
            type: 'lcdi2c', dropDown: dropDownPorts
        };
        if (this.workspace.device === 'sensebox') {
            this.appendDummyInput().appendField(Blockly.Msg.ACTION_LCDI2C_SENSEBOX, 'ACTORTITEL').appendField(dropDownPorts, 'ACTORPORT');
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.ACTION_LCDI2C, 'ACTORTITEL').appendField(dropDownPorts, 'ACTORPORT');
        }
        this.appendValueInput('OUT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT);
        this.appendValueInput('COL').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_COL);
        this.appendValueInput('ROW').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_ROW);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_TEXT_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_clear_i2c'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'sensebox') {
            var dropDownPorts = getConfigPorts('lcdi2c');
            this.dependConfig = {
                type: 'lcdi2c', dropDown: dropDownPorts
            };
            if (this.workspace.device === 'sensebox') {
                this.appendDummyInput()
                    .appendField(Blockly.Msg.CLEAR)
                    .appendField(Blockly.Msg.ACTION_LCDI2C_SENSEBOX, 'ACTORTITEL')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(dropDownPorts, 'ACTORPORT');
            } else {
                this.appendDummyInput()
                    .appendField(Blockly.Msg.CLEAR)
                    .appendField(Blockly.Msg.ACTION_LCDI2C, 'ACTORTITEL')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(dropDownPorts, 'ACTORPORT');
            }
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR);
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_text_oledssd1306i2c'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropDownPorts = getConfigPorts('oledssd1306i2c');
        this.dependConfig = {
            type: 'oledssd1306i2c', dropDown: dropDownPorts
        };
        this.appendDummyInput().appendField(Blockly.Msg.ACTION_OLEDSSD1306I2C, 'ACTORTITEL').appendField(dropDownPorts, 'ACTORPORT');
        this.appendValueInput('OUT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT);
        this.appendValueInput('COL').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_COL);
        this.appendValueInput('ROW').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_ROW);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_TEXT_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_clear_oledssd1306i2c'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropDownPorts = getConfigPorts('oledssd1306i2c');
        this.dependConfig = {
            type: 'oledssd1306i2c', dropDown: dropDownPorts
        };
        this.appendDummyInput()
            .appendField(Blockly.Msg.CLEAR)
            .appendField(Blockly.Msg.ACTION_OLEDSSD1306I2C, 'ACTORTITEL')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(dropDownPorts, 'ACTORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_play_tone'] = {
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
    init: function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_TONE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'sensebox') {
            var dropDownPorts = getConfigPorts('buzzer');
            this.dependConfig = {
                type: 'buzzer', dropDown: dropDownPorts
            };
            this.appendValueInput('FREQUENCE')
                .appendField(Blockly.Msg.PLAY)
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(Blockly.Msg.PLAY_FREQUENZ)
                .setCheck('Number');
        } else if (this.workspace.device === 'wedo') {
            this.action = 'BUZZER';
            var ports = getConfigPorts('buzzer');
            this.dependConfig = {
                type: 'buzzer', dropDown: ports
            };
            this.appendValueInput('FREQUENCE')
                .appendField(Blockly.Msg.PLAY)
                .appendField(ports, 'ACTORPORT')
                .appendField(Blockly.Msg.PLAY_FREQUENZ)
                .setCheck('Number');
        } else {
            this.appendValueInput('FREQUENCE').appendField(Blockly.Msg.PLAY).appendField(Blockly.Msg.PLAY_FREQUENZ).setCheck('Number');
        }
        this.appendValueInput('DURATION').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PLAY_DURATION);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.PLAY_TONE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_TONE_HELP));
    }
};

Blockly.Blocks['robActions_play_file'] = {
    /**
     * Play a sound file.
     *
     * @constructs robActions_play_file
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SOUND - Soundfile1-4 (0-7 for Thymio)
     * @returns after execution (time the soundfile needs to finish)
     * @memberof Block
     */

    init: function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_FILE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var file;
        switch (this.workspace.device) {
            case 'thymio':
                file = new Blockly.FieldDropdown([[Blockly.Msg.SOUND_STARTUP, '0'], [Blockly.Msg.SOUND_SHUTDOWN, '1'], [Blockly.Msg.SOUND_ARROW, '2'], [Blockly.Msg.SOUND_CENTRAL, '3'], [Blockly.Msg.SOUND_SCARY, '4'], [Blockly.Msg.SOUND_COLLISION, '5'], [Blockly.Msg.SOUND_TARGET_FRIENDLY, '6'], [Blockly.Msg.SOUND_TARGET_DETECTED, '7']]);
                break;
            default:
                // LEJOS system sounds from 0 to 4 in HAL
                file = new Blockly.FieldDropdown([['1', '0'], ['2', '1'], ['3', '2'], ['4', '3'], ['5', '4']]);
                break;
        }
        this.appendDummyInput()
            .appendField(Blockly.Msg.PLAY + ' ' + Blockly.Msg.PLAY_FILE)
            .appendField(file, 'FILE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.PLAY_FILE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_FILE_HELP));
    }
};

Blockly.Blocks['robActions_play_setVolume'] = {
    /**
     * Set volume.
     *
     * @constructs robActions_play_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME 0-100, default 50
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_SETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device === 'mbot2') {
            var dropDownPortsMbot2 = getConfigPorts('buzzer');
            this.dependConfig = {
                type: 'buzzer', dropDown: dropDownPortsMbot2
            };
            this.appendValueInput('VOLUME')
                .appendField(dropDownPortsMbot2, 'ACTORPORT')
                .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME + ' ' + Blockly.Msg.SENSOR_UNIT_PERCENT)
                .setCheck('Number');
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendValueInput('VOLUME')
                .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME + ' ' + Blockly.Msg.SENSOR_UNIT_PERCENT)
                .setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_SETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_SETVOLUME_HELP));
    }
};

Blockly.Blocks['robActions_play_getVolume'] = {
    /**
     * Get current volume
     *
     * @constructs robActions_play_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     * @see {@link robActions_play_setVolume}
     */
    init: function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_GETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        if (this.workspace.device === 'mbot2') {
            var dropDownPortsMbot2 = getConfigPorts('buzzer');
            this.dependConfig = {
                type: 'buzzer', dropDown: dropDownPortsMbot2
            };
            this.appendDummyInput()
                .appendField(dropDownPortsMbot2, 'ACTORPORT')
                .appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
            hidePortIfOnlyInbuilt(this);
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
        }
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.PLAY_GETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_GETVOLUME_HELP));
    }
};

Blockly.Blocks['robActions_brickLight_on'] = {
    /**
     * Turn bricklight on.
     *
     * @constructs robActions_brickLight_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SWITCH_COLOR - Green, Orange or Red
     * @param {Boolean/dropdown}
     *            SWITCH_BLINK - True or False
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        // this.setInputsInline(true);
        var dropdownColor = new Blockly.FieldDropdown([[Blockly.Msg.BRICKLIGHT_GREEN, 'GREEN'], [Blockly.Msg.BRICKLIGHT_ORANGE, 'ORANGE'], [Blockly.Msg.BRICKLIGHT_RED, 'RED']]);
        var dropdownLightState;
        if (this.workspace.device === 'botnroll' || this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'calliope' || this.workspace.device === 'sensebox' || this.workspace.device === 'festobionic' || this.workspace.device === 'mbot2') {
            dropdownLightState = new Blockly.FieldDropdown([[Blockly.Msg.BRICKLIGHT_ON, 'ON'], [Blockly.Msg.OFF, 'OFF']]);
        } else {
            dropdownLightState = new Blockly.FieldDropdown([[Blockly.Msg.BRICKLIGHT_ON, 'ON'], [Blockly.Msg.BRICKLIGHT_FLASH, 'FLASH'], [Blockly.Msg.BRICKLIGHT_DOUBLE_FLASH, 'DOUBLE_FLASH']]);
            this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.BRICKLIGHT_COLOR).appendField(dropdownColor, 'SWITCH_COLOR');
        }
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'calliope' || this.workspace.device === 'sensebox' || this.workspace.device === 'festobionic') {
            var dropDownPorts;
            dropDownPorts = getConfigPorts('led');
            this.dependConfig = {
                type: 'led', dropDown: dropDownPorts
            };
            this.appendDummyInput()
                .appendField(Blockly.Msg.LED_ON)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(dropDownPorts, 'ACTORPORT')
                .appendField(dropdownLightState, 'SWITCH_BLINK');
        } else if (this.workspace.device === 'botnroll') {
            this.appendDummyInput()
                .appendField(Blockly.Msg.BRICKLIGHT)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MOD)
                .appendField(dropdownLightState, 'SWITCH_BLINK');
        } else {
            this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOD).appendField(dropdownLightState, 'SWITCH_BLINK');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_led_on'] = {
    /**
     * Turns single led on.
     *
     * @constructs robActions_led_on
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.action = 'LED';
        var portList = [];
        var container = Blockly.Workspace.getByContainer('bricklyDiv');
        if (container) {
            var blocks = Blockly.Workspace.getByContainer('bricklyDiv').getAllBlocks();
            for (var x = 0; x < blocks.length; x++) {
                var func = blocks[x].getConfigDecl;
                if (func) {
                    var configs = func.call(blocks[x]);
                    for (var i = 0; i < configs.length; i++) {
                        var config = configs[i];
                        if (config.type === 'led') {
                            portList.push([config.name, config.name]);
                        }
                    }
                }
            }
        }
        if (portList.length === 0) {
            portList.push([Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'), (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase()]);
        }
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'sensebox' || this.workspace.device === 'festobionicflower') {
            var ports = getConfigPorts('rgbled');
            this.dependConfig = {
                type: 'rgbled', dropDown: ports
            };
        } else if (this.workspace.device === 'wedo') {
            var ports = new Blockly.FieldDropdown(portList);
            this.dependConfig = {
                type: 'led', dropDown: ports
            };
        }
        if (this.workspace.device === 'mbot') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.LEFT, '2'], [Blockly.Msg.RIGHT, '1']]);
            this.appendValueInput('COLOR')
                .appendField(Blockly.Msg.LED_ON)
                .appendField(ports, 'ACTORPORT')
                .appendField(Blockly.Msg.BRICKLIGHT_COLOR)
                .setCheck('Colour');
        } else if (this.workspace.device === 'edison') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.LEFT, 'LLED'], [Blockly.Msg.RIGHT, 'RLED']]);
            this.appendDummyInput('COLOR').appendField(Blockly.Msg.LED_ON).appendField(ports, 'ACTORPORT');
        } else if (this.workspace.device === 'thymio') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.SENSOR_TOP, 'TOP'], [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'], [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']]);
            this.appendValueInput('COLOR')
                .appendField(Blockly.Msg.LED_ON)
                .appendField(ports, 'ACTORPORT')
                .appendField(Blockly.Msg.BRICKLIGHT_COLOR)
                .setCheck('Colour');
        } else {
            this.appendValueInput('COLOR')
                .appendField(Blockly.Msg.LED_ON)
                .appendField(ports, 'ACTORPORT')
                .appendField(Blockly.Msg.BRICKLIGHT_COLOR)
                .setCheck('Colour');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_led_off'] = {
    /**
     * Turns single led off.
     *
     * @constructs robActions_led_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.action = 'LED';
        var portList = [];
        var container = Blockly.Workspace.getByContainer('bricklyDiv');
        if (container) {
            var blocks = Blockly.Workspace.getByContainer('bricklyDiv').getAllBlocks();
            for (var x = 0; x < blocks.length; x++) {
                var func = blocks[x].getConfigDecl;
                if (func) {
                    var configs = func.call(blocks[x]);
                    for (var i = 0; i < configs.length; i++) {
                        var config = configs[i];
                        if (config.type === 'led') {
                            portList.push([config.name, config.name]);
                        }
                    }
                }
            }
        }
        if (portList.length === 0) {
            portList.push([Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'), (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase()]);
        }
        if (this.workspace.device === 'arduino' || this.workspace.device === 'nano33ble' || this.workspace.device === 'sensebox' || this.workspace.device === 'mbot2') {
            var ports = getConfigPorts('rgbled');
            this.dependConfig = {
                type: 'rgbled', dropDown: ports
            };
        } else if (this.workspace.device === 'wedo') {
            var ports = new Blockly.FieldDropdown(portList);
            this.dependConfig = {
                type: 'led', dropDown: ports
            };
        }
        if (this.workspace.device === 'mbot') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.LEFT, '2'], [Blockly.Msg.RIGHT, '1']]);
        } else if (this.workspace.device === 'edison') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.LEFT, 'LLED'], [Blockly.Msg.RIGHT, 'RLED']]);
        } else if (this.workspace.device === 'mbot2') {
            var slots = new Blockly.FieldDropdown([['1', 'LED1'], ['2', 'LED2'], ['3', 'LED3'], ['4', 'LED4'], ['5', 'LED5'], [Blockly.Msg.NAO_LED_ALL, 'LEDALL']]);
        }
        if (this.workspace.device === 'mbot2') {
            this.appendDummyInput().appendField(Blockly.Msg.RGBLED_OFF).appendField(ports, 'ACTORPORT').appendField(slots, 'LED');
            hidePortIfOnlyInbuilt(this);
        } else if (this.workspace.device === 'thymio') {
            ports = new Blockly.FieldDropdown([[Blockly.Msg.SENSOR_TOP, 'TOP'], [Blockly.Msg.BOTTOM_LEFT, 'BOTTOM.LEFT'], [Blockly.Msg.BOTTOM_RIGHT, 'BOTTOM.RIGHT']]);
            this.appendDummyInput().appendField(Blockly.Msg.LED_OFF).appendField(ports, 'ACTORPORT');
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.LED_OFF).appendField(ports, 'ACTORPORT');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_OFF_TOOLTIP);
    }
};
Blockly.Blocks['robActions_leds_off'] = Blockly.Blocks['robActions_led_off'];

Blockly.Blocks['robActions_sensorLight_on'] = {
    /**
     * Turn sensor light on.
     *
     * @constructs robActions_brickLight_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SWITCH_COLOR - red, green or blue
     * @param {Boolean/dropdown}
     *            SWITCH_ON - on or off
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        var sensorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdownColor = new Blockly.FieldDropdown([[Blockly.Msg.BRICKLIGHT_RED, 'RED'], [Blockly.Msg.BRICKLIGHT_GREEN, 'GREEN'], [Blockly.Msg.BRICKLIGHT_BLUE, 'BLUE']]);
        var dropdownLightState = new Blockly.FieldDropdown([[Blockly.Msg.ON, 'ON'], [Blockly.Msg.OFF, 'OFF']]);
        this.appendDummyInput().appendField(Blockly.Msg.SET).appendField(Blockly.Msg.SENSOR_COLOUR);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.BRICKLIGHT_COLOR).appendField(dropdownColor, 'SWITCH_COLOR');
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOD).appendField(dropdownLightState, 'SWITCH_STATE');
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(sensorPort, 'SENSORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_brickLight_off'] = {
    /**
     * Turn bricklight off.
     *
     * @constructs robActions_brickLight_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        // this.setHelpUrl(Blockly.Msg.BRICKLIGHT_OFF_HELP);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.BRICKLIGHT).appendField(Blockly.Msg.OFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_OFF_HELP));
    }
};

Blockly.Blocks['robActions_brickLight_reset'] = {
    /**
     * Reset bricklight. Set the default bricklight: green and blinking.
     *
     * @constructs robActions_brickLight_reset
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(Blockly.Msg.BRICKLIGHT).appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_RESET_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_RESET_HELP));
    }
};

Blockly.Blocks['robActions_set_relay'] = {
    /**
     * @constructs robActions_set_relay
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            RELAYSTATE - on / off
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var relayState = new Blockly.FieldDropdown([[Blockly.Msg.ON, 'OFF'], [Blockly.Msg.OFF, 'ON']]);
        var dropDownPorts = getConfigPorts('relay');
        this.dependConfig = {
            type: 'relay', dropDown: dropDownPorts
        };
        if (this.workspace.device == 'arduino' || this.workspace.device === 'nano33ble') {
            this.appendDummyInput().appendField(Blockly.Msg.SET_RELAY_ARDUINO).appendField(dropDownPorts, 'ACTORPORT').appendField(relayState, 'RELAYSTATE');
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.SET_RELAY).appendField(dropDownPorts, 'ACTORPORT').appendField(relayState, 'RELAYSTATE');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};

Blockly.Blocks['robActions_serial_print'] = {
    /**
     * Prints data to the serial port as human-readable ASCII text. We do not
     * support an additional format parameter so far.
     *
     * @constructs robActions_serial_print
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to show
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT')
            .appendField(Blockly.Msg.ACTION_SERIAL_PRINT || 'ACTION_SERIAL_PRINT')
            .setCheck(['Number', 'Boolean', 'String', 'Colour']);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ACTION_SERIAL_PRINT_TOOLTIP);
    }
};

Blockly.Blocks['robActions_write_pin'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.dropDownPorts = getConfigPorts('digitalin');
        var that = this;
        var valueType = new Blockly.FieldDropdown([[Blockly.Msg.MODE_DIGITAL, 'DIGITAL'], [Blockly.Msg.MODE_ANALOG, 'ANALOG']], function(option) {
            if (option && this.sourceBlock_.getFieldValue('MODE') !== option) {
                that.updatePins_(option);
            }
        });
        if (this.workspace.device === 'robotino') {
            valueType = new Blockly.FieldDropdown([[Blockly.Msg.MODE_DIGITAL, 'DIGITAL']], function (option) {
                if (option && this.sourceBlock_.getFieldValue('MODE') !== option) {
                    that.updatePins_(option);
                }
            });
        }
        this.protocol_ = 'DIGITAL';
        this.dependConfig = {
            type: this.protocol_, dropDown: this.dropDownPorts
        };
        if (this.workspace.device === 'robotino') {
            this.appendValueInput('VALUE').appendField(Blockly.Msg.PIN_WRITE).appendField(valueType, 'MODE').appendField(Blockly.Msg.ACTION_IN).appendField(this.dropDownPorts, 'ACTORPORT').setCheck('Boolean');
        } else {
            this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.PIN_WRITE)
            .appendField(valueType, 'MODE')
            .appendField(Blockly.Msg.ACTION_IN)
            .appendField(this.dropDownPorts, 'ACTORPORT')
            .setCheck('Number');
        }
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(function() {
            return Blockly.Msg['ACTOR_' + that.getFieldValue('MODE') + 'IN_TOOLTIP'] || 'ACTOR_' + that.getFieldValue('MODE') + 'IN_TOOLTIP';
        });
        this.updatePins_('DIGITAL');
    }, mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('protocol', this.protocol_);
        return container;
    }, domToMutation: function(xmlElement) {
        var input = xmlElement.getAttribute('protocol');
        this.protocol_ = input;
        this.updatePins_(this.protocol_);
    }, updatePins_: function(option) {
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

Blockly.Blocks['robActions_pin_set_pull'] = {
    /**
     * Sets the chosen pin to the specified pull.
     *
     * @constructs robActions_pin_set_pull
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            available pins
     * @returns immediately
     * @memberof Block
     */

    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var pull = new Blockly.FieldDropdown([[Blockly.Msg.PIN_PULL_UP, 'UP'], [Blockly.Msg.PIN_PULL_DOWN, 'DOWN'], [Blockly.Msg.PIN_PULL_NONE, 'NONE']]);
        var pins = new Blockly.FieldDropdown(Blockly.Blocks.robConfigDefinitions.pinsDigital[this.workspace.subDevice]());
        this.appendDummyInput()
            .appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PIN_PULL)
            .appendField(Blockly.Msg.PIN_PULL_UP)
            .appendField(Blockly.Msg.ON + ' ' + Blockly.Msg.SENSOR_PIN)
            .appendField(pins, 'PIN_PORT'); // shouldnt be called PIN, would need a
        // special clause in xml.js like
        // mbedActions_write_to_pin
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ACTION_PIN_SET_PULL_TOOLTIP);
    }
};

Blockly.Blocks['robActions_sendData'] = {
    /**
     * Sets the chosen pin to the specified pull.
     *
     * @constructs robActions_pin_set_pull
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            available pins
     * @returns immediately
     * @memberof Block
     */

    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.INCREMENT = 1;
        this.DECREMENT = -1;
        this.appendDummyInput()
            .appendField(Blockly.Msg.SEND_DATA_TO)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SEND_DATA_SENSEMAP, 'SENSEMAP'], [Blockly.Msg.ACTION_SDCARD, 'SDCARD']]), 'DESTINATION');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setTooltip(Blockly.Msg.SEND_DATA_TO_OSM_TOOLTIP);
        this.connectedSensorsCount = 1;
        this.generateSensorInputs_(this.connectedSensorsCount);
    }, getNames_: function() {
        var names = [];
        var container = Blockly.Workspace.getByContainer('bricklyDiv');
        if (container) {
            var blocks = Blockly.Workspace.getByContainer('bricklyDiv').getAllBlocks();
            for (var x = 0; x < blocks.length; x++) {
                var func = blocks[x].getPhenomena;
                if (func) {
                    var phenomena = func.call(blocks[x]);
                    for (var i = 0; i < phenomena.length; i++) {
                        if (phenomena[i] !== '') {
                            names.push([phenomena[i], phenomena[i]]);
                        }
                    }
                }
            }
        }
        if (names.length === 0) {
            names.push([Blockly.Msg.CONFIGURATION_NO_PHENOMENON || Blockly.checkMsgKey('CONFIGURATION_NO_PHENOMENON'), 'NO_PHENOMENON']);
        }
        return names;
    }, setPhenomena: function(num, phenomena) {
        var names = [];
        for (var i = 0; i < phenomena.length; i++) {
            if (phenomena[i] !== '') {
                names.push([phenomena[i], phenomena[i]]);
            }
        }
        if (names.length === 0) {
            names.push([Blockly.Msg.CONFIGURATION_NO_PHENOMENON || Blockly.checkMsgKey('CONFIGURATION_NO_PHENOMENON'), 'NO_PHENOMENON']);
        }
        for (var i = 0; i < this.connectedSensorsCount; i++) {
            var dropDown = this.getField('PHEN' + i);
            var value = dropDown.getValue();
            var x = 0;
            for (x = 0; x < dropDown.menuGenerator_.length; x++) {
                if (!names[x]) {
                    if (dropDown.menuGenerator_[x][0] === value) {
                        dropDown.menuGenerator_.splice(x, 1);
                        dropDown.setValue(dropDown.menuGenerator_[0][0]);
                    } else {
                        dropDown.menuGenerator_.splice(x, 1);
                    }
                    break;
                }
                if (dropDown.menuGenerator_[x][0] !== names[x][0]) {
                    if (dropDown.menuGenerator_[x][0] === value) {
                        dropDown.menuGenerator_[x] = names[x];
                        dropDown.setValue(dropDown.menuGenerator_[x][0]);
                    } else {
                        dropDown.menuGenerator_[x] = names[x];
                    }
                    break;
                }
            }
            if (names[dropDown.menuGenerator_.length]) {
                dropDown.menuGenerator_.push(names[dropDown.menuGenerator_.length]);
            }
        }
        if (names.length > 1) {
            dropDown.arrow_.replaceChild(document.createTextNode(dropDown.sourceBlock_.RTL ? Blockly.FieldDropdown.ARROW_CHAR + ' ' : ' ' + Blockly.FieldDropdown.ARROW_CHAR), dropDown.arrow_.childNodes[0]);
        } else {
            dropDown.arrow_.replaceChild(document.createTextNode(''), dropDown.arrow_.childNodes[0]);
        }
        this.render();
    }, mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.connectedSensorsCount);
        return container;
    }, domToMutation: function(xmlElement) {
        var connectedSensorsCount = parseInt(xmlElement.getAttribute('items'), 10);
        var phenomenaDropdown = new Blockly.FieldDropdown(this.getNames_());
        this.connectedSensorsCount = connectedSensorsCount;
        this.generateSensorInputs_(this.connectedSensorsCount);
    }, generateSensorInputs_: function(numberOfSensorInputs) {
        for (var i = 0; i < numberOfSensorInputs; i++) {
            this.removeInput('ADD' + i);
        }
        for (var i = 0; i < numberOfSensorInputs; i++) {
            this.appendSensorInput_(i, new Blockly.FieldDropdown(this.getNames_()));
        }
    }, appendSensorInput_: function(inputNumber, phenomenaDropdown) {
        this.appendValueInput('ADD' + inputNumber)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck('Number')
            .appendField(Blockly.Msg.BRICK_PHENOMENON)
            .appendField(phenomenaDropdown, 'PHEN' + inputNumber);
    }, updateShape_: function(adjustment) {
        Blockly.dragMode_ = Blockly.DRAG_NONE;
        switch (adjustment) {
            case this.INCREMENT:
                if (this.connectedSensorsCount == 1) {
                    this.setMutatorMinus(new Blockly.MutatorMinus(this));
                    this.render();
                }
                var phenomenaDropdown = new Blockly.FieldDropdown(this.getNames_());
                this.appendSensorInput_(this.connectedSensorsCount, phenomenaDropdown);
                this.connectedSensorsCount++;
                break;
            case this.DECREMENT:
                this.connectedSensorsCount--;
                var target = this.getInputTargetBlock('ADD' + this.connectedSensorsCount);
                if (target) {
                    target.unplug();
                    target.bumpNeighbours_();
                }
                this.removeInput('ADD' + this.connectedSensorsCount);
                break;
            default:
                throw 'updateShape accepts only mutator plus/minus command for this block';
        }
        if (this.connectedSensorsCount == 1) {
            this.mutatorMinus.dispose();
            this.mutatorMinus = null;
            this.render();
        }
    }
};

Blockly.Blocks['robActions_plot_point'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropDownPorts = getConfigPorts('lcdi2c');
        this.dependConfig = {
            type: 'lcdi2c', dropDown: dropDownPorts
        };
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.ACTION_PLOT_POINT)
            .appendField(dropDownPorts, 'ACTORPORT')
            .appendField(Blockly.Msg.SENSOR_VALUE)
            .setCheck('Number');
        this.appendValueInput('TICKMARK').appendField(Blockly.Msg.ACTION_PLOT_TICKMARK).setAlign(Blockly.ALIGN_RIGHT).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ACTION_PLOT_POINT_TOOLTIP);
    }
};

Blockly.Blocks['robActions_plot_clear'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = getConfigPorts('lcdi2c');
        this.dependConfig = {
            type: 'lcdi2c', dropDown: ports
        };
        this.appendDummyInput().appendField(Blockly.Msg.ACTION_PLOT_CLEAR).appendField(ports, 'ACTORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ACTION_PLOT_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['robActions_debug'] = {
    /**
     * Debugs data to a system dependent output
     *
     * @constructs robActions_debug
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to debug
     * @returns immediately
     * @memberOf Block
     */
    init: function() {
        this.setColour('#646464');
        this.appendValueInput('OUT').appendField('debug');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('Debug any value or expression. The output is dependent on the system: simulation -> console; real systems -> write to serial or print');
    }
};

Blockly.Blocks['robActions_assert'] = {
    /**
     * Asserts data
     *
     * @constructs robActions_assert
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to debug
     * @returns immediately
     * @memberOf Block
     */
    init: function() {
        this.setColour('#646464');
        this.appendValueInput('OUT').appendField('assert').appendField(new Blockly.FieldTextInput(''), 'TEXT').setCheck('Boolean');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('Assert an expression and optional supply a custom label for the assertion.');
    }, onchange: function(e) {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        var inputBlock = this.getInputTargetBlock('OUT');
        if (inputBlock && inputBlock.type !== 'logic_compare') {
            inputBlock.unplug();
            inputBlock.bumpNeighbours_();
        }
    }
};

Blockly.Blocks['robActions_eval_expr'] = {
    /**
     * Provides a block to create expressions in the robot's programming
     * language
     *
     * @constructs robActions_eval_expr
     * @this.Blockly.Block
     * @param {any}
     *            OUT evaluated expression
     * @returns immediately
     * @memberOf Block
     */
    init: function() {
        this.setColour('#646464');
        this.type_ = Blockly.TYPE_DROPDOWN(this.workspace.device);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ACTION_EVAL)
            .appendField(new Blockly.FieldTextInput('eg a + b', this.validate), 'EXPRESSION')
            .appendField(Blockly.Msg.ACTION_EVAL_AS)
            .appendField(this.type_, 'TYPE');
        this.setOutput(true, 'Number');
        this.setTooltip('Evals any expression and return the result.');
    }, // this function can be removed if we are sure that no validation is needed
    validate: function(content) {
        return content;
    }, mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.type_);
        return container;
    }, domToMutation: function(xmlElement) {
        var type = xmlElement.getAttribute('type');
        this.updateType_(type);
    }, updateType_: function(type) {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        this.type_ = type;
        this.setOutput(true, type);
    }
};

function getBlocklyMsg(key) {
    return Blockly.Msg[key] || key;
}

function appendField(thisRef, key) {
    thisRef.appendValueInput(key).appendField(getBlocklyMsg(key)).setAlign(Blockly.ALIGN_RIGHT);
}

function appendFields(thisRef, keys) {
    for (var i = 0; i < keys.length; i++) {
        appendField(thisRef, keys[i]);
    }
}

function appendHeader(thisRef, key) {
    thisRef.setColour('#646464');
    thisRef.appendDummyInput().appendField(getBlocklyMsg(key));
    thisRef.setPreviousStatement(true);
    thisRef.setNextStatement(true);
    thisRef.setTooltip(getBlocklyMsg(key + '_TOOLTIP'));
}

function bumpIfNotNeuron(connection) {
    if (connection && connection.check_ != 'neuron') {
        var sourceBlock = connection.sourceBlock_;
        sourceBlock.unplug();
        sourceBlock.bumpNeighbours_();
    }
}

function mustBeVariable(thisRef, keys) {
    if (!thisRef.workspace || Blockly.Block.dragMode_ == 2) {
        return;
    }
    for (var i = 0; i < keys.length; i++) {
        var blockVar = thisRef.getInputTargetBlock(keys[i]);
        if (blockVar && blockVar.type !== 'variables_get') {
            blockVar.unplug();
            blockVar.bumpNeighbours_();
        }
    }
}

Blockly.Blocks['robActions_aifes_setupneuralnet'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        appendHeader(this, 'NN_SETUP');
        appendFields(this, ['NN_NUMBER_OF_CLASSES', 'NN_NUMBER_INPUT_NEURONS', 'NN_MAX_NUMBER_OF_NEURONS']);
    }
};

Blockly.Blocks['robActions_aifes_initrawdata'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_INIT_RAW_DATA);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_INIT_CLASSIFY_DATA_TOOLTIP);
    }
};

Blockly.Blocks['robActions_aifes_initclassifydata'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_INIT_CLASSIFY_DATA);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_INIT_RAW_DATA_TOOLTIP);
    }
};


Blockly.Blocks['robActions_aifes_addrawdata'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_ADD_RAW_DATA);
        this.appendValueInput("NN_RAW_DATA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_ADD_RAW_DATA_TOOLTIP);
    }
};

Blockly.Blocks['robActions_aifes_addclassifydata'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_ADD_CLASSIFY_DATA);
        this.appendValueInput("NN_CLASSIFY_DATA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_ADD_CLASSIFY_DATA_TOOLTIP);
    }
};

Blockly.Blocks['robActions_aifes_addtrainingsdata'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_ADD_TARGET_DATA);
        this.appendValueInput("NN_CLASS_NUMBER");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_ADD_TARGET_DATA_TOOLTIP);
    }
};

Blockly.Blocks['robActions_aifes_train'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_TRAIN);
        this.setOutput(true, 'Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_TRAIN_TOOLTIP);
    }
};

Blockly.Blocks['robActions_aifes_classify'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.AIFES_CLASSIFY);
        this.appendValueInput("NN_CLASS_PROBABILITIES");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.AIFES_CLASSIFY_TOOLTIP);
    }
};

/**
 * @return the (unique) start block from the program. Must exist.
 */
function getTheStartBlock() {
    var startBlock = null;
    for (const block of Blockly.getMainWorkspace().getTopBlocks()) {
        if (!block.isDeletable()) {
            return block;
        }
    }
    throw 'start block not found. That is impossible.';
}

/**
 * @return an array of arrays containing thge <br>
 * - input neurons
 * - output neurons
 * read from the start block's data. If that doesn't exist, return the default values
 */
function getInputOutputNeurons() {
    var data = getTheStartBlock().data;
    if (data === undefined || data === null) {
        return ['-', '-'];
    } else {
        try {
            var json = JSON.parse(data);
            var inputs = json.inputs.length > 0 ? json.inputs : ['-'];
            var outputs = json.outputs.length > 0 ? json.outputs : ['-'];
            return [inputs, outputs];
        } catch (e) {
            throw 'start block has invalid nn data.';
        }
    }
}

/**
 * @return an array all input, hidden and output neurons, generated from the net structure read
 * from the start block's data. If that doesn't exist, return an empty array
 */
function getAllNeurons(withInputs) {
    var data = getTheStartBlock().data;
    if (data === undefined || data === null) {
        return ['-'];
    } else {
        try {
            var json = JSON.parse(data);
            var shape = json.networkShape;
            var hidden = [];
            for (let h = 0; h < shape.length; h++) {
                for (let n = 0; n < shape[h]; n++) {
                    hidden.push('h' + (h + 1) + 'n' + (n + 1));
                }
            }
            if (withInputs) {
                return [].concat(json.inputs, hidden, json.outputs);
            } else {
                return [].concat(hidden, json.outputs);
            }
        } catch (e) {
            throw 'start block has invalid nn data.';
        }
    }
}

/**
 * @return an array built from the the input 'names' to be used in a dropdown
 */
function createNeuronsForDropdown(names) {
    var neuronNames = [];
    for (let i = 0; i < names.length; i++) {
        neuronNames.push([names[i], names[i]]);
    }
    return neuronNames;
}

/**
 * @return true, if two arrays have equal values (uses JSON.stringify)
 */
function isValueEqual(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

/**
 * set the value of an dropdown
 * @param dropdown dropdown whose value should be set
 * @param nameList list of all legal dropdown values
 * @param nameMaybeMissing name to be set, if it exists, otherwise take first value of the legal list as default
 */
function setDropdownVal(dropDown, nameList, nameMaybeMissing) {
    if (nameList.indexOf(nameMaybeMissing) > -1) {
        dropDown.setValue(nameMaybeMissing);
    } else if (nameList.length > 0) {
        dropDown.setValue(nameList[0]);
    }
    dropDown.render_();
}

Blockly.Blocks['robActions_NNstep'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NN_STEP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NN_STEP_TOOLTIP);
    }
};

Blockly.Blocks['robActions_set_inputneuron_val'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getInputOutputNeurons()[0];
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.NN_SET_INPUT_NEURON_VALUE)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'NAME')
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NN_SET_INPUT_NEURON_VALUE_TOOLTIP);
    }, onchange: function(evt) {
        if (!this.workspace || this.isInFlyout || evt.type == Blockly.Events.MOVE) {
            return;
        }
        var myDropDown = this.getField('NAME');
        var myVisibleText = myDropDown.text_;
        var myOptions = JSON.stringify(myDropDown.getOptions_());
        if (myOptions.indexOf(myVisibleText) < 0) {
            myDropDown.setValue(myDropDown.getOptions_()[0][0]);
            this.render();
        }
    }
};

Blockly.Blocks['robSensors_get_outputneuron_val'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getInputOutputNeurons()[1];
        this.appendDummyInput()
            .appendField(Blockly.Msg.NN_GET_OUTPUT_NEURON_VALUE)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'NAME');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NN_GET_OUTPUT_NEURON_VALUE_TOOLTIP);
    }, onchange: Blockly.Blocks['robActions_set_inputneuron_val'].onchange
};

Blockly.Blocks['robActions_set_weight'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getAllNeurons(true);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.NN_SET_WEIGHT)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'FROM')
            .appendField(Blockly.Msg.NN_TARGET)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'TO')
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NN_SET_WEIGHT_TOOLTIP);
    }, onchange: function(evt) {
        if (!this.workspace || this.isInFlyout || evt.type == Blockly.Events.MOVE) {
            return;
        }
        this.dropDownChecked = true;
        var myDropDownFROM = this.getField('FROM');
        var myVisibleTextFROM = myDropDownFROM.text_;
        var myOptionsFROM = JSON.stringify(myDropDownFROM.getOptions_());
        if (myOptionsFROM.indexOf(myVisibleTextFROM) < 0) {
            myDropDownFROM.setValue(myDropDownFROM.getOptions_()[0][0]);
        }
        var myDropDownTO = this.getField('TO');
        var myVisibleTextTO = myDropDownTO.text_;
        var myOptionsTO = JSON.stringify(myDropDownTO.getOptions_());
        if (myOptionsTO.indexOf(myVisibleTextTO) < 0) {
            myDropDownTO.setValue(myDropDownTO.getOptions_()[0][0]);
        }
        this.render();
    }
};

Blockly.Blocks['robActions_set_bias'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getAllNeurons(false);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.NN_SET_BIAS)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'NAME')
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NN_SET_BIAS_TOOLTIP);
    }, onchange: Blockly.Blocks['robActions_set_inputneuron_val'].onchange
};

Blockly.Blocks['robSensors_get_weight'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getAllNeurons(true);
        this.appendDummyInput()
            .appendField(Blockly.Msg.NN_GET_WEIGHT)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'FROM')
            .appendField(Blockly.Msg.NN_TARGET)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'TO');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NN_GET_WEIGHT_TOOLTIP);
    }, onchange: Blockly.Blocks['robActions_set_weight'].onchange
};

Blockly.Blocks['robSensors_get_bias'] = {
    init: function() {
        this.setColour(Blockly.CAT_NN_RGB);
        this.allNeurons = getAllNeurons(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.NN_GET_BIAS)
            .appendField(new Blockly.FieldDropdown(createNeuronsForDropdown(this.allNeurons)), 'NAME');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NN_GET_BIAS_TOOLTIP);
    }, onchange: Blockly.Blocks['robActions_set_inputneuron_val'].onchange
};

Blockly.Blocks['robActions_play_recording_file'] = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.PLAY + ' ' + Blockly.Msg.SENSOR_KEY_REC + ' ' + Blockly.Msg.PLAY_FILE + '%1',
            args0: [{
                type: 'input_value', name: 'FILENAME', check: 'Number'
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.ACTION_PLAY_RECORDING_TOOLTIP_THYMIO
        });
    }
};


Blockly.Blocks['robActions_led_button'] = {
    /**
     * Turns button leds around Thymio's buttons to given input value.
     *
     * @constructs robActions_button_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.action = 'LED';
        this.jsonInit({
            message0: Blockly.Msg.LED_BUTTON,
            message1: Blockly.Msg.SENSOR_TOP + ' % %1' + Blockly.Msg.RIGHT + ' % %2' + Blockly.Msg.SENSOR_BOTTOM + ' % %3' + Blockly.Msg.LEFT + ' % %4',
            args1: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED2', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED3', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED4', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_BUTTON_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['robActions_led_circle'] = {
    /**
     * Turns circle leds around Thymio's buttons to given input value.
     *
     * @constructs robActions_circle_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_CIRCLE,
            message1: Blockly.Msg.SENSOR_TOP + ' % %1' + Blockly.Msg.FRONT_RIGHT + ' % %2' + Blockly.Msg.RIGHT + ' % %3' + Blockly.Msg.BOTTOM_RIGHT + ' % %4' + Blockly.Msg.SENSOR_BOTTOM + ' % %5' + Blockly.Msg.BOTTOM_LEFT + ' % %6' + Blockly.Msg.LEFT + ' % %7' + Blockly.Msg.FRONT_LEFT + ' % %8',
            args1: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED2', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED3', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED4', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED5', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED6', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED7', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED8', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_CIRCLE_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['robActions_led_proxh'] = {
    /**
     * Turns prox leds around next to Thymio's horizontal infrared sensors to given input value.
     *
     * @constructs robActions_proxh_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_PROXH,
            message1: Blockly.Msg.FRONT_LEFT + ' % %1' + Blockly.Msg.FRONT_LEFT_MIDDLE + ' % %2' + Blockly.Msg.FRONT_MIDDLE + '/' + Blockly.Msg.LEFT + ' % %3' + Blockly.Msg.FRONT_MIDDLE + '/' + Blockly.Msg.RIGHT + ' % %4' + Blockly.Msg.FRONT_RIGHT_MIDDLE + ' % %5' + Blockly.Msg.FRONT_RIGHT + ' % %6' + Blockly.Msg.BACK_LEFT + ' % %7' + Blockly.Msg.BACK_RIGHT + ' % %8',
            args1: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED2', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED3', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED4', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED5', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED6', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED7', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED8', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_PROXH_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['robActions_led_proxv'] = {
    /**
     * Turns circle leds next to Thymio's vertical infrared sensors to given input value.
     *
     * @constructs robActions_proxv_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_PROXV,
            message1: Blockly.Msg.BOTTOM_LEFT + ' % %1' + Blockly.Msg.BOTTOM_RIGHT + ' % %2',
            args1: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED2', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_PROXV_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['robActions_led_temperature'] = {
    /**
     * Turns temperature leds next to Thymio's vertical temperature sensors to given input value.
     *
     * @constructs robActions_temperature_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_TEMPERATURE,
            message1: Blockly.Msg.BRICKLIGHT_RED + ' % %1' + Blockly.Msg.BRICKLIGHT_BLUE + ' % %2',
            args1: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }, {
                type: 'input_value', name: 'LED2', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_TEMPERATURE_ON_TOOLTIP
        });
    }
};

Blockly.Blocks['robActions_led_sound'] = {
    /**
     * Turns sound led next to Thymio's sound sensor to given input value.
     *
     * @constructs robActions_proxv_led
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LED_SOUND + ' % %1',
            args0: [{
                type: 'input_value', name: 'LED1', check: 'Number', align: 'RIGHT'
            }],
            previousStatement: true,
            nextStatement: true,
            colour: Blockly.CAT_ACTION_RGB,
            tooltip: Blockly.Msg.LED_SOUND_ON_TOOLTIP
        });
    }
};
