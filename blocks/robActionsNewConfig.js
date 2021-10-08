/**
 * @fileoverview Action blocks.
 * @requires Blockly.Blocks
 * @author Marcel
 */
'use strict';

goog.provide('Blockly.Blocks.robActionsNewConfig');

goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.robConfigDefinitions');

/**
 * @lends Block
 */
Blockly.Blocks['robActions_ultrasonic2_led'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('ultrasonic');
        this.dependConfig = {
            'type': 'ultrasonic',
            'dropDown': sensorPorts
        };
        var ports = new Blockly.FieldDropdown([['1', 'LED1'], ['2', 'LED2'], ['3', 'LED3'], ['4', 'LED4'], ['5', 'LED5'], ['6', 'LED6'], ['7', 'LED7'], ['8', 'LED8'], [Blockly.Msg.NAO_LED_ALL, 'LEDALL']]);

        this.appendDummyInput().appendField(Blockly.Msg.SET).appendField(Blockly.Msg.ACTION_LED).appendField().appendField(ports, 'LED').appendField(Blockly.Msg.SENSOR_ULTRASONIC + " 2 ").setAlign(Blockly.ALIGN_RIGHT).appendField(sensorPorts, 'ACTORPORT');
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LEDBAR_ULTRASONIC2_SET_TOOLTIP);
    }
};

Blockly.Blocks['robActions_quadRGB_led_on'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('quadrgb');
        this.dependConfig = {
            'type': 'quadrgb',
            'dropDown': sensorPorts
        };

        this.appendValueInput('COLOR').appendField(Blockly.Msg.RGBLED_ON).appendField(Blockly.Msg.SENSOR_QUADRGB).appendField(sensorPorts, 'ACTORPORT').appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_QUADRGB_TOOLTIP);
    }
};

Blockly.Blocks['robActions_quadRGB_led_off'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('quadrgb');
        this.dependConfig = {
            'type': 'quadrgb',
            'dropDown': sensorPorts
        };

        this.appendDummyInput().appendField(Blockly.Msg.RGBLED_OFF).appendField(Blockly.Msg.SENSOR_QUADRGB).appendField(sensorPorts, 'ACTORPORT');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_OFF_QUADRGB_TOOLTIP);
    }
};

Blockly.Blocks['robActions_led_setBrightness'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var dropDownPorts = getConfigPorts('rgbled');
        this.dependConfig = {
            'type': 'rgbled',
            'dropDown': dropDownPorts
        };
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SET + ' '
            + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS).appendField(dropDownPorts, 'ACTORPORT').appendField(Blockly.Msg.ACTION_RGBLED_MBOT2);

        hidePortIfOnlyInbuilt(this);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_SET_BRIGHTNESS_TOOLTIP);
    }
};

Blockly.Blocks['robActions_display_set_colour'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('lcd');
        this.dependConfig = {
            'type': 'lcd',
            'dropDown': sensorPorts
        };       
        this.appendValueInput('COLOR').appendField(Blockly.Msg.ACTION_LCD_MBOT2_BRUSH).appendField(sensorPorts, 'ACTORPORT').appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');
        hidePortIfOnlyInbuilt(this);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ACTION_LCD_MBOT2_BRUSH_TOOLTIP);
    }
};

Blockly.Blocks['robActions_println'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('lcd');
        this.dependConfig = {
            'type': 'lcd',
            'dropDown': sensorPorts
        }; 

        this.appendValueInput('OUT').setAlign(Blockly.ALIGN_RIGHT).appendField(sensorPorts, 'ACTORPORT').appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT + ' ' + Blockly.Msg.DISPLAY_NEW_ROW);
        hidePortIfOnlyInbuilt(this);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PRINTLN_TOOLTIP);
    }
};

Blockly.Blocks['robActions_play_recording'] = {
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);

        var sensorPorts = getConfigPorts('buzzer');
        this.dependConfig = {
            'type': 'buzzer',
            'dropDown': sensorPorts
        }; 

        this.appendDummyInput('OUT').appendField(sensorPorts, 'ACTORPORT').appendField(Blockly.Msg.PLAY + " " + Blockly.Msg.SENSOR_KEY_REC);
        hidePortIfOnlyInbuilt(this);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setBlocking(true);
        this.setTooltip(Blockly.Msg.ACTION_PLAY_RECORDING_TOOLTIP);
    }
};

Blockly.Blocks['robActions_led_on_new_config'] = {
    /**
     * Turns led/s on.
     *
     * @constructs robActions_led_on_new_config
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.action = 'LED';
        var slots = new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], [Blockly.Msg.NAO_LED_ALL, 'ALL']]);
        var ports = getConfigPorts('rgbled');
        this.dependConfig = {
                'type': 'rgbled',
                'dropDown': ports
            };
        this.appendValueInput('COLOR').appendField(Blockly.Msg.RGBLED_ON).appendField(ports, 'ACTORPORT').appendField(slots, 'LED').appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');
        hidePortIfOnlyInbuilt(this);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};