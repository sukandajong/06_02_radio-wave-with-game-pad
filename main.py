is_active = False
radio.set_group(1)
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)

def on_forever():
    global is_active
    # ตรวจสอบการกดปุ่ม B1 (สีแดง) เพื่อเปิดระบบ
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        is_active = True
        basic.show_string("ON")
        basic.show_icon(IconNames.HEART)
    basic.pause(100)
basic.forever(on_forever)

if is_active:
        joy_y = pins.analog_read_pin(AnalogPin.P1)
        joy_x = pins.analog_read_pin(AnalogPin.P2)
        
        if joy_y < 400:          # ดันขึ้น
            basic.show_arrow(ArrowNames.NORTH)
            radio.send_string("F")
        elif joy_y > 800:        # ดึงลง
            basic.show_arrow(ArrowNames.SOUTH)
            radio.send_string("B")
        elif joy_x < 400:        # โยกซ้าย
            basic.show_arrow(ArrowNames.WEST)
            radio.send_string("L")
        elif joy_x > 800:        # โยกขวา
            basic.show_arrow(ArrowNames.EAST)
            radio.send_string("R")
        else:
            basic.show_icon(IconNames.HEART)
            radio.send_string("S")