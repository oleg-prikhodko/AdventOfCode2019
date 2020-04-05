import { readProgram } from '../utils'
import { Computer } from './day-5-computer'

const program = readProgram('day-5.txt')

const computer1 = new Computer(program, 1)
console.log('Part 1', computer1.exec())

const computer2 = new Computer(program, 5)
console.log('Part 2', computer2.exec())
