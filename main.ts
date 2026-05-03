let joy_x = 0
let joy_y = 0
let is_active = false
radio.setGroup(1)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
basic.forever(function () {
    // ตรวจสอบการกดปุ่ม B1 (สีแดง) เพื่อเปิดระบบ
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        is_active = true
        basic.showString("ON")
        basic.showIcon(IconNames.Heart)
    }
    basic.pause(100)
    if (is_active) {
        joy_y = pins.analogReadPin(AnalogPin.P1)
        joy_x = pins.analogReadPin(AnalogPin.P2)
        if (joy_y < 400) {
            // ดันขึ้น
            basic.showArrow(ArrowNames.North)
            radio.sendString("F")
        } else if (joy_y > 800) {
            // ดึงลง
            basic.showArrow(ArrowNames.South)
            radio.sendString("B")
        } else if (joy_x < 400) {
            // โยกซ้าย
            basic.showArrow(ArrowNames.West)
            radio.sendString("L")
        } else if (joy_x > 800) {
            // โยกขวา
            basic.showArrow(ArrowNames.East)
            radio.sendString("R")
        } else {
            basic.showIcon(IconNames.Heart)
            radio.sendString("S")
        }
    }
})
