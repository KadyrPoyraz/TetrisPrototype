import { GetRandomShape, Shape } from "../shapes/shapes"
import { Position } from "../types/position"
import { Field } from "./types"

type GameState = {
    field: number[][]
    shapesQueue: Shape[]
    activeShape: Shape | undefined
    hold: Shape | undefined
    holdAllowed: boolean
}

const defaultColor = "gray"

const unitToColor = {
    1: "blue",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "red",
    6: "violet",
    7: "azure",
}

export default class GameField implements Field {
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    startPosition: Position

    isRunning: boolean

    lines: number
    rows: number

    speed: number
    timeout: number | undefined

    state: GameState

    constructor(
        ctx: CanvasRenderingContext2D,
        startPosition: Position,
        width: number, height: number,
        lines: number, rows: number,
    ) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.startPosition = startPosition

        this.isRunning = false

        this.lines = lines
        this.rows = rows

        this.speed = 1000

        this.state = this.generateDefaultGameState()
    }

    getShapeSpawnPosition(): Position {
        const center = Math.floor(this.rows / 2 - 2)
        return {
            X: center,
            Y: 0,
        }
    }

    checkLines() {
        const field = this.state.field
        const linesToRemove = []

        for (let i = 0; i < field.length; i++) {
            let removeLine = true
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === 0) {
                    removeLine = false
                    break
                }
            }
            if (removeLine) {
                linesToRemove.push(i)
            }
        }

        for (let i = 0; i < linesToRemove.length; i++) {
            this.state.field.splice(linesToRemove[i], 1)
            const newLine = new Array(this.rows).fill(0)
            this.state.field.unshift(newLine)
        }
    }

    Draw() {
        this.drawBackground()
        this.drawState()
        this.drawGrid()
        this.drawShapesQueue()
        this.drawHold()
    }

    generateDefaultGameState(): GameState {
        const state: GameState = {
            field: [],
            shapesQueue: this.generateShapesQueue(3),
            activeShape: undefined,
            holdAllowed: true,
            hold: undefined,
        }

        for (let i = 0; i < this.lines; i++) {
            state.field[i] = []
            for (let j = 0; j < this.rows; j++) {
                state.field[i][j] = 0
            }
        }

        return state
    }

    generateShapesQueue(numberOfShapes: number): Shape[] {
        const shapes: Shape[] = []

        for (let i = 0; i < numberOfShapes; i++) {
            const shape = GetRandomShape()
            shapes.push(shape)
        }

        return shapes
    }

    drawShape(x: number, y: number, shapeData: number[][]) {
        // TODO: implement and use where possible
    }

    drawState() {
        const gridHeigt = this.height / this.lines
        const gridWidht = this.width / this.rows

        for (let i = 0; i < this.state.field.length; i++) {
            for (let j = 0; j < this.state.field[i].length; j++) {
                const unit = this.state.field[i][j]
                if (unit != 0) {
                    // hate typescript
                    let color = unitToColor[unit as keyof typeof unitToColor];
                    if (color === undefined) {
                        color = defaultColor
                    }
                    this.drawSquare(
                        this.startPosition.X + (j * gridWidht),
                        this.startPosition.Y + (i * gridHeigt),
                        gridWidht, gridHeigt, color,
                    )
                }
            }
        }
    }


    drawBackground() {
        this.drawSquare(this.startPosition.X, this.startPosition.Y, this.width, this.height, "black")
    }

    drawShapesQueue() {
        const sideBarWidth = 200
        const gridSize = sideBarWidth / 6
        const padding = gridSize
        const sideBarHeight = padding * 2 + (6 * gridSize) + (4 * padding)

        const basePoint = {
            X: this.startPosition.X + this.width + padding,
            Y: this.startPosition.Y,
        }

        this.drawSquare(basePoint.X, basePoint.Y, sideBarWidth, sideBarHeight, "black")

        for (let k = 0; k < this.state.shapesQueue.length; k++) {
            const shape = this.state.shapesQueue[k].GetData()
            const topPadding = k * (shape.length * gridSize) + padding

            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    const unit = shape[i][j]

                    if (unit === 0) {
                        continue
                    }

                    let color = unitToColor[unit as keyof typeof unitToColor]

                    this.drawSquare(
                        basePoint.X + padding + (gridSize * j),
                        basePoint.Y + topPadding + (gridSize * i),
                        gridSize, gridSize, color,
                    )
                }
            }
        }
    }

    drawHold() {
        const sideBarWidth = 200
        const gridSize = sideBarWidth / 6
        const padding = gridSize
        const sideBarHeight = padding * 2 + (4 * gridSize)

        const basePoint = {
            X: this.startPosition.X + this.width + padding,
            Y: this.startPosition.Y + (padding * 13),
        }

        this.drawSquare(basePoint.X, basePoint.Y, sideBarWidth, sideBarHeight, "black")

        if (!this.state.hold) {
            return
        }

        const shape = this.state.hold.GetData()

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                const unit = shape[i][j]

                if (unit === 0) {
                    continue
                }

                let color = unitToColor[unit as keyof typeof unitToColor]

                this.drawSquare(
                    basePoint.X + padding + (gridSize * j),
                    basePoint.Y + (padding * 2) + (gridSize * i),
                    gridSize, gridSize, color,
                )
            }
        }
    }

    drawGrid() {
        for (let i = 1; i <= this.rows; i++) {
            this.drawLine(
                { X: this.startPosition.X + this.width / this.rows * i, Y: this.startPosition.Y, },
                { X: this.startPosition.X + this.width / this.rows * i, Y: this.startPosition.Y + this.height, },
                "gray", 1,
            )
        }

        for (let i = 1; i <= this.lines; i++) {
            this.drawLine(
                { X: this.startPosition.X, Y: this.startPosition.Y + this.height / this.lines * i, },
                { X: this.startPosition.X + this.width, Y: this.startPosition.Y + this.height / this.lines * i, },
                "gray", 1,
            )
        }
    }

    getNextShape() {
        const shape = this.state.shapesQueue.shift()
        this.state.shapesQueue.push(GetRandomShape())

        this.state.activeShape = shape
        this.state.activeShape?.SetPosition(this.getShapeSpawnPosition())

        if (this.checkShapeCollision()) {
            clearTimeout(this.timeout)
            alert("Game over!")
        }

        this.addActiveShapeToState()
    }

    holdShape() {
        if (!this.state.holdAllowed) {
            return
        }

        this.removeActiveShapeFromState()

        const tmp = this.state.activeShape
        if (this.state.hold != undefined) {
            this.state.activeShape = this.state.hold
            this.addActiveShapeToState()
        } else {
            this.getNextShape()
        }
        tmp?.SetPosition(this.getShapeSpawnPosition())
        this.state.hold = tmp

        this.state.holdAllowed = false

        console.log(this.state.hold)
    }

    control() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            console.log(key)
            if (key === "ArrowRight" || key === "l") {
                this.moveShapeRight()
            }
            if (key === "ArrowLeft" || key === "h") {
                this.moveShapeLeft()
            }
            if (key === "ArrowDown" || key === "j") {
                this.moveShapeDown()
            }
            if (key === "ArrowUp" || key === "k") {
                this.rotateShape()
            }
            if (key === "c") {
                this.holdShape()
            }
        });
    }

    StartGame() {
        this.isRunning = true

        this.control()
        this.getNextShape()

        this.gameLoop()
    }

    rotateShape() {
        this.removeActiveShapeFromState()
        this.state.activeShape?.Rotate(true)

        const edge = this.checkShapeOutOfBounds()
        if (edge === "right") {
            while (this.checkShapeOutOfBounds()) {
                this.state.activeShape?.MoveLeft()
            }
        } else if (edge === "left") {
            while (this.checkShapeOutOfBounds()) {
                this.state.activeShape?.MoveRight()
            }
        }
        this.addActiveShapeToState()
    }

    moveShapeLeft() {
        this.removeActiveShapeFromState()
        this.state.activeShape?.MoveLeft()
        if (this.checkShapeOutOfBounds() || this.checkShapeCollision()) {
            this.state.activeShape?.MoveRight()
        }
        this.addActiveShapeToState()
    }

    moveShapeRight() {
        this.removeActiveShapeFromState()
        this.state.activeShape?.MoveRight()
        if (this.checkShapeOutOfBounds() || this.checkShapeCollision()) {
            this.state.activeShape?.MoveLeft()
        }
        this.addActiveShapeToState()
    }

    moveShapeDown() {
        let newShape = false
        this.removeActiveShapeFromState()
        this.state.activeShape?.MoveDown()
        const outOfBounds = this.checkShapeOutOfBounds()
        if (outOfBounds === "bottom" || this.checkShapeCollision()) {
            this.state.activeShape?.MoveUp()
            newShape = true
        }
        this.addActiveShapeToState()
        if (newShape) {
            this.state.holdAllowed = true
            this.checkLines()
            this.getNextShape()
        }
    }

    gameLoop() {
        this.moveShapeDown()

        this.timeout = setTimeout(() => this.gameLoop(), this.speed)
    }


    checkShapeOutOfBounds(): string {
        if (!this.state.activeShape) {
            throw "no active shape"
        }

        const shapeData = this.state.activeShape.GetData()
        const shapePosition = this.state.activeShape.GetPosition()

        for (let i = 0; i < shapeData.length; i++) {
            const row = shapeData[i]
            for (let j = 0; j < row.length; j++) {
                const shapeUnit = row[j]
                if (!shapeUnit) {
                    continue
                }
                if (shapePosition.Y + i > this.state.field.length - 1) {
                    return "bottom"
                }
                if (shapePosition.Y + i < 0) {
                    return "top???"
                }
                if (shapePosition.X + j > this.state.field[i].length - 1) {
                    return "right"
                }
                if (shapePosition.X + j < 0) {
                    return "left"
                }
            }
        }

        return ""
    }

    checkShapeCollision(): boolean {
        if (!this.state.activeShape) {
            throw "no active shape"
        }

        const shapeData = this.state.activeShape.GetData()
        const shapePosition = this.state.activeShape.GetPosition()

        for (let i = 0; i < shapeData.length; i++) {
            const row = shapeData[i]
            for (let j = 0; j < row.length; j++) {
                const shapeUnit = row[j]
                if (!shapeUnit) {
                    continue
                }
                const stateUnit = this.state.field[shapePosition.Y + i][shapePosition.X + j]
                if (shapeUnit > 0 && stateUnit > 0) {
                    console.log("shape unit:", shapeUnit, "state unit:", stateUnit, "i:", i, "j:", j)
                    return true
                }
            }
        }

        return false
    }

    removeActiveShapeFromState() {
        if (!this.state.activeShape) {
            throw "no active shape"
        }

        const shapeData = this.state.activeShape.GetData()
        const shapePosition = this.state.activeShape.GetPosition()
        for (let i = 0; i < shapeData.length; i++) {
            const row = shapeData[i]
            for (let j = 0; j < row.length; j++) {
                const shapeUnit = row[j]
                if (!shapeUnit) {
                    continue
                }
                this.state.field[shapePosition.Y + i][shapePosition.X + j] = 0
            }
        }
    }

    addActiveShapeToState() {
        // TODO: add some check for field and shape size

        if (!this.state.activeShape) {
            throw "no active shape"
        }

        const shapeData = this.state.activeShape.GetData()
        const shapePosition = this.state.activeShape.GetPosition()
        for (let i = 0; i < shapeData.length; i++) {
            const row = shapeData[i]
            for (let j = 0; j < row.length; j++) {
                const shapeUnit = row[j]
                if (!shapeUnit) {
                    continue
                }
                this.state.field[shapePosition.Y + i][shapePosition.X + j] = shapeUnit
            }
        }
    }

    changeGameSpeed(speed: number) {
        clearTimeout(this.timeout)
        this.speed = speed
        this.gameLoop()
    }

    // TODO: move to some other place
    drawLine(startPosition: Position, endPosition: Position, color: string, lineWidth: number) {
        this.ctx.beginPath()
        this.ctx.moveTo(startPosition.X, startPosition.Y)
        this.ctx.lineTo(endPosition.X, endPosition.Y)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = lineWidth
        this.ctx.stroke()
    }

    // TODO: move to some other place
    drawSquare(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, width, height)
    }
}
