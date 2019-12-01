import { readLines } from '../utils'
import { strictEqual } from 'assert'

const sum = (a: number, b: number) => a + b

const calcFuel = (mass: number) => Math.floor(mass / 3) - 2

const masses = readLines('day-1.txt').map(Number)

console.log('Part 1:', masses.map(calcFuel).reduce(sum))

function* calcAdditionalFuel(mass: number) {
  while (mass > 0) {
    mass = calcFuel(mass)
    if (mass <= 0) return
    yield mass
  }
}

function calcFuelRequirements(mass: number) {
  return Array.from(calcAdditionalFuel(mass)).reduce(sum)
}

strictEqual(calcFuelRequirements(14), 2)
strictEqual(calcFuelRequirements(1969), 966)
strictEqual(calcFuelRequirements(100756), 50346)

console.log('Part 2:', masses.map(calcFuelRequirements).reduce(sum))
