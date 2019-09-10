export default () => {
  // eslint-disable-next-line no-extend-native
  String.prototype.truncate = function(length, ending) {
    length = length || 100
    ending = ending || '...'
    if (this.length > length) return this.substring(0, length - ending.length) + ending
    else return this
  }

  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function(string) {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
}
