//  iBIT.set_motor(ibitMotorCH.M1, ibitMotor.BACKWARD, 0)
//  iBIT.set_motor(ibitMotorCH.M2, ibitMotor.FORWARD, 0)
radio.onReceivedString(function on_received_string(receivedString: string) {
    if (receivedString == "C") {
        basic.showIcon(IconNames.Heart)
    } else if (receivedString == "W") {
        basic.showIcon(IconNames.No)
    } else if (receivedString == "F") {
        basic.showArrow(ArrowNames.North)
    } else if (receivedString == "B") {
        basic.showArrow(ArrowNames.South)
    } else if (receivedString == "R") {
        basic.showArrow(ArrowNames.East)
    } else if (receivedString == "L") {
        basic.showArrow(ArrowNames.West)
    } else if (receivedString == "S") {
        basic.showIcon(IconNames.SmallSquare)
    }
    
})
let joy_y = 0
let joy_x = 0
let is_active = false
radio.setGroup(1)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
basic.forever(function on_forever() {
    
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        is_active = true
        basic.showIcon(IconNames.Heart)
        radio.sendString("C")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        basic.showIcon(IconNames.No)
        radio.sendString("W")
    }
    
    if (is_active) {
        joy_x = pins.analogReadPin(AnalogReadWritePin.P2)
        joy_y = pins.analogReadPin(AnalogReadWritePin.P1)
        if (joy_y < 400) {
            radio.sendString("F")
            basic.showArrow(ArrowNames.North)
        } else if (joy_y > 600) {
            radio.sendString("B")
            basic.showArrow(ArrowNames.South)
        } else if (joy_x < 400) {
            radio.sendString("R")
            basic.showArrow(ArrowNames.East)
        } else if (joy_x > 600) {
            radio.sendString("L")
            basic.showArrow(ArrowNames.West)
        } else {
            radio.sendString("S")
            basic.showIcon(IconNames.SmallSquare)
        }
        
    }
    
})
