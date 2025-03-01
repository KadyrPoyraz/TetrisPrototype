import { Position } from "../types/position"
import { rotateMatrix } from "./helpers"

export interface Shape {
    Rotate(clockwise: boolean): void
    SetPosition(position: Position): void
    GetPosition(): Position
    MoveDown(): void
    MoveUp(): void
    MoveLeft(): void
    MoveRight(): void
    GetData(): number[][]
    GetPosition(): Position
}

class BaseShape {
    position: Position

    constructor() {
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }
}

export class BlueRickyShape extends BaseShape {
    shapeData: number[][]

    constructor() {
        super()
        this.shapeData = [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class OrangeRickyShape extends BaseShape {
    shapeData: number[][]

    constructor() {
        super()
        this.shapeData = [
            [0, 0, 2],
            [2, 2, 2],
            [0, 0, 0],
        ]
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class SmashboyShape implements Shape {
    shapeData: number[][]
    position: Position

    constructor() {
        this.shapeData = [
            [0, 3, 3, 0],
            [0, 3, 3, 0],
            [0, 0, 0, 0],
        ]
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class PhodeIslandZShape implements Shape {
    shapeData: number[][]
    position: Position

    constructor() {
        this.shapeData = [
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0],
        ]
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class ClevelandZShape implements Shape {
    shapeData: number[][]
    position: Position

    constructor() {
        this.shapeData = [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ]
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class TeeweeShape implements Shape {
    shapeData: number[][]
    position: Position

    constructor() {
        this.shapeData = [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ]
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class HeroShape implements Shape {
    shapeData: number[][]
    position: Position

    constructor() {
        this.shapeData = [
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        this.position = { X: 0, Y: 0 }
    }

    MoveLeft(): void {
        this.position.X -= 1
    }

    MoveRight(): void {
        this.position.X += 1
    }

    MoveUp(): void {
        this.position.Y -= 1
    }

    MoveDown(): void {
        this.position.Y += 1
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

export class ZigShape extends BaseShape {
    shapeData: number[][]

    constructor() {
        super()
        this.shapeData = [
            [8, 0, 8, 8, 8],
            [8, 0, 8, 0, 0],
            [8, 8, 8, 8, 8],
            [0, 0, 8, 0, 8],
            [8, 8, 8, 0, 8],
        ]
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

// const unitToColor = {
//     1: "blue",
//     2: "orange",
//     3: "yellow",
//     4: "green",
//     5: "red",
//     6: "violet",
//     7: "azure",
// }

export class AbobaShape extends BaseShape {
    shapeData: number[][]

    constructor() {
        super()
        this.shapeData = [
            // [1, 1, 1, 0, 1],
            // [0, 0, 1, 0, 1],
            // [1, 1, 1, 1, 1],
            // [1, 0, 1, 0, 0],
            // [1, 0, 1, 1, 1],
            // [0, 1, 0],
            // [1, 1, 1],
            // [0, 0, 0],
        ]
    }

    SetPosition(position: Position): void {
        this.position = position
    }

    GetPosition(): Position {
        return this.position
    }

    GetData(): number[][] {
        return this.shapeData
    }

    Rotate(clockwise: boolean) {
        rotateMatrix(this.shapeData, clockwise)
    }
}

const shapes = [
    HeroShape,
    BlueRickyShape,
    OrangeRickyShape,
    SmashboyShape,
    PhodeIslandZShape,
    TeeweeShape,
    ClevelandZShape,
]

export function GetRandomShape(): Shape {
    const index = Math.floor(Math.random() * shapes.length)
    return new shapes[index]()
    // return new HeroShape()
    // return new AbobaShape()
}


