import { random } from 'lodash'

export function randomElement(array) {
  const rand = random(0, array.length - 1, false)
  return array[rand]
}
