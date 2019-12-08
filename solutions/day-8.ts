import { readInputFile, range, make2d } from '../utils'

const width = 25
const height = 6
const pixelsInLayer = width * height
const input = readInputFile('day-8.txt')
  .split('')
  .map(Number)
const layers = make2d(input, pixelsInLayer)

const zerosByLayer = layers.map(layer =>
  layer.reduce((acc, pixel) => (pixel === 0 ? acc + 1 : acc), 0)
)

const minZerosLayer = zerosByLayer.reduce((acc, zeros, index) => {
  return zeros < zerosByLayer[acc] ? index : acc
}, 0)

let ones = 0
let twos = 0

for (const pixel of layers[minZerosLayer]) {
  if (pixel === 1) ones++
  else if (pixel === 2) twos++
}

console.log('Part 1:', ones * twos)

const image: string[] = []
for (const pixel of range(0, pixelsInLayer - 1)) {
  for (const layer of layers) {
    const color = layer[pixel]
    if (color !== 2) {
      image.push(color ? '#' : ' ')
      break
    }
  }
}

console.log('Part 2:')
make2d(image, width).forEach(line => console.log(line.join(' ')))
