let steps = 0
// TODO: Upgrade to use createWall() function
function level2() {
    steps = 0
    man = createMan(0, 4, 600)
    wall = createWall([0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4], [3, 2, 1, 0, 4, 3, 2, 1, 3, 2, 1, 0])

    win = createWin(4, 4)
}
input.onGesture(Gesture.TiltLeft, function () {
    if (man.get(LedSpriteProperty.X) > 0) {
        man.changeXBy(-1)
        steps = steps + 1
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (man.get(LedSpriteProperty.X) < 4) {
        man.changeXBy(1)
        steps = steps + 1
    }
})
input.onButtonPressed(Button.A, function () {
    if (man.get(LedSpriteProperty.Y) > 0) {
        man.changeYBy(-1)
        steps = steps + 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (man.get(LedSpriteProperty.Y) < 4) {
        man.changeYBy(1)
        steps = steps + 1
    }
})
function level1() {
    steps = 0
    man = createMan(4, 0, 600)
    wall = createWall(
        [1, 2, 3, 4, 0, 1, 2, 3],
        [1, 1, 1, 1, 3, 3, 3, 3])
    win = createWin(0, 4)
}
function level3() {
    man = createMan(4, 4, 600)
    win = createWin(2, 2)
    wall = createWall([1, 2, 3, 4, 1, 2, 1, 3], [3, 3, 3, 3, 1, 1, 2, 1])
}

function clearSprites2() {
    man.delete()
    win.delete()
    for (let segment of wall) {
        segment.delete()
    }
    wall = []
}
let wall: game.LedSprite[] = []
let win: game.LedSprite = null
let man: game.LedSprite = null
let currentLevel = 0
currentLevel = 1
// TODO: Press A+B to go back one level
function createMan(x: number, y: number, time: number) {

    man = game.createSprite(x, y)

    man.setBlink(time)

    return man
}
function createWall(X: number[], Y: number[]) {
    let wall2: game.LedSprite[] = []
    if (X.length == Y.length) {
        for (let n: number = 0; n < X.length; n++) {
            wall2.push(game.createSprite(X[n], Y[n]))
        }
    }
    return wall2
}

function createWin(x: number, y: number) {
    let win: game.LedSprite = game.createSprite(x, y)
    win.setBrightness(125.)
    return win
}

// TODO: Finish level 2 and add level 3
function level(level: number) {
    switch (level) {
        case 1:
            level1()
            break
        case 2:
            level2()
            break
        case 3:
            level3()
            break
        case 4:
            basic.showString("Congrats, you finished the game!")
            break

    }
}
level(currentLevel)
basic.forever(function () {
    for (let segment2 of wall) {
        if (man.isTouching(segment2)) {
            game.setScore(steps - 1)
        }
    }
    if (man.isTouching(win)) {
        basic.showString("You Win!")
        game.setScore(32 - steps)
        basic.showNumber(game.score())
        clearSprites2()
        currentLevel = currentLevel + 1
        level(currentLevel)
    }
})

