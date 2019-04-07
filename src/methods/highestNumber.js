
export default class HighestNumberMethod {
  constructor (sudoku) {
    this.sudoku = sudoku
  }

  execute () {
    const numbers = this.sudoku.getNumbersAmount()
    const sortedNumbersKeys = this.sortNumbers(numbers)
    return this.resolveByNumber(sortedNumbersKeys)
  }

  resolveByNumber (sortedNumbersKeys) {
    let result
    sortedNumbersKeys.some(number => {
      result = this.resolveNumber(parseInt(number, 10))
      return result
    })

    return result
  }

  resolveNumber (number) {
    let res
    this.sudoku.getSquares().some(squareNumber => {
      if (!this.sudoku.isNumberInSquare(number)) {
        res = this.findUnambiguousFieldForNumberInSquare(squareNumber, number)
        return res
      }
    })
    return res
  }

  findUnambiguousFieldForNumberInSquare (squareNumber, number) {
    const square = this.sudoku.getSquareWithFields(squareNumber)
    let results = this.getCorrectAnswersForSquare(square, number)

    return results.length === 1 ? results[0] : false
  }

  getCorrectAnswersForSquare (squareFields, value) {
    const correctAnswers = []
    const emptyFields = squareFields.filter(field => field.value === 0)

    emptyFields.forEach(field => {
      const { column, row } = field

      if (this.sudoku.isCorrectValue(column, row, value)) {
        correctAnswers.push({
          column,
          row,
          value
        })
      }
    })

    return correctAnswers
  }

  sortNumbers (numbers) {
    return Object.keys(numbers).sort(function (a, b) { return numbers[b] - numbers[a] })
  }
}
