//Meaningless validation. Simply here for more aesthetic structure to the fieldDefinitions. Essentially the validation of Strings or Dates
export const validate = val => {
  return [true, val]
}

export const validateInt = val => {
  if (val === '') return [true, '0']
  else if (parseInt(val) > Number.MAX_SAFE_INTEGER || parseInt(val) < Number.MIN_SAFE_INTEGER) return [false, '-1']
  else if (!isNaN(val)) return [true, parseInt(val).toString()]
  else return [false, '-2']
}

export const validateFloat = val => {
  if (val === '.') return [true, val]
  else if (val === '') return [true, '0']
  else if (val[0] === '0' && val.length === 2) {
    if (val === '0.') return [true, val]
    else return [true, val.substring(1)]
  }
  //move this to protocol and variables as well
  else if (parseInt(val) > Number.MAX_SAFE_INTEGER || parseInt(val) < Number.MIN_SAFE_INTEGER) return [false, '-1']
  else if (!isNaN(val)) return [true, val]
  else return [false, '-1']
}
