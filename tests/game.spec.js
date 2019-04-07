/* global test, expect */
import Game from '../src/game'

const input = [
  [0, 6, 0, 0, 1, 0, 0, 0, 4],
  [0, 8, 0, 0, 9, 0, 2, 0, 0],
  [4, 0, 0, 0, 0, 0, 6, 1, 3],

  [5, 0, 7, 4, 6, 0, 8, 3, 2],
  [0, 2, 4, 0, 3, 5, 0, 9, 6],
  [0, 3, 6, 2, 0, 0, 7, 0, 0],

  [6, 0, 0, 1, 5, 0, 4, 2, 0],
  [0, 4, 5, 0, 0, 0, 3, 7, 0],
  [0, 0, 8, 0, 0, 7, 0, 0, 0]
]

test('get rows', () => {
  const sudoku = new Game(input)
  expect(sudoku.getRows()).toEqual([
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
})

test('constructor should deep clone input rows', () => {
  const sudoku = new Game(input)
  expect(sudoku.getRows()).not.toBe(input)
})

test('empty fields should be counted in constructor', () => {
  const sudoku = new Game(input)
  expect(sudoku.getEmptyFields()).toBe(43)
})

test('count and get empty fields', () => {
  const sudoku = new Game(input)
  sudoku.setField(1, 1, 9)
  sudoku.countEmptyFields()
  expect(sudoku.getEmptyFields()).toBe(42)
})

test('count numbers amount', () => {
  const sudoku = new Game(input)
  expect(sudoku.getNumbersAmount()).toEqual({
    1: 3,
    2: 5,
    3: 5,
    4: 6,
    5: 4,
    6: 6,
    7: 4,
    8: 3,
    9: 2
  })
})

test('parse index', () => {
  const sudoku = new Game(input)
  expect(sudoku.parseIndex(1)).toBe(0)
  expect(sudoku.parseIndex(9)).toBe(8)
  expect(() => sudoku.parseIndex(10)).toThrow()
  expect(() => sudoku.parseIndex(0)).toThrow()
})

test('parse value', () => {
  const sudoku = new Game(input)
  expect(sudoku.parseValue(1)).toBe(1)
  expect(sudoku.parseValue(9)).toBe(9)
  expect(sudoku.parseValue('5')).toBe(5)
  expect(sudoku.parseValue('5a')).toBe(5)
  expect(() => sudoku.parseValue(10)).toThrow()
  expect(() => sudoku.parseValue(-1)).toThrow()
})

test('is number in column', () => {
  const sudoku = new Game(input)
  expect(sudoku.isNumberInColumn(5, 9)).toBe(true)
  expect(sudoku.isNumberInColumn(2, 1)).toBe(false)
})

test('is number in row', () => {
  const sudoku = new Game(input)
  expect(sudoku.isNumberInRow(4, 8)).toBe(true)
  expect(sudoku.isNumberInRow(1, 5)).toBe(false)
})

test('is number in square', () => {
  const sudoku = new Game(input)
  expect(sudoku.isNumberInSquare(1, 8)).toBe(true)
  expect(sudoku.isNumberInSquare(1, 4)).toBe(true)
  expect(sudoku.isNumberInSquare(2, 1)).toBe(true)
  expect(sudoku.isNumberInSquare(3, 4)).toBe(true)
  expect(sudoku.isNumberInSquare(4, 7)).toBe(true)
  expect(sudoku.isNumberInSquare(5, 5)).toBe(true)
  expect(sudoku.isNumberInSquare(6, 3)).toBe(true)
  expect(sudoku.isNumberInSquare(7, 8)).toBe(true)
  expect(sudoku.isNumberInSquare(8, 7)).toBe(true)
  expect(sudoku.isNumberInSquare(9, 4)).toBe(true)
  expect(sudoku.isNumberInSquare(3, 5)).toBe(false)
  expect(sudoku.isNumberInSquare(5, 9)).toBe(false)
  expect(sudoku.isNumberInSquare(9, 6)).toBe(false)
})

test('get square number by column and row', () => {
  const sudoku = new Game(input)
  expect(sudoku.getSquareNumberFromColumnAndRow(1, 2)).toBe(1)
  expect(sudoku.getSquareNumberFromColumnAndRow(5, 2)).toBe(2)
  expect(sudoku.getSquareNumberFromColumnAndRow(9, 3)).toBe(3)
  expect(sudoku.getSquareNumberFromColumnAndRow(3, 5)).toBe(4)
  expect(sudoku.getSquareNumberFromColumnAndRow(5, 5)).toBe(5)
  expect(sudoku.getSquareNumberFromColumnAndRow(7, 4)).toBe(6)
  expect(sudoku.getSquareNumberFromColumnAndRow(1, 8)).toBe(7)
  expect(sudoku.getSquareNumberFromColumnAndRow(6, 7)).toBe(8)
  expect(sudoku.getSquareNumberFromColumnAndRow(9, 9)).toBe(9)
})

test('check if number can be set to specific field', () => {
  const sudoku = new Game(input)
  expect(sudoku.isCorrectValue(8, 9, 6)).toBe(true)
  expect(sudoku.isCorrectValue(4, 5, 7)).toBe(true)
  expect(sudoku.isCorrectValue(4, 5, 8)).toBe(true)
  expect(sudoku.isCorrectValue(9, 2, 5)).toBe(true)
  expect(sudoku.isCorrectValue(1, 1, 6)).toBe(false)
  expect(sudoku.isCorrectValue(5, 8, 3)).toBe(false)
  expect(sudoku.isCorrectValue(8, 6, 2)).toBe(false)
})

test('get row', () => {
  const sudoku = new Game(input)
  expect(sudoku.getRow(1)).toEqual([0, 6, 0, 0, 1, 0, 0, 0, 4])
  expect(sudoku.getRow(9)).toEqual([0, 0, 8, 0, 0, 7, 0, 0, 0])
  expect(() => sudoku.getRow(10)).toThrow()
  expect(() => sudoku.getRow(0)).toThrow()
})

test('get column', () => {
  const sudoku = new Game(input)
  expect(sudoku.getColumn(1)).toEqual([0, 0, 4, 5, 0, 0, 6, 0, 0])
  expect(sudoku.getColumn(9)).toEqual([4, 0, 3, 2, 6, 0, 0, 0, 0])
  expect(() => sudoku.getColumn(10)).toThrow()
  expect(() => sudoku.getColumn(0)).toThrow()
})

test('get square', () => {
  const sudoku = new Game(input)
  expect(sudoku.getSquare(1)).toEqual([0, 6, 0, 0, 8, 0, 4, 0, 0])
  expect(sudoku.getSquare(2)).toEqual([0, 1, 0, 0, 9, 0, 0, 0, 0])
  expect(sudoku.getSquare(3)).toEqual([0, 0, 4, 2, 0, 0, 6, 1, 3])
  expect(sudoku.getSquare(4)).toEqual([5, 0, 7, 0, 2, 4, 0, 3, 6])
  expect(sudoku.getSquare(5)).toEqual([4, 6, 0, 0, 3, 5, 2, 0, 0])
  expect(sudoku.getSquare(6)).toEqual([8, 3, 2, 0, 9, 6, 7, 0, 0])
  expect(sudoku.getSquare(7)).toEqual([6, 0, 0, 0, 4, 5, 0, 0, 8])
  expect(sudoku.getSquare(8)).toEqual([1, 5, 0, 0, 0, 0, 0, 0, 7])
  expect(sudoku.getSquare(9)).toEqual([4, 2, 0, 3, 7, 0, 0, 0, 0])
  expect(() => sudoku.getSquare(10)).toThrow()
  expect(() => sudoku.getSquare(0)).toThrow()
})

test('get square with object fields', () => {
  const sudoku = new Game(input)
  expect(sudoku.getSquareWithFields(1)).toEqual([
    {
      column: 1,
      row: 1,
      value: 0
    },
    {
      column: 2,
      row: 1,
      value: 6
    },
    {
      column: 3,
      row: 1,
      value: 0
    },
    {
      column: 1,
      row: 2,
      value: 0
    },
    {
      column: 2,
      row: 2,
      value: 8
    },
    {
      column: 3,
      row: 2,
      value: 0
    },
    {
      column: 1,
      row: 3,
      value: 4
    },
    {
      column: 2,
      row: 3,
      value: 0
    },
    {
      column: 3,
      row: 3,
      value: 0
    }
  ])
  expect(sudoku.getSquareWithFields(2)).toEqual([
    {
      column: 4,
      row: 1,
      value: 0
    },
    {
      column: 5,
      row: 1,
      value: 1
    },
    {
      column: 6,
      row: 1,
      value: 0
    },
    {
      column: 4,
      row: 2,
      value: 0
    },
    {
      column: 5,
      row: 2,
      value: 9
    },
    {
      column: 6,
      row: 2,
      value: 0
    },
    {
      column: 4,
      row: 3,
      value: 0
    },
    {
      column: 5,
      row: 3,
      value: 0
    },
    {
      column: 6,
      row: 3,
      value: 0
    }
  ])
  expect(sudoku.getSquareWithFields(5)).toEqual([
    {
      column: 4,
      row: 4,
      value: 4
    },
    {
      column: 5,
      row: 4,
      value: 6
    },
    {
      column: 6,
      row: 4,
      value: 0
    },
    {
      column: 4,
      row: 5,
      value: 0
    },
    {
      column: 5,
      row: 5,
      value: 3
    },
    {
      column: 6,
      row: 5,
      value: 5
    },
    {
      column: 4,
      row: 6,
      value: 2
    },
    {
      column: 5,
      row: 6,
      value: 0
    },
    {
      column: 6,
      row: 6,
      value: 0
    }
  ])
  expect(() => sudoku.getSquare(10)).toThrow()
  expect(() => sudoku.getSquare(0)).toThrow()
})

test('set field', () => {
  const sudoku = new Game(input)
  sudoku.setField(1, 1, 9)
  sudoku.setField(4, 7, 8)
  sudoku.setField(9, 4, 7)
  expect(sudoku.getRows()).toEqual([
    [9, 6, 0, 0, 1, 0, 0, 0, 4],
    [0, 8, 0, 0, 9, 0, 2, 0, 0],
    [4, 0, 0, 0, 0, 0, 6, 1, 3],

    [5, 0, 7, 4, 6, 0, 8, 3, 7],
    [0, 2, 4, 0, 3, 5, 0, 9, 6],
    [0, 3, 6, 2, 0, 0, 7, 0, 0],

    [6, 0, 0, 8, 5, 0, 4, 2, 0],
    [0, 4, 5, 0, 0, 0, 3, 7, 0],
    [0, 0, 8, 0, 0, 7, 0, 0, 0]
  ])

  expect(() => sudoku.setField(10, 0, 6)).toThrow()
  expect(() => sudoku.setField(0, 10, 5)).toThrow()
  expect(() => sudoku.setField(0, 10, 10)).toThrow()
  expect(() => sudoku.setField(0, 10, -1)).toThrow()
})

test('setField with value greater than 0 decrement empty fields when previous value was 0', () => {
  const sudoku = new Game(input)
  const beforeEmptyFields = sudoku.getEmptyFields()
  sudoku.setField(1, 1, 9)
  const afterEmptyFields = sudoku.getEmptyFields()
  expect(afterEmptyFields).toBe(beforeEmptyFields - 1)
})

test('setField with value greater than 0 doesn\'t change empty fields when previous field was filled', () => {
  const sudoku = new Game(input)
  const beforeEmptyFields = sudoku.getEmptyFields()
  sudoku.setField(2, 1, 2)
  const afterEmptyFields = sudoku.getEmptyFields()
  expect(afterEmptyFields).toBe(beforeEmptyFields)
})

test('setField with value equals 0 increment empty fields when previous field was filled', () => {
  const sudoku = new Game(input)
  const beforeEmptyFields = sudoku.getEmptyFields() // 42
  sudoku.setField(2, 1, 0)
  const afterEmptyFields = sudoku.getEmptyFields() // 43
  expect(afterEmptyFields).toBe(beforeEmptyFields + 1)
})

test('setField with value equals 0 doesn\'t change empty fields when previous field was 0', () => {
  const sudoku = new Game(input)
  const beforeEmptyFields = sudoku.getEmptyFields()
  sudoku.setField(3, 1, 0)
  const afterEmptyFields = sudoku.getEmptyFields()
  expect(afterEmptyFields).toBe(beforeEmptyFields)
})
