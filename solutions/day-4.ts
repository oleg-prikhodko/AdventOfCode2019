import { strictEqual } from 'assert'

function hasSameDigits(pass: string): boolean {
  if (pass.length < 2) return false
  const [first, second] = pass
  if (first === second) return true
  else return hasSameDigits(pass.slice(1))
}

strictEqual(hasSameDigits('111111'), true)
strictEqual(hasSameDigits('223450'), true)
strictEqual(hasSameDigits('123789'), false)

function hasPairDigits(pass: string, prev = ''): boolean {
  if (pass.length < 2) return false
  const [first, second, next] = pass
  if (first === second && first !== prev && first !== next) return true
  else return hasPairDigits(pass.slice(1), first)
}

strictEqual(hasPairDigits('112233'), true)
strictEqual(hasPairDigits('123444'), false)
strictEqual(hasPairDigits('111122'), true)

function isIncreasing(pass: string): boolean {
  if (pass.length < 2) return true
  const [first, second] = pass
  if (+first > +second) return false
  else return isIncreasing(pass.slice(1))
}

strictEqual(isIncreasing('111111'), true)
strictEqual(isIncreasing('223450'), false)
strictEqual(isIncreasing('123789'), true)

type Condition = (pass: string) => boolean

function* genPassword(conditions: Condition[], start = 254032, end = 789860) {
  let counter = start
  while (counter <= end) {
    const pass = counter.toString()
    if (conditions.every(fn => fn(pass))) yield pass
    counter++
  }
}

console.log(
  'Part 1:',
  Array.from(genPassword([hasSameDigits, isIncreasing])).length
)

console.log(
  'Part 2:',
  Array.from(genPassword([hasPairDigits, isIncreasing])).length
)
