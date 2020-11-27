export function delay(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export function end(media) {
  return new Promise((resolve) => media.addEventListener('ended', resolve))
}
