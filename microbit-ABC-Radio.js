input.onButtonPressed(Button.AB, function () {
    radio.sendString("C")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    basic.pause(2000)
    basic.showString("")
})
radio.setGroup(1)