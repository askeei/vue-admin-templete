/**
 * 커스텀 전역 플러그인 추가(main.js 선언)
 * 2019-09-05 텍스트, 태그 필터 추가
 * 존재하지 않는 key값은 빈값으로 표시됨
 */

import Vue from 'vue'
var filterPlugin = {}
filterPlugin.install = function(Vue) {
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 전역함수 방식
  /**
   * 텍스트 필터링
   * @param {String} key
   * @param {Array} options
   * 옵션은 배열 객체형태로 객체는 key, name, tag 속성을 가진다.
   * @return {String}
   */
  Vue.prototype.$applyTextFilter = (key, options) => {
    const textValue = options.reduce((acc, cur) => {
      acc[cur.key] = cur.name
      return acc
    }, {})
    return textValue[key]
  }

  /**
   * 태그 필터링
   * @param {String} key
   * @param {Array} options
   * 옵션은 배열 객체형태로 객체는 key, name, tag 속성을 가진다.
   * @return {String}
   */
  Vue.prototype.$applyTagFilter = (key, options) => {
    const tagValue = options.reduce((acc, cur) => {
      acc[cur.key] = cur.tag
      return acc
    }, {})
    return tagValue[key]
  }

  /**
   * 백분율 계산기
   * @param {Number} one 값1
   * @param {Number} two 값2
   */
  Vue.prototype.$calcPercentage = (one, two) => {
    try {
      // 타입 체크
      if (typeof (one) === 'string' || typeof (two) === 'string') {
        return 0
      }

      const value1 = Math.abs(one)
      const value2 = Math.abs(two)

      // 0값 처리
      if (value1 === 0 && value2 === 0) {
        return 0
      }

      return Math.round(value1 / (value1 + value2) * 100)

      /*
      if (one >= 0 && two >= 0) {
      // 양수, 양수
        if (one >= two) {
          result1 = 100
          result2 = Math.round(two / one * 100)
          if (!result2) { result2 = 0 }
        } else {
          result2 = 100
          result1 = Math.round(one / two * 100)
          if (!result1) { result1 = 0 }
        }
      } else if (one >= 0 && two < 0) {
      // 양수, 음수
        result1 = 100
        result2 = Math.round(Math.abs(two) / (one - Math.abs(two)) * 100)
      } else if (one < 0 && two >= 0) {
      // 음수, 양수
        result2 = 100
        result1 = Math.round(Math.abs(one) / (two - Math.abs(one)) * 100)
      } else if (one < 0 && two < 0) {
      // 음수, 음수
        if (one >= two) {
          result1 = 100
          result2 = Math.round(Math.abs(one) / Math.abs(two) * 100)
          if (!result2) { result2 = 0 }
        } else {
          result2 = 100
          result1 = Math.round(Math.abs(two) / Math.abs(one) * 100)
          if (!result1) { result1 = 0 }
        }
      } else {
        result1 = 0
        result2 = 0
      }
      */
    } catch (error) {
      console.log(error)
      return 0
    }
  }
}
Vue.use(filterPlugin)
export default filterPlugin
