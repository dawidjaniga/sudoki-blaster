import Debug from 'debug'
const debug = Debug('sudoku-blaster:game')

export default class Game {
  constructor (rows) {
    this.rows = rows
  }

  getRow (row) {
    const rowIndex = row - 1
    debug('getRow rowIndex %d', rowIndex)

    if (rowIndex >= 0 && rowIndex <= 8) {
      return this.rows[rowIndex]
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error('Row out of range')
    }
  }

  getColumn (column) {
    const columnIndex = column - 1
    debug('getColumn columnIndex %d', columnIndex)

    if (columnIndex >= 0 && columnIndex <= 8) {
      const column = []
      this.rows.forEach(row => {
        column.push(row[columnIndex])
      })

      return column
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error('Row out of range')
    }
  }
}
