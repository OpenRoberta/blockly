/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robConfigDefinitions');

goog.require('Blockly.Blocks');

// define sensors here as a property of sensors  ********************************************************************************

/*- minimal example:
 *
 * confBlocks.lcdi2c.arduino = {
 * title : 'LCDI2C',
 *  sensor: false
 };
 *
 */

/*- all supported properties:
 *
 * title,
 * ports,
 * pins,
 * sensor
 * standardPins
 */

var confBlocks = {};

function createPins(startNumber, endNumber, opt_prefix_ext, opt_prefix_int) {
    if (!opt_prefix_ext) {
        opt_prefix_ext = "";
    }
    if (!opt_prefix_int) {
        opt_prefix_int = "";
    }
    var array = [];
    for (var i = startNumber; i <= endNumber; i++) {
        var pin_ext = opt_prefix_ext + i;
        var pin_int = opt_prefix_int + i;
        array.push([pin_ext.toString(), pin_int.toString()]);
    }
    return array;
}

Blockly.Blocks.robConfigDefinitions['pinsDigital'] = {};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].uno = function() {
    return createPins(0, 13);
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].unowifirev2 = function() {
    return createPins(0, 13);
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].nano = function() {
    return createPins(0, 13, "D");
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].nano33ble = function() {
    return createPins(0, 13, "D");
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].mega = function() {
    return createPins(0, 53);
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].sensebox = function() {
    var array = createPins(1, 2, "A");
    array = array.concat(createPins(3, 4, "B"));
    array = array.concat(createPins(5, 6, "C"));
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].festobionic = function() {
    return createPins(1, 4);
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].festobionicflower = function() {
    return createPins(1, 4);
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].calliope = function() {
    var array = [
        ['P0', '0'],
        ['P1', '1'],
        ['P2', '2'],
        ['P3', '3'],
        ['A0', '4'],
        ['A1', '5'],
        ['C04', 'C04'],
        ['C05', 'C05'],
        ['C06', 'C06'],
        ['C07', 'C07'],
        ['C08', 'C08'],
        ['C09', 'C09'],
        ['C10', 'C10'],
        ['C11', 'C11'],
        ['C12', 'C12'],
        ['C16', 'C16'],
        ['C17', 'C17'],
        ['C18', 'C18'],
        ['C19', 'C19']
    ]
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsDigital'].microbit = function() {
    var array = createPins(0, 16);
    array = array.concat(createPins(19, 20));
    return array;
};

Blockly.Blocks.robConfigDefinitions['pinsAnalog'] = {};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].uno = function() {
    return createPins(0, 5, "A", "A");
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].unowifirev2 = function() {
    return createPins(0, 5, "A", "A");
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].nano = function() {
    return createPins(0, 7, "A", "A");
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].nano33ble = function() {
    return createPins(0, 7, "A", "A");
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].mega = function() {
    return createPins(0, 15, "A", "A");
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].sensebox = function() {
    var array = createPins(1, 2, "A");
    array = array.concat(createPins(3, 4, "B"));
    array = array.concat(createPins(5, 6, "C"));
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].calliope = function() {
    var array = [
        ['P1', '1'],
        ['P2', '2'],
        ['A1', '5'],
        ['C04', 'C04'],
        ['C05', 'C05'],
        ['C06', 'C06'],
        ['C16', 'C16'],
        ['C17', 'C17']
    ];
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsAnalog'].microbit = function() {
    var array = createPins(0, 4);
    array = array.concat(createPins(10, 10));
    return array;
};

Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'] = {};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].uno = function() {
    var part1 = createPins(3, 3);
    var part2 = createPins(5, 6);
    var part3 = createPins(9, 11);
    return part1.concat(part2).concat(part3);
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].unowifirev2 = function() {
    var part1 = createPins(3, 3);
    var part2 = createPins(5, 6);
    var part3 = createPins(9, 10);
    return part1.concat(part2).concat(part3);
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].nano = function() {
    var part1 = createPins(3, 3, "D");
    var part2 = createPins(5, 6, "D");
    var part3 = createPins(9, 11, "D");
    return part1.concat(part2).concat(part3);
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].nano33ble = function() {
    var part1 = createPins(3, 3, "D");
    var part2 = createPins(5, 6, "D");
    var part3 = createPins(9, 11, "D");
    return part1.concat(part2).concat(part3);
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].mega = function() {
    var part1 = createPins(2, 13);
    var part2 = createPins(44, 46);
    return part1.concat(part2);
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].sensebox = function() {
    var array = createPins(1, 2, "A");
    array = array.concat(createPins(3, 4, "B"));
    array = array.concat(createPins(5, 6, "C"));
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].calliope = function() {
    var array = [
        ['P1', '1'],
        ['P2', '2'],
        ['A1', '5'],
        ['C04', 'C04'],
        ['C05', 'C05'],
        ['C06', 'C06'],
        ['C16', 'C16'],
        ['C17', 'C17']
    ];
    return array;
};
Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'].microbit = function() {
    var array = createPins(0, 4);
    array = array.concat(createPins(10, 10));
    return array;
};

Blockly.Blocks.robConfigDefinitions['pins_wedo'] = function() {
    return createPins(1, 2);
};

Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'] = function() {
    var array = [
        ['GPIO 1 (ID_SC)', '1'],
        ['GPIO 2 (SDA)', '2'],
        ['GPIO 3 (SCL)', '3'],
        ['GPIO 4 (GPCLK0)', '4'],
        ['GPIO 5', '5'],
        ['GPIO 6', '6'],
        ['GPIO 7 (CE1)', '7'],
        ['GPIO 8 (CE0)', '8'],
        ['GPIO 9 (MISO)', '9'],
        ['GPIO 10 (MOSI)', '10'],
        ['GPIO 11 (SCLK)', '11'],
        ['GPIO 12 (PWM0)', '12'],
        ['GPIO 13 (PWM1)', '13'],
        ['GPIO 14 (TXD)', '14'],
        ['GPIO 15 (RXD)', '15'],
        ['GPIO 16', '16'],
        ['GPIO 17', '17'],
        ['GPIO 18 (PCM_CLK)', '18'],
        ['GPIO 19 (PCM_FS)', '19'],
        ['GPIO 20 (PCM_DIN)', '20'],
        ['GPIO 21 (PCM_DOUT)', '21'],
        ['GPIO 22', '22'],
        ['GPIO 23', '23'],
        ['GPIO 24', '24'],
        ['GPIO 25', '25'],
        ['GPIO 26', '26'],
        ['GPIO 27', '27']
    ];
    return array;
};


confBlocks.ultrasonic = {};
confBlocks.ultrasonic.arduino = {
    title: 'ULTRASONIC',
    ports: [
        ['trig', 'TRIG'],
        ['echo', 'ECHO']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['7', '6'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.ultrasonic.calliope = {
    title: 'ULTRASONIC',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return [
            ['A1', '1']
        ];
    },
    sensor: true
};
confBlocks.ultrasonic.sensebox = {
    title: 'ULTRASONIC',
    ports: [
        ['trig', 'TRIG'],
        ['echo', 'ECHO']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['1', '2'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.ultrasonic.raspberrypi = {
    title: 'ULTRASONIC',
    ports: [
        ['trig', 'TRIG'],
        ['echo', 'ECHO']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: true,
    standardPins: ['17', '18'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.light = {};
confBlocks.light.arduino = {
    title: 'LIGHT',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['VCC', '5V']
    ]
};
confBlocks.light.calliope = {
    title: 'LIGHT',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.light.microbit = confBlocks.light.calliope;
confBlocks.light.mbot2 = confBlocks.light.calliope;
confBlocks.light.festobionicflower = {
    title: 'LIGHT',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
};
confBlocks.light.sensebox = {
    title: 'LIGHT',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['1'],
    fixedPorts: [
        ['VCC', '5V']
    ]
};
confBlocks.light.raspberrypi = {
    title: 'LIGHT',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: true,
    standardPins: ['18'],
    fixedPorts: [
        ['VCC', '3V3'],
        ['GND', 'GND']
    ]
};

confBlocks.lightveml = {};
confBlocks.lightveml.sensebox = {
    title: 'LIGHTVEML',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function(a) {
        return [
            ['I2C', 'I2C']
        ];
    },
    sensor: true
};

confBlocks.accelerometer = {};
confBlocks.accelerometer.calliope = {
    title: 'ACCELEROMETER',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.accelerometer.microbit = confBlocks.accelerometer.calliope;
confBlocks.accelerometer.mbot2 = confBlocks.accelerometer.calliope;
confBlocks.accelerometer.sensebox = {
    title: 'ACCELEROMETER',
    sensor: true
};
confBlocks.accelerometer.arduino = confBlocks.accelerometer.sensebox;


confBlocks.colourtcs3472 = {};
confBlocks.colourtcs3472.calliope = {
    title: 'COLOURTCS3472',
    ports: [
        ['pin', 'PIN1']
    ],
    dropdowns: [
        ['GAIN', [
            ['1x', '1X'],
            ['4x', '4X'],
            ['16x', '16X'],
            ['60x', '60X']
        ]],
        ['I_TIME', [
            ["2.4ms", "2_4MS"],
            ["24ms", "24MS"],
            ["50ms", "50MS"],
            ["101ms", "101MS"],
            ["154ms", "154MS"],
            ["700ms", "700MS"]
        ]]
    ],
    pins: function(a) {
        return [
            ['A0', 'A0']
        ];
    },
    sensor: true
};

confBlocks.compass = {};
confBlocks.compass.calliope = {
    title: 'COMPASS',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.compass.microbit = confBlocks.compass.calliope;
confBlocks.compass.sensebox = {
    title: 'COMPASS',
    sensor: true
};

confBlocks.moisture = {};
confBlocks.moisture.arduino = {
    title: 'MOISTURE',
    ports: [
        ['S', 'S']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.potentiometer = {};
confBlocks.potentiometer.arduino = {
    title: 'POTENTIOMETER',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.potentiometer.sensebox = {
    title: 'POTENTIOMETER',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['1'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.infrared = {};
confBlocks.infrared.wedo = {
    title: 'INFRARED',
    bricks: true,
    ports: [
        ['CONNECTOR', 'CONNECTOR']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pins_wedo'],
    sensor: true
};
confBlocks.infrared.arduino = {
    title: 'INFRARED',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['11'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.temperature = {};
confBlocks.temperature.arduino = {
    title: 'TEMPERATURE',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.temperature.calliope = {
    title: 'TEMPERATURE',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.temperature.microbit = confBlocks.temperature.calliope;
confBlocks.temperature.sensebox = {
    title: 'TEMPERATURE',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function(a) {
        return [
            ['I2C', 'I2C']
        ];
    },
    sensor: true
};

confBlocks.humidity = {};
confBlocks.humidity.arduino = {
    title: 'HUMIDITY',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['2'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.humidity.calliope = {
    title: 'HUMIDITY',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return [
            ['A1', '5']
        ];
    },
    sensor: true
};
confBlocks.humidity.sensebox = {
    title: 'HUMIDITY',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function() {
        return [
            ['I2C', 'I2C']
        ];
    },
    sensor: true
};

confBlocks.motion = {};
confBlocks.motion.arduino = {
    title: 'MOTION',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['7'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.motion.raspberrypi = {
    title: 'MOTION',
    ports: [
        ['output', 'OUTPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: true,
    standardPins: ['4'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.joystick = {};
confBlocks.joystick.mbot2 = {
    title: 'JOYSTICK',
    sensor: true,
    inbuilt: true
};

confBlocks.key = {};
confBlocks.key.arduino = {
    title: 'KEY',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['2'],
    fixedPorts: [
        ['VCC', '5V']
    ]
};
confBlocks.key.calliope = {
    title: 'KEY',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function() {
        return [
            ['A', 'A'],
            ['B', 'B']
        ];
    },
    sensor: true,
    standardPins: ['A'],
};
confBlocks.key.microbit = confBlocks.key.calliope;
confBlocks.key.sensebox = confBlocks.key.arduino;
confBlocks.key.mbot2 = confBlocks.key.calliope;

confBlocks.key.wedo = {
    title: 'KEY',
    bricks: true,
    sensor: true
};
confBlocks.key.raspberrypi = {
    title: 'KEY',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: true,
    standardPins: ['4'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};

confBlocks.touch = {};
confBlocks.touch.festobionicflower = {
    title: 'TOUCH',
    ports: [
        ['touch', 'TOUCHED']
    ],
    pins: function() {
        return [
            ['PAD1', 'PAD1'],
            ['PAD2', 'PAD2']
        ];
    },
    sensor: true,
    standardPins: ['PAD1'],
};

confBlocks.drop = {};
confBlocks.drop.arduino = {
    title: 'DROP',
    ports: [
        ['S', 'S']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.pulse = {};
confBlocks.pulse.arduino = {
    title: 'PULSE',
    ports: [
        ['S', 'S']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
    standardPins: ['A0'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.rfid = {};
confBlocks.rfid.arduino = {
    title: 'RFID',
    ports: [
        ['RST', 'RST'],
        ['SDA', 'SDA']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['9', '10', '13', '11', '12'],
    fixedPorts: [
        ['GND', 'GND'],
        ['3,3V', '3,3V'],
        ['SCK', '13'],
        ['MOSI', '11'],
        ['MISO', '12']
    ]
};

confBlocks.lcd = {};
confBlocks.lcd.arduino = {
    title: 'LCD',
    ports: [
        ['RS', 'RS'],
        ['E', 'E'],
        ['D4', 'D4'],
        ['D5', 'D5'],
        ['D6', 'D6'],
        ['D7', 'D7']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['12', '11', '5', '4', '3', '2'],
    fixedPorts: [
        ['VSS', 'GND'],
        ['VDD', '5V'],
        ['V0', 'Vp'],
        ['RW', 'GND']
    ]
};
confBlocks.lcd.mbot2= {
    title:'LCD',
    inbuilt: true,
    sensor: false
}

confBlocks.oledssd1306i2c = {};
confBlocks.oledssd1306i2c.arduino = {
    title: 'OLEDSSD1306I2C',
    sensor: false,
    inputs: [
        ['ADDRESS', '0x3D']
    ],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V'],
        ['SDA', 'A4'],
        ['SCL', 'A5']
    ]
};

confBlocks.lcdi2c = {};
confBlocks.lcdi2c.arduino = {
    title: 'LCDI2C',
    sensor: false,
    inputs: [
        ['ADDRESS', '0x27']
    ],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V'],
        ['SDA', 'A4'],
        ['SCL', 'A5']
    ]
};
confBlocks.lcdi2c.sensebox = {
    title: 'LCDI2C',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function(a) {
        return [
            ['I2C', 'I2C']
        ];
    },
    inputs: [
        ['TITLE', 'P'],
        ['XLABEL', 'X'],
        ['YLABEL', 'Y'],
        ['XSTART', '0'],
        ['XEND', '100'],
        ['YSTART', '0'],
        ['YEND', '50'],
        ['XTICK', '10'],
        ['YTICK', '10']
    ],
    sensor: false
};

confBlocks.differentialdrive = {};
confBlocks.differentialdrive.mbot2 = {
    title: 'DIFFERENTIALDRIVE',
    inputs: [
        ['BRICK_WHEEL_DIAMETER','6.5'],
        ['BRICK_TRACK_WIDTH','11.5']
    ],
    ports: [
        ['MOTOR_LEFT', 'MOTOR_L'],
        ['MOTOR_RIGHT', 'MOTOR_R']

    ],
    pins: function(a) {
        return [
            ['EM1', 'EM1'],
            ['EM2', 'EM2']
        ];
    },
    sensor: false,
    inbuilt: true
};

confBlocks.led = {};
confBlocks.led.arduino = {
    title: 'LED',
    ports: [
        ['input', 'INPUT']
    ],
    pins: function(a) {
        var pins = Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
        if (pins !== undefined) {
            pins = pins().concat([
                [Blockly.Msg.PORT_INTERNAL, 'LED_BUILTIN']
            ]); // add internal LED to available LEDs
        }
        return pins;
    },
    sensor: false,
    standardPins: ['LED_BUILTIN'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.led.festobionic = {
    title: 'LED',
    ports: [
        ['input', 'INPUT']
    ],
    pins: function(a) {
        return [
            [Blockly.Msg.PORT_INTERNAL, 'LED_BUILTIN']
        ]; // only inbuilt LED
    },
    sensor: false,
    standardPins: ['LED_BUILTIN'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.led.sensebox = {
    title: 'LED',
    ports: [
        ['input', 'INPUT']
    ],
    pins: function(a) {
        var array = createPins(1, 2, "A");
        array = array.concat(createPins(3, 4, "B"));
        array = array.concat(createPins(5, 6, "C"));
        array = array.concat(createPins(7, 8));
        return array;
    },
    sensor: false,
    standardPins: ['1'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.led.wedo = {
    title: 'LED',
    bricks: true,
    action: true
};
confBlocks.led.raspberrypi = {
    title: 'LED',
    ports: [
        ['input', 'INPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
    standardPins: ['17'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};

confBlocks.buzzer = {};
confBlocks.buzzer.arduino = {
    title: 'BUZZER',
    ports: [
        ['+', '+']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['5'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.buzzer.calliope = {
    title: 'BUZZER',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: false,
    inbuilt: true
};
confBlocks.buzzer.mbot2 = {
    title: 'BUZZER',
    sensor: false,
    inbuilt: true
};
confBlocks.buzzer.microbit = {
    title: 'BUZZER',
    fixedPorts: [
        ['pin', '0'],
        ['GND', 'GND']
    ],
    sensor: false
};
confBlocks.buzzer.sensebox = {
    title: 'BUZZER',
    ports: [
        ['+', '+']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['1'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.buzzer.wedo = {
    title: 'BUZZER',
    bricks: true,
    action: true
};
confBlocks.buzzer.raspberrypi = {
    title: 'BUZZER',
    ports: [
        ['input', 'INPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
    standardPins: ['5'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};

confBlocks.sound = {};
confBlocks.sound.calliope = {
    title: 'SOUND',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.sound.mbot2 = confBlocks.sound.calliope;
confBlocks.sound.sensebox = {
    title: 'SOUND',
    ports: [
        ['out', 'OUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
    standardPins: ['1'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.relay = {};
confBlocks.relay.arduino = {
    title: 'RELAY',
    ports: [
        ['IN', 'IN']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['6'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.rgbled = {};
confBlocks.rgbled.arduino = {
    title: 'RGBLED',
    ports: [
        ['red', 'RED'],
        ['green', 'GREEN'],
        ['blue', 'BLUE']
    ],
    pins: function(a) {
        var pins = Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
        if (pins !== undefined) {
            pins = pins().concat([
                [Blockly.Msg.PORT_INTERNAL, 'LED_BUILTIN']
            ]); // add internal LED to available LEDs
        }
        return pins;
    },
    sensor: false,
    standardPins: ['5', '6', '3'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};
confBlocks.rgbled.festobionicflower = {
    title: 'RGBLED',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: false,
};

confBlocks.rgbled.calliope = {
    title: 'RGBLED',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: false,
    inbuilt: true
};
confBlocks.rgbled.sensebox = {
    title: 'RGBLED',
    ports: [
        ['input', 'INPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    fixedPorts: [
        ['+', '5V'],
        ['GND', 'GND']
    ]
};
confBlocks.rgbled.mbot2 = {
    title: 'RGBLED',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: false,
    inbuilt: true
};
confBlocks.rgbled.raspberrypi = {
    title: 'RGBLED',
    ports: [
        ['red', 'RED'],
        ['green', 'GREEN'],
        ['blue', 'BLUE']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
    standardPins: ['9', '10', '11'],
    fixedPorts: [
        ['GND', 'GND']
    ]
};

confBlocks.stepmotor = {};
confBlocks.stepmotor.arduino = {
    title: 'STEPMOTOR',
    ports: [
        ['IN1', 'IN1'],
        ['IN2', 'IN2'],
        ['IN3', 'IN3'],
        ['IN4', 'IN4']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['6', '5', '4', '3'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.stepmotor.festobionicflower = {
    title: 'STEPMOTOR',
    ports: [
        ['step', 'STEP1']
    ],
    sensor: false,
};


confBlocks.servo = {};
confBlocks.servo.arduino = {
    title: 'SERVO',
    ports: [
        ['pulse', 'PULSE']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
    standardPins: ['8'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};
confBlocks.servo.festobionic = confBlocks.servo.arduino;
confBlocks.servo.festobionic.standardPins = ['1'];
confBlocks.servo.calliope = {
    title: 'SERVO',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: false
};
confBlocks.servo.raspberrypi = {
    title: 'SERVO',
    inputs: [
        ['MIN_PULSE_WIDTH', 1 / 1000],
        ['MAX_PULSE_WIDTH', 2 / 1000],
        ['FRAME_WIDTH', 20 / 1000]
    ],
    ports: [
        ['pin', 'PIN1']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
    standardPins: ['17'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.angularservo = {};
confBlocks.angularservo.raspberrypi = {
    title: 'SERVO',
    inputs: [
        ['MIN_ANGLE', -90],
        ['MAX_ANGLE', 90],
        ['MIN_PULSE_WIDTH', 1 / 1000],
        ['MAX_PULSE_WIDTH', 2 / 1000],
        ['FRAME_WIDTH', 20 / 1000]
    ],
    ports: [
        ['pin', 'PIN1']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
    standardPins: ['17'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.gyro = {};
confBlocks.gyro.wedo = {
    title: 'GYRO',
    bricks: true,
    ports: [
        ['CONNECTOR', 'CONNECTOR']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pins_wedo'],
    sensor: true
};
confBlocks.gyro.calliope = {
    title: 'GYRO',
    ports: [
        ['pin', 'PIN1']
    ],
    sensor: true,
    inbuilt: true
};
confBlocks.gyro.sensebox = {
    title: 'GYRO',
    sensor: true
};
confBlocks.gyro.mbot2 = confBlocks.gyro.calliope;

confBlocks.lsm9ds1 = {}
confBlocks.lsm9ds1.nano33ble = {
    title: 'LSM9DS1',
    sensor: true,
    inbuilt: true
};
confBlocks.apds9960 = {}
confBlocks.apds9960.nano33ble = {
    title: 'APDS9960',
    sensor: true,
    inbuilt: true
};
confBlocks.lps22hb = {}
confBlocks.lps22hb.nano33ble = {
    title: 'LPS22HB',
    sensor: true,
    inbuilt: true
};
confBlocks.hts221 = {}
confBlocks.hts221.nano33ble = {
    title: 'HTS221',
    sensor: true,
    inbuilt: true
};

confBlocks.gyro.arduino = confBlocks.gyro.sensebox;

confBlocks.motor = {};
confBlocks.motor.calliope = {
    title: 'MOTOR',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return [
            ['Port A', 'A'],
            ['Port B', 'B']
        ];
    },
    action: true
};
confBlocks.motor.wedo = {
    title: 'MOTOR',
    bricks: true,
    ports: [
        ['CONNECTOR', 'CONNECTOR']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pins_wedo'],
    action: true
};

confBlocks.motor.raspberrypi = {
    title: 'MOTOR',
    ports: [
        ['PIN_FORWARD', 'PIN_FORWARD'],
        ['PIN_BACKWARD', 'PIN_BACKWARD']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    action: true,
    standardPins: ['17', '18'],
    fixedPorts: [
        ['GND', 'GND'],
        ['VCC', '5V']
    ]
};

confBlocks.encoder = {};
confBlocks.encoder.mbot2 = {
    title: 'ENCODER',
    action: true,
    ports: [
        ['port', 'PORT1']
    ],
    pins: function(a) {
        return [
            ['EM1', 'EM1'],
            ['EM2', 'EM2']
        ];    },
};

confBlocks.digitalout = {};
confBlocks.digitalout.arduino = {
    title: 'DIGITALOUT',
    ports: [
        ['SENSOR_PIN', 'OUTPUT']
    ],
    dropdowns: [
        ['PIN_PULL', [
            ['PIN_PULL_NONE', 'PIN_PULL_NONE'],
            ['PIN_PULL_UP', 'PIN_PULL_UP'],
        ]]
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
};
confBlocks.digitalout.sensebox = {
    title: 'DIGITALOUT',
    ports: [
        ['SENSOR_PIN', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
};
confBlocks.digitalout.calliope = {
    title: 'DIGITALOUT',
    ports: [
        ['pin', 'PIN1']
    ],
    dropdowns: [
        ['PIN_PULL', [
            ['PIN_PULL_NONE', 'PIN_PULL_NONE'],
            ['PIN_PULL_UP', 'PIN_PULL_UP'],
            ['PIN_PULL_DOWN', 'PIN_PULL_DOWN']
        ]]
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
};
confBlocks.digitalout.microbit = {
    title: 'DIGITALOUT',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: true,
};
confBlocks.digitalout.raspberrypi = {
    title: 'DIGITALOUT',
    ports: [
        ['SENSOR_PIN', 'OUTPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: true
};

confBlocks.analogout = {};
confBlocks.analogout.arduino = {
    title: 'ANALOGOUT',
    ports: [
        ['SENSOR_PIN', 'OUTPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
};
confBlocks.analogout.sensebox = confBlocks.analogout.arduino;
confBlocks.analogout.calliope = {
    title: 'ANALOGOUT',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalog'][a];
    },
    sensor: true,
};
confBlocks.analogout.microbit = confBlocks.analogout.calliope;

confBlocks.digitalin = {};
confBlocks.digitalin.arduino = {
    title: 'DIGITALIN',
    ports: [
        ['SENSOR_PIN', 'INPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
};
confBlocks.digitalin.sensebox = confBlocks.digitalin.arduino;
confBlocks.digitalin.calliope = {
    title: 'DIGITALIN',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsDigital'][a];
    },
    sensor: false,
};
confBlocks.digitalin.microbit = confBlocks.digitalin.calliope;
confBlocks.digitalin.raspberrypi = {
    title: 'DIGITALIN',
    ports: [
        ['SENSOR_PIN', 'INPUT']
    ],
    pins: Blockly.Blocks.robConfigDefinitions['pinsRaspberrypi'],
    sensor: false,
};

confBlocks.analogin = {};
confBlocks.analogin.arduino = {
    title: 'ANALOGIN',
    ports: [
        ['SENSOR_PIN', 'INPUT']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'][a];
    },
    sensor: false,
};
confBlocks.analogin.sensebox = confBlocks.analogin.arduino;
confBlocks.analogin.calliope = {
    title: 'ANALOGIN',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return Blockly.Blocks.robConfigDefinitions['pinsAnalogWrite'][a];
    },
    sensor: false,
};
confBlocks.analogin.microbit = confBlocks.analogin.calliope;

confBlocks.wireless = {}
confBlocks.wireless.sensebox = {
    title: 'WIRELESS',
    dropdowns: [
        ['SOCKET', [
            ['XBEE1', 'XBEE1']
        ]]
    ],
    sensor: false
};

confBlocks.sdcard = {}
confBlocks.sdcard.sensebox = {
    title: 'SDCARD',
    inputs: [
        ['NAO_FILENAME', 'FILE.TXT']
    ],
    dropdowns: [
        ['SOCKET', [
            ['XBEE2', 'XBEE2']
        ]]
    ],
    sensor: false
};

confBlocks.plotting = {}
confBlocks.plotting.sensebox = {
    title: 'PLOTTING',
    inputs: [
        ['TITLE', 'P'],
        ['XLABEL', 'X'],
        ['YLABEL', 'Y'],
        ['XSTART', '0'],
        ['XEND', '100'],
        ['YSTART', '0'],
        ['YEND', '50'],
        ['XTICK', '10'],
        ['YTICK', '10']
    ],
    sensor: false
};

confBlocks.particle = {}
confBlocks.particle.sensebox = {
    title: 'PARTICLE',
    ports: [
        ['Serial', 'SERIAL']
    ],
    pins: function(a) {
        return [
            ['Serial1', 'Serial1'],
            ['Serial2', 'Serial2']
        ];
    },
    sensor: true
};

confBlocks.gps = {}
confBlocks.gps.sensebox = {
    title: 'GPS',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function() {
        return [
            ['I2C', 'I2C']
        ];
    },
    sensor: true
};

confBlocks.fourdigitdisplay = {}
confBlocks.fourdigitdisplay.calliope = {
    title: 'FOURDIGITDISPLAY',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return [
            ['A1', '5']
        ];
    },
    sensor: false
};

confBlocks.ledbar = {}
confBlocks.ledbar.calliope = {
    title: 'LEDBAR',
    ports: [
        ['pin', 'PIN1']
    ],
    pins: function(a) {
        return [
            ['A1', '5']
        ];
    },
    sensor: false
};

confBlocks.callibot = {}
confBlocks.callibot.calliope = {
    title: 'CALLIBOT',
    super: true,
    subcomponents: [
        ['LEFT_MOTOR', 'MOTOR_L'],
        ['RIGHT_MOTOR', 'MOTOR_R'],
        ['LEFT_FRONT_RGBLED', 'RGBLED_LF'],
        ['RIGHT_FRONT_RGBLED', 'RGBLED_RF'],
        ['LEFT_REAR_RGBLED', 'RGBLED_LR'],
        ['RIGHT_REAR_RGBLED', 'RGBLED_RR'],
        ['ALL_RGBLED', 'RGBLED_A'],
        ['LEFT_LED', 'LED_L'],
        ['RIGHT_LED', 'LED_R'],
        ['BOTH_LED', 'LED_B'],
        ['LEFT_INFRARED_SENSOR', 'INFRARED_L'],
        ['RIGHT_INFRARED_SENSOR', 'INFRARED_R'],
        ['SENSOR_ULTRASONIC', 'ULTRASONIC'],
        ['SERVO_S1', 'SERVO_S1'],
        ['SERVO_S2', 'SERVO_S2']
    ]
};

confBlocks.environmental = {}
confBlocks.environmental.sensebox = {
    title: 'ENVIRONMENTAL',
    ports: [
        ['I2C', 'I2C']
    ],
    pins: function(a) {
        return [
            ['I2C', 'I2C']
        ];
    },
    sensor: true
};

// all arduino conf blocks are inherited by nano33ble
for (var confBlock in confBlocks) {
    var confObj = confBlocks[confBlock];
    if (confObj.hasOwnProperty('arduino')) {
        confObj['nano33ble'] = confObj['arduino'];
    }
}

function initConfBlocks() {
    for (var confBlock in confBlocks) {
        if (confBlocks.hasOwnProperty(confBlock)) {
            Blockly.Blocks['robConf_' + confBlock] = {
                confBlock: confBlock,
                init: function() {
                    Blockly.Blocks['robConf_generic'].init.call(this, confBlocks[this.confBlock][this.workspace.device]);
                }
            };
        }
    }
};

initConfBlocks();