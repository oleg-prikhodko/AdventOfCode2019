import { readInputFile, range } from '../utils'

function exec(program: number[], noun: number, verb: number) {
  const intcodes = program.slice()
  intcodes[1] = noun
  intcodes[2] = verb

  for (let i = 0; i < intcodes.length; i += 4) {
    const [opcode, aIndex, bIndex, resultIndex] = intcodes.slice(i, i + 4)
    switch (opcode) {
      case 1:
        intcodes[resultIndex] = intcodes[aIndex] + intcodes[bIndex]
        break
      case 2:
        intcodes[resultIndex] = intcodes[aIndex] * intcodes[bIndex]
        break
      case 99:
        return intcodes[0]
      default:
        throw new Error('Incorrect input')
    }
  }
  return intcodes[0]
}

function part1(intcodes: number[]) {
  return exec(intcodes, 12, 2)
}

function part2(intcodes: number[]) {
  for (const noun of range(0, 99)) {
    for (const verb of range(0, 99)) {
      const res = exec(intcodes, noun, verb)
      if (res === 19690720) return 100 * noun + verb
    }
  }
}

const intcodes = readInputFile('day-2.txt')
  .split(',')
  .map(Number)

console.log('Part 1:', part1(intcodes))
console.log('Part 2:', part2(intcodes))
