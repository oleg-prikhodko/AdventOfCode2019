import { readInputFile } from '../utils'

function* exec(program: number[], input: number) {
  const intcodes = program.slice()
  let counter = 0
  let relativeBase = 0

  function getIndex(mode: number, arg: number) {
    switch (mode) {
      case 0:
        return arg
      case 2:
        return relativeBase + arg
      default:
        throw new Error('Incorrect mode')
    }
  }

  function getVal(mode: number, arg: number) {
    switch (mode) {
      case 0:
        return intcodes[arg] === undefined ? 0 : intcodes[arg]
      case 1:
        return arg
      case 2:
        return intcodes[relativeBase + arg] === undefined
          ? 0
          : intcodes[relativeBase + arg]
      default:
        throw new Error('Incorrect mode')
    }
  }

  while (true) {
    const operation = intcodes[counter].toString()
    const opcode = +operation.slice(-2)
    const [a, b, c] = intcodes.slice(counter + 1, counter + 4)
    const [aMode = 0, bMode = 0, cMode = 0] = operation
      .slice(0, -2)
      .split('')
      .reverse()
      .map(Number)

    let step = 4

    switch (opcode) {
      case 1:
        intcodes[getIndex(cMode, c)] = getVal(aMode, a) + getVal(bMode, b)
        break
      case 2:
        intcodes[getIndex(cMode, c)] = getVal(aMode, a) * getVal(bMode, b)
        break
      case 3:
        intcodes[getIndex(aMode, a)] = input
        step = 2
        break
      case 4:
        yield getVal(aMode, a)
        step = 2
        break
      case 5:
        if (getVal(aMode, a) !== 0) {
          counter = getVal(bMode, b)
          continue
        } else {
          step = 3
        }
        break
      case 6:
        if (getVal(aMode, a) === 0) {
          counter = getVal(bMode, b)
          continue
        } else {
          step = 3
        }
        break
      case 7:
        intcodes[getIndex(cMode, c)] =
          getVal(aMode, a) < getVal(bMode, b) ? 1 : 0
        break
      case 8:
        intcodes[getIndex(cMode, c)] =
          getVal(aMode, a) === getVal(bMode, b) ? 1 : 0
        break
      case 9:
        relativeBase += getVal(aMode, a)
        step = 2
        break
      case 99:
        return
      default:
        throw new Error('Incorrect input')
    }

    counter += step
  }
}

const intcodes = readInputFile('day-9.txt')
  .split(',')
  .map(Number)

console.log('Part 1:', Array.from(exec(intcodes, 1)))
console.log('Part 2:', Array.from(exec(intcodes, 2)))
