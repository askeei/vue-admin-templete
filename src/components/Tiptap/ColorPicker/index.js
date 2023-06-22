/* eslint-disable class-methods-use-this */
import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class TextColor extends Mark {
  get name() {
    return 'textcolor'
  }

  get defaultOptions() {
    return {
      color: [
        'rgba(241,105,105,1)',
        'rgba(98,157,201,1)',
        'rgba(24,185,124,1)',
        'rgba(206,212,218,1)'
      ]
    }
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'rgba(0,0,0,1)'
        }
      },
      parseDOM: this.options.color.map(color => ({
        tag: `span[style="color:${color}"]`,
        attrs: { color }
      })),
      toDOM:
        node => {
          return ['span', {
            style: `color:${node.attrs.color}`
          }, 0]
        }
    }
  }

  commands({ type }) {
    return (attrs) => toggleMark(type, attrs)
  }
}
