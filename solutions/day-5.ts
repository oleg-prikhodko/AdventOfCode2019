import { readInputFile } from '../utils'

function getVal(intcodes: number[], mode: number, arg: number) {
  return mode === 0 ? intcodes[arg] : arg
}

function* exec(program: number[], input: number) {
  const intcodes = program.slice()

  let counter = 0
  while (true) {
    const opcode = +intcodes[counter].toString().slice(-2)
    const [, a, b, resultIndex] = intcodes.slice(counter, counter + 4)
    const [aMode = 0, bMode = 0] = intcodes[counter]
      .toString()
      .split('')
      .reverse()
      .slice(2)
      .map(Number)

    let step = 4

    switch (opcode) {
      case 1:
        intcodes[resultIndex] =
          getVal(intcodes, aMode, a) + getVal(intcodes, bMode, b)
        break
      case 2:
        intcodes[resultIndex] =
          getVal(intcodes, aMode, a) * getVal(intcodes, bMode, b)
        break
      case 3:
        intcodes[a] = input
        step = 2
        break
      case 4:
        yield getVal(intcodes, aMode, a)
        step = 2
        break
      case 5:
        if (getVal(intcodes, aMode, a) !== 0) {
          counter = getVal(intcodes, bMode, b)
          continue
        } else {
          step = 3
        }
        break
      case 6:
        if (getVal(intcodes, aMode, a) === 0) {
          counter = getVal(intcodes, bMode, b)
          continue
        } else {
          step = 3
        }
        break
      case 7:
        intcodes[resultIndex] =
          getVal(intcodes, aMode, a) < getVal(intcodes, bMode, b) ? 1 : 0
        break
      case 8:
        intcodes[resultIndex] =
          getVal(intcodes, aMode, a) === getVal(intcodes, bMode, b) ? 1 : 0
        break
      case 99:
        return
      default:
        throw new Error('Incorrect input')
    }

    counter += step
  }
}

const intcodes = readInputFile('day-5.txt')
  .split(',')
  .map(Number)

console.log('Part 1:', Array.from(exec(intcodes, 1)))

const { value: code } = exec(intcodes, 5).next()
console.log('Part 2:', code)
