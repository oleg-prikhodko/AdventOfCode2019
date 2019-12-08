import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export function readInputFile(inputFileName: string) {
  const fullPath = join(__dirname, 'inputs', inputFileName)
  if (existsSync(fullPath)) {
    return readFileSync(fullPath, 'utf8').trim()
  } else {
    throw new Error('File do not exist')
  }
}

export function readLines(inputFileName: string) {
  return readInputFile(inputFileName).split('\n')
}

export function* range(start: number, limit: number) {
  let count = start
  while (count !== limit) {
    yield count < limit ? count++ : count--
  }
  yield count
}

export function make2d<T>(arr: T[], width: number) {
  return arr.reduce((acc, val, index) => {
    const idx = Math.floor(index / width)
    if (!acc[idx]) acc[idx] = [val]
    else acc[idx].push(val)
    return acc
  }, Array<Array<T>>())
}