import Debug from 'debug'
const debug = Debug('sudoku-blaster:blaster')

export default class SudokuBlaster {
  constructor (sudoku, methods) {
    this.sudoku = sudoku
    this.methods = methods
  }

  blast (sudoku) {
    while (this.sudoku.getEmptyFields()) {
      let nextValue = this.resolveNextField()
      const { column, row, value } = nextValue

      if (this.sudoku.isCorrectValue(column, row, value)) {
        debug(`correct value: ${value} for ${column}, ${row}\tfields left ${this.sudoku.getEmptyFields()}`)

        this.sudoku.setField(column, row, value)
      }
    }

    return this.sudoku.getRows()
  }

  resolveNextField () {
    const generator = this.createMethodsGenerator()
    let nextValue

    while (!nextValue) {
      nextValue = generator.next().value
      if (nextValue) {
        return nextValue
      }
    }
  }

  * createMethodsGenerator () {
    for (const method of this.methods) {
      yield method.execute()
    }
  }
}
