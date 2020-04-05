export interface Operation {
  opcode: number
  operandA: number
  operandB: number
  modeA: number
  modeB: number
  resultIndex: number
}

export class Computer {
  protected program: number[]
  protected counter: number
  protected inputs: number[]
  protected output: number[]

  constructor(program: number[], ...inputs: number[]) {
    this.program = program.slice()
    this.counter = 0
    this.inputs = inputs
    this.output = []
  }

  exec() {
    while (true) {
      const operation = this.getOperation()
      if (operation.opcode === 99) break
      else this.execOperation(operation)
    }
    return this.output
  }

  protected getVal(operandMode: number, operandArg: number) {
    return operandMode === 0 ? this.program[operandArg] : operandArg
  }

  protected getOperation(): Operation {
    const opcode = +this.program[this.counter].toString().slice(-2)
    const [, operandA, operandB, resultIndex] = this.program.slice(
      this.counter,
      this.counter + 4
    )
    const [modeA = 0, modeB = 0] = this.program[this.counter]
      .toString()
      .split('')
      .reverse()
      .slice(2)
      .map(Number)
    return { opcode, operandA, operandB, modeA, modeB, resultIndex }
  }

  protected execOperation(operation: Operation) {
    const { opcode, operandA, operandB, modeA, modeB, resultIndex } = operation
    let step = 4

    switch (opcode) {
      case 1:
        this.program[resultIndex] =
          this.getVal(modeA, operandA) + this.getVal(modeB, operandB)
        break
      case 2:
        this.program[resultIndex] =
          this.getVal(modeA, operandA) * this.getVal(modeB, operandB)
        break
      case 3:
        const input = this.inputs.shift()
        if (input !== undefined) {
          this.program[operandA] = input
          step = 2
        } else {
          throw new Error('No inputs left')
        }
        break
      case 4:
        const result = this.getVal(modeA, operandA)
        this.output.push(result)
        this.counter += 2
        return result
      case 5:
        if (this.getVal(modeA, operandA) !== 0) {
          this.counter = this.getVal(modeB, operandB)
          return
        } else {
          step = 3
        }
        break
      case 6:
        if (this.getVal(modeA, operandA) === 0) {
          this.counter = this.getVal(modeB, operandB)
          return
        } else {
          step = 3
        }
        break
      case 7:
        this.program[resultIndex] =
          this.getVal(modeA, operandA) < this.getVal(modeB, operandB) ? 1 : 0
        break
      case 8:
        this.program[resultIndex] =
          this.getVal(modeA, operandA) === this.getVal(modeB, operandB) ? 1 : 0
        break
      default:
        throw new Error('Incorrect input')
    }

    this.counter += step
  }
}
