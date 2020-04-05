import { Computer } from './day-5-computer'

export class ExtendedComputer extends Computer {
  private generator: Generator<number, void>

  constructor(program: number[], ...inputs: number[]) {
    super(program, ...inputs)
    this.generator = this.getIterator()
  }

  getNextOutput(input: number) {
    this.inputs.push(input)
    return this.generator.next().value
  }

  private *getIterator() {
    while (true) {
      const operation = this.getOperation()
      if (operation.opcode === 99) break
      const res = this.execOperation(operation)
      if (res !== undefined) yield res
    }
  }
}
