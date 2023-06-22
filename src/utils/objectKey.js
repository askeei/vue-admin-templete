export function getKeyArray(Obj) {
  // 오브젝트 안의 오브젝트(+배열), 함수 타입은 무시
  const returnArray = []
  const keys = Object.keys(Obj)

  keys.forEach(function(key) {
    if (typeof (Obj[key]) !== 'object' && typeof (Obj[key]) !== 'function' && Obj[key] !== '') {
      returnArray.push(key)
    }
  })

  return returnArray
}

export function objectToParam(Obj) {
  // 오브젝트 안의 오브젝트(+배열), 함수 타입은 무시
  let returnArray = '?'
  const keys = Object.keys(Obj)
  keys.forEach(function(key) {
    if (Obj[key] && typeof (Obj[key]) !== 'object' && typeof (Obj[key]) !== 'function' && Obj[key] !== '') {
      returnArray += key + '=' + Obj[key] + '&'
    }
  })
  if (returnArray.length > 0) {
    returnArray = returnArray.substr(0, returnArray.length - 1)
  }
  return returnArray
}
