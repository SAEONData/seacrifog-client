/**
 * Only the last function call is executed within a given time period
 */
let timer
export default (cb, duration) => (...args) => {
  clearTimeout(timer)
  timer = setTimeout(() => cb(...args), duration)
}
