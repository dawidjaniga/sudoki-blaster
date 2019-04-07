import Debug from 'debug'
const debug = Debug('sudoku-blaster:blaster')

export default class SudokuBlaster {
  constructor (sudoku) {
    this.sudoku = sudoku
  }

  blast (sudoku) {
    let iteration = 1

    // while (iteration <= 30) {
    while (this.sudoku.getEmptyFields()) {
      let nextValue = this.findNextValue()

      const { column, row, value } = nextValue
      if (this.sudoku.isCorrectValue(column, row, value)) {
        debug(`correct value: ${value} for ${column}, ${row}\tfields left ${this.sudoku.getEmptyFields()}`)
        this.sudoku.setField(column, row, value)
      }

      iteration++
    }

    return this.sudoku.getRows()
  }

  findNextValue () {
    return this.resolveByHighestNumber()
  }

  resolveByHighestNumber () {
    const numbers = this.sudoku.getNumbersAmount()
    const sortedNumbersKeys = this.sortNumbers(numbers)
    let result
    sortedNumbersKeys.some(number => {
      number = parseInt(number, 10)
      this.sudoku.getSquares().some(squareNumber => {
        if (!this.sudoku.isNumberInSquare(number)) {
          const res = this.findUnambiguousFieldForNumberInSquare(squareNumber, number)
          if (res) {
            result = res
            return true
          }
        }
      })

      return result
    })
    // debug(numbers)
    // debug(sortedNumbersKeys)

    return result
  }

  findUnambiguousFieldForNumberInSquare (squareNumber, number) {
    const square = this.sudoku.getSquareWithFields(squareNumber)
    let results = []
    square.forEach((field) => {
      if (field.value === 0) {
        if (this.sudoku.isCorrectValue(field.column, field.row, number)) {
          results.push({
            column: field.column,
            row: field.row,
            value: number
          })
        }
      }
    })

    return results.length === 1 ? results[0] : false
  }

  sortNumbers (numbers) {
    return Object.keys(numbers).sort(function (a, b) { return numbers[b] - numbers[a] })
  }
}
