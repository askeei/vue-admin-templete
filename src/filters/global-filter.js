// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 전역필터 방식

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toPhoneNumberFilter(num) {
  if (num === null || typeof (num) === 'undefined') {
    return num
  }
  const number = num
  let phone = ''

  // 서울 지역번호(02)가 들어오는 경우
  if (number.substring(0, 2).indexOf('02') === 0) {
    if (number.length < 3) {
      return number
    } else if (number.length < 6) {
      phone += number.substr(0, 2)
      phone += '-'
      phone += number.substr(2)
    } else if (number.length < 10) {
      phone += number.substr(0, 2)
      phone += '-'
      phone += number.substr(2, 3)
      phone += '-'
      phone += number.substr(5)
    } else {
      phone += number.substr(0, 2)
      phone += '-'
      phone += number.substr(2, 4)
      phone += '-'
      phone += number.substr(6)
    }

  // 서울 지역번호(02)가 아닌경우
  } else {
    if (number.length < 4) {
      return number
    } else if (number.length < 7) {
      phone += number.substr(0, 3)
      phone += '-'
      phone += number.substr(3)
    } else if (number.length < 11) {
      phone += number.substr(0, 3)
      phone += '-'
      phone += number.substr(3, 3)
      phone += '-'
      phone += number.substr(6)
    } else {
      phone += number.substr(0, 3)
      phone += '-'
      phone += number.substr(3, 4)
      phone += '-'
      phone += number.substr(7)
    }
  }

  return phone
}
