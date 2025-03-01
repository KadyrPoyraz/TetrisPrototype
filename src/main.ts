import Game from "./game/game"

function main() {
    const root = document.getElementById("app")
    if (root === null) {
        throw "root is null"
    }

    const canvas = document.createElement("canvas")

    root.appendChild(canvas)

    const game = new Game(canvas)

    game.Start()
}

main()
