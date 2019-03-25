import Debug from 'debug'
const debug = Debug('sudoku-blaster')

export default class Game {
  constructor (rows) {
    this.rows = rows
  }

  getRow (row) {
    const index = row - 1
    debug('row index %d', index)

    if (index >= 0 && index <= 8) {
      return this.rows[index]
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error('Row out of range')
    }
  }
}
