import { readLines } from '../utils'

const orbits = new Map(
  readLines('day-6.txt').map(line => {
    const [, a, b] = /(\w+)\)(\w+)/.exec(line)!
    return [b, a]
  })
)

function getPath(object: string, target = 'COM') {
  let parent = orbits.get(object)
  if (!parent) return []
  const path: string[] = []
  while (parent !== target) {
    path.push(parent)
    parent = orbits.get(parent)!
  }
  path.push(parent)
  return path
}

const totalOrbits = Array.from(orbits.keys())
  .map(object => getPath(object).length)
  .reduce((a, b) => a + b)

console.log('Part 1:', totalOrbits)

function getCommonAncestor(objectA: string, objectB: string) {
  const pathA = getPath(objectA)
  const pathB = getPath(objectB)
  return pathA.find(object => pathB.includes(object))
}

const you = 'YOU'
const santa = 'SAN'
const commonAncestor = getCommonAncestor(you, santa)!
const jumps =
  getPath(you, commonAncestor).length +
  getPath(santa, commonAncestor).length -
  2
console.log('Part 2:', jumps)
