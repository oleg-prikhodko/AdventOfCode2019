import { ExtendedComputer as Computer } from './day-7-computer'
import { readInputFile, range, combinations } from '../utils'

const program = readInputFile('day-7.txt').split(',').map(Number)

function calcHighestThrust(
  minPhase: number,
  maxPhase: number,
  calcFn: (phases: number[]) => number
) {
  return Math.max(
    ...combinations(new Set(range(minPhase, maxPhase))).map(calcFn)
  )
}

function calcThrust(phases: number[]) {
  let input = 0
  for (const phase of phases) {
    const computer = new Computer(program, phase, input)
    const [res] = computer.exec()
    input = res
  }
  return input
}

console.log('Part 1', calcHighestThrust(0, 4, calcThrust))

function calcThrustPartB(phases: number[]) {
  let index = 0
  let input = 0

  const comps = phases.map((phase) => new Computer(program, phase))

  while (true) {
    const result = comps[index].getNextOutput(input)
    if (typeof result === 'number') input = result
    else return input
    if (index === 4) index = 0
    else index++
  }
}

console.log('Part 2', calcHighestThrust(5, 9, calcThrustPartB))
