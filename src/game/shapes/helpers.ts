
export function rotateMatrix(matrix: number[][], clockwise: boolean) {
    const length = matrix.length
    const depth = Math.floor(length / 2)
    const outerL = length - 1

    for (let outer = 0; outer < depth; outer++) {
        for (let j = outer; j < outerL - outer; j++) {
            const temp = matrix[outer][j]

            if (clockwise) {
                matrix[outer][j] = matrix[outerL - j][outer]
                matrix[outerL - j][outer] = matrix[outerL - outer][outerL - j]
                matrix[outerL - outer][outerL - j] = matrix[j][outerL - outer]
                matrix[j][outerL - outer] = temp
            } else {
                matrix[outer][j] = matrix[j][outerL - outer]
                matrix[j][outerL - outer] = matrix[outerL - outer][outerL-j]
                matrix[outerL - outer][outerL-j] = matrix[outerL-j][outer]
                matrix[outerL-j][outer] = temp
            }
        }
    }
}
