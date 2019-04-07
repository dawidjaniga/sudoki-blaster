import cloneDeep from 'lodash/cloneDeep'
import flatten from 'lodash/flatten'
import Debug from 'debug'
const debug = Debug('sudoku-blaster:game')

export default class Game {
  minFieldValue = 0
  maxFieldValue = 9
  minRowOrColumnNumber = 1
  maxRowOrColumnNumber = 9
  minSquareNumber = 1
  maxSquareNumber = 9
  emptyFields = 0
  
  constructor (rows) {
    this.rows = cloneDeep(rows)
    this.countEmptyFields()
  }

  getRow (rowNumber) {
    return this.rows[this.parseIndex(rowNumber)]
  }

  getColumn (columnNumber) {
    const column = []
    this.rows.forEach(row => {
      column.push(row[this.parseIndex(columnNumber)])
    })

    return column
  }

  getSquare (squareNumber) {
    const mapSquareToStartIndex = {
      1: 0,
      2: 3,
      3: 6,
      4: 27,
      5: 30,
      6: 33,
      7: 54,
      8: 57,
      9: 60
    }
    const square = []
    const flattenRows = flatten(this.rows)
    const nextRowOffset = 6
    let index = mapSquareToStartIndex[this.parseSquareNumber(squareNumber)]

    for(let i=1; i <= 9; i++) {
      square.push(flattenRows[index++])

      if (i % 3 === 0) {
        index += nextRowOffset
      }
    }

    return square
  }

  getSquareWithFields(squareNumber) {
    const mapSquareToStartIndex = {
      1: 0,
      2: 3,
      3: 6,
      4: 27,
      5: 30,
      6: 33,
      7: 54,
      8: 57,
      9: 60
    }
    const mapSquareToStartColumn = {
      1: 1,
      2: 4,
      3: 7,
      4: 1,
      5: 4,
      6: 7,
      7: 1,
      8: 4,
      9: 7
    }
    const mapSquareToStartRow = {
      1: 1,
      2: 1,
      3: 1,
      4: 4,
      5: 4,
      6: 4,
      7: 7,
      8: 7,
      9: 7
    }
  
    const square = []
    const flattenRows = flatten(this.rows)
    const nextRowOffset = 6
    const parsedSquareNumber = this.parseSquareNumber(squareNumber)
    let index = mapSquareToStartIndex[parsedSquareNumber]
    const startColumn = mapSquareToStartColumn[parsedSquareNumber]
    const startRow = mapSquareToStartRow[parsedSquareNumber]
    let column = startColumn
    let row = startRow

    for(let i=1; i <= 9; i++) {
      square.push({
        column: column++,
        row,
        value: flattenRows[index]
      })
      index++

      if (i % 3 === 0) {
        index += nextRowOffset
        row++
        column = startColumn
      }
    }

    return square
  }

  getSquares() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  getRows () {
    return this.rows
  }

  setField (column, row, value) {
    const parsedValue = this.parseValue(value)
    const rowIndex = row - 1
    const columnIndex = column - 1
    const previousValue = this.rows[rowIndex][columnIndex]
    this.rows[rowIndex][columnIndex] = parsedValue

    debug(`parsedValue ${parsedValue}`)

    if (previousValue === 0 && parsedValue === 0) {
    }

    if (previousValue === 0 && parsedValue > 0) {
      this.emptyFields--
    }

    if (previousValue > 0 && parsedValue === 0) {
      this.emptyFields++
    }

    if (previousValue > 0 && parsedValue > 0) {
    }
  }

  parseIndex (humanReadableIndex) {
    const index = humanReadableIndex - 1
    if (humanReadableIndex >= this.minRowOrColumnNumber && humanReadableIndex <= this.maxRowOrColumnNumber) {
      return index
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error(`Index ${humanReadableIndex} out of range. Must be between ${this.minRowOrColumnNumber} and ${this.minRowOrColumnNumber}.`)
    }
  }

  parseValue (value) {
    const parsedValue = parseInt(value, 10)
    if (parsedValue >= this.minFieldValue && parsedValue <= this.maxFieldValue) {
      return parsedValue
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error(`Value ${value} out of range. Must be between ${this.minFieldValue} and ${this.maxFieldValue}.`)
    }
  }

  parseSquareNumber (number) {
    if (number >= this.minSquareNumber && number <= this.maxSquareNumber) {
      return number
    } else {
      // @TODO: Pretty Handle Exceptions
      throw new Error(`Square number ${number} out of range. Must be between ${this.minSquareNumber} and ${this.maxSquareNumber}.`)
    }
  }

  countEmptyFields() {
    let emptyFields = 0
    this.rows.forEach(row => {
      emptyFields += row.filter(field => field === 0).length
    })

    this.emptyFields = emptyFields
  }

  getEmptyFields() {
    return this.emptyFields
  }

  getNumbersAmount() {
    const numbers = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    }

    this.rows.forEach(row => {
      row.forEach(field => {
        if (field > 0) {
          numbers[field]++
        }
      })
    })

    return numbers
  }

  isCorrectValue(column, row, value) {
    const squareNumber = this.getSquareNumberFromColumnAndRow(column, row)
    const isInSquare = this.isNumberInSquare(squareNumber, value)
    const isInColumn = this.isNumberInColumn(column, value)
    const isInRow = this.isNumberInRow(row, value)
    const result = !isInSquare && !isInColumn && !isInRow
    // debug(`isCorrectValue params %O`, {
    //   params: { column, row, value },
    //   calculations: { isInSquare, isInColumn, isInRow},
    //   result
    // })
    return result
  }

  getSquareNumberFromColumnAndRow(column, row) {
    let squareNumber

    if(column <= 3) {
      if(row <= 3) {
        squareNumber = 1
      } else if (row <= 6) {
        squareNumber = 4
      } else if (row <= 9) {
        squareNumber = 7
      }
    } else if (column <= 6) {
      if(row <= 3) {
        squareNumber = 2
      } else if (row <= 6) {
        squareNumber = 5
      } else if (row <= 9) {
        squareNumber = 8
      }
    } else if (column <= 9) {
      if(row <= 3) {
        squareNumber = 3
      } else if (row <= 6) {
        squareNumber = 6
      } else if (row <= 9) {
        squareNumber = 9
      }
    }
    
    return squareNumber
  }

  isNumberInSquare(squareNumber, value) {
    return !!this.getSquare(squareNumber).find(field => field === value)
  }

  isNumberInColumn(columnNumber, value) {
    return !!this.getColumn(columnNumber).find(field => field === value)
  }

  isNumberInRow(rowNumber, value) {
    return !!this.getRow(rowNumber).find(field => field === value)
  }

}
