/* global test, expect */
import Game from '../src/game'

const sudoku = new Game([
  [0, 6, 0, 0, 1, 0, 0, 0, 4],
  [0, 8, 0, 0, 9, 0, 2, 0, 0],
  [4, 0, 0, 0, 0, 0, 6, 1, 3],

  [5, 0, 7, 4, 6, 0, 8, 3, 2],
  [0, 2, 4, 0, 3, 5, 0, 9, 6],
  [0, 3, 6, 2, 0, 0, 7, 0, 0],

  [6, 0, 0, 1, 5, 0, 4, 2, 0],
  [0, 4, 5, 0, 0, 0, 3, 7, 0],
  [0, 0, 8, 0, 0, 7, 0, 0, 0]
])

test('get correct row', () => {
  expect(sudoku.getRow(1)).toEqual([0, 6, 0, 0, 1, 0, 0, 0, 4])
  expect(sudoku.getRow(9)).toEqual([0, 0, 8, 0, 0, 7, 0, 0, 0])
  expect(() => sudoku.getRow(10)).toThrow()
  expect(() => sudoku.getRow(0)).toThrow()
})
