import { readLines, range } from '../utils'

type Direction = 'U' | 'D' | 'L' | 'R'

type Position = {
  x: number
  y: number
}

type Offset = {
  direction: Direction
  units: number
}

function parseOffset(line: string): Offset {
  const match = /^(\w)(\d+)$/.exec(line)
  const [, direction, units] = match!
  return { direction: direction as Direction, units: +units }
}

function getSegmentPoints(start: Position, offset: Offset) {
  const end = Object.assign({}, start)
  let key: keyof Position = 'x'
  switch (offset.direction) {
    case 'U':
      end.y += offset.units
      key = 'y'
      break
    case 'D':
      end.y -= offset.units
      key = 'y'
      break
    case 'L':
      end.x -= offset.units
      break
    case 'R':
      end.x += offset.units
      break
  }
  const points: Position[] = []
  for (const coord of range(start[key], end[key])) {
    const point = Object.assign({}, start)
    point[key] = coord
    points.push(point)
  }
  return points
}

function buildLine(offsets: Offset[]) {
  let line: Position[] = [{ x: 0, y: 0 }]
  for (const offset of offsets) {
    const lastPoint = line[line.length - 1]
    const [, ...points] = getSegmentPoints(lastPoint, offset)
    line = line.concat(points)
  }
  return line
}

function distance(pointA: Position, pointB: Position) {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

function findIntersections(line1: Position[], line2: Position[]) {
  const points1 = new Set(line1.map(p => JSON.stringify(p)))
  const points2 = new Set(line2.map(p => JSON.stringify(p)))

  const intersections: Position[] = []
  for (const point of points1.values()) {
    if (points2.has(point)) {
      const intersection: Position = JSON.parse(point)
      if (intersection.x !== 0 && intersection.y !== 0)
        intersections.push(intersection)
    }
  }

  return intersections
}

function isSamePosition(pointA: Position, pointB: Position) {
  return pointA.x === pointB.x && pointA.y === pointB.y
}

function calcSteps(pos: Position, line1: Position[], line2: Position[]) {
  const steps1 = line1.findIndex(point => isSamePosition(point, pos))
  const steps2 = line2.findIndex(point => isSamePosition(point, pos))
  if (steps1 < 0 || steps2 < 0) throw new Error('Position not found in line')
  return steps1 + steps2
}

function min(a: number, b: number) {
  return Math.min(a, b)
}

const [line1, line2] = readLines('day-3.txt')
  .map(line => line.split(','))
  .map(offsets => offsets.map(parseOffset))
  .map(buildLine)

const intersections = findIntersections(line1, line2)

const closest1 = intersections
  .map(point => distance({ x: 0, y: 0 }, point))
  .reduce(min)

console.log('Part 1:', closest1)

const closest2 = intersections
  .map(point => calcSteps(point, line1, line2))
  .reduce(min)

console.log('Part 2:', closest2)
