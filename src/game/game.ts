import GameField from "./field/field"
import { Field } from "./field/types"

export default class Game {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    field: Field

    constructor(canvas: HTMLCanvasElement) {
        canvas.width = 1000
        canvas.height = 1000

        this.canvas = canvas

        const ctx = this.canvas.getContext("2d")
        if (ctx == null) {
            throw "ctx is null"
        }
        this.ctx = ctx

        const startFieldPosition = {
            X: 100,
            Y: 100,
        }
        this.field = new GameField(this.ctx, startFieldPosition, 400, 800, 20, 10)
    }

    Start() {
        this.field.StartGame()
        setInterval(() => this.loop(), 1000 / 30)
    }

    loop() {
        this.fillBackground()
        this.field.Draw()
    }

    fillBackground() {
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
