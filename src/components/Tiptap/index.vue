<template>
  <div class="editor" :class="type" :style="setFontSize">
    <editor-menu-bubble v-slot="{ commands, isActive, menu }" :editor="editor" :keep-in-bounds="keepInBounds">
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold">
          <svg-icon icon-class="bold"/>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline">
          <svg-icon icon-class="underline"/>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.paragraph({ textAlign: 'left' }) }"
          @click="commands.paragraph({ textAlign: 'left' })">
          <svg-icon icon-class="align-left-solid"/>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.paragraph({ textAlign: 'center' }) }"
          @click="commands.paragraph({ textAlign: 'center' })">
          <svg-icon icon-class="align-center-solid"/>
        </button>

        <button
          type="button"
          class="menububble__button"
          :class="{ 'is-active': isActive.paragraph({ textAlign: 'right' }) }"
          @click="commands.paragraph({ textAlign: 'right' })">
          <svg-icon icon-class="align-right-solid"/>
        </button>

        <button
          type="button"
          class="menububble__button bubble_red"
          :class="{ 'is-active': isActive.textcolor({ color: 'red' }) }"
          @click="applyTextColor(commands, 'red')">
          <svg-icon icon-class="droplet"/>
        </button>

        <button
          type="button"
          class="menububble__button bubble_green"
          :class="{ 'is-active': isActive.textcolor({ color: 'green' }) }"
          @click="applyTextColor(commands, 'green')">
          <svg-icon icon-class="droplet"/>
        </button>

        <button
          type="button"
          class="menububble__button bubble_blue"
          :class="{ 'is-active': isActive.textcolor({ color: 'blue' }) }"
          @click="applyTextColor(commands, 'blue')">
          <svg-icon icon-class="droplet"/>
        </button>

        <button
          type="button"
          class="menububble__button bubble_gray"
          :class="{ 'is-active': isActive.textcolor({ color: 'gray' }) }"
          @click="applyTextColor(commands, 'gray')">
          <svg-icon icon-class="droplet"/>
        </button>

      </div>
    </editor-menu-bubble>

    <editor-content ref="editor_doc" class="editor__content" :editor="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  Bold,
  Underline,
  Placeholder
} from 'tiptap-extensions'
import Paragraph from './Paragraph'
import ColorPicker from './ColorPicker'
import ImageUpload from './ImageUpload'

let app = null

export default {
  name: 'TipTap',
  directives: {

  },
  components: {
    EditorContent,
    EditorMenuBubble
  },
  filters: {

  },
  props: {
    type: {
      type: String,
      default: 'contents'
    },
    placeholder: {
      type: String,
      default: ''
    },
    resetContents: {
      type: Boolean,
      default: false
    },
    initContents: {
      type: String,
      default: ''
    },
    getContents: { // 입력 데이터 추출
      type: Function,
      default: function(data) {
        return
      }
    },
    uploadFile: {
      type: Function,
      default: function(file) {
        return
      }
    }
  },
  data() {
    return {
      app,
      setFontSize: 'font-size: 20px;',
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Bold(),
          new Underline(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: '',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          }),
          new ImageUpload(null, null, this.uploadSet),
          // Custom Extention
          new ColorPicker(),
          new Paragraph()
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          this.getContents(getHTML())
        }
      }),
      red: {
        r: 241,
        g: 105,
        b: 105,
        a: 1
      },
      blue: {
        r: 98,
        g: 157,
        b: 201,
        a: 1
      },
      green: {
        r: 24,
        g: 185,
        b: 124,
        a: 1
      },
      gray: {
        r: 206,
        g: 212,
        b: 218,
        a: 1
      }
    }
  },
  computed: {

  },
  watch: {
    placeholder() {
      this.setPlaceholder()
    },
    resetContents() {
      if (this.initContents) {
        this.editor.setContent(this.initContents)
      } else {
        this.editor.clearContent()
      }
    }
  },
  mounted() {
    app = this
    window.addEventListener('resize', app.handleReize)
    this.handleReize()
    this.setPlaceholder()
    this.editor.setContent(this.initContents)
  },
  created() {

  },
  beforeDestroy() {
    window.removeEventListener('resize', app.handleReize)
    this.editor.destroy()
  },
  methods: {
    handleReize() {
      this.setFontSize = 'font-size: ' + this.$el.clientWidth / 10 + 'px;'
    },
    setPlaceholder() {
      this.editor.extensions.options.placeholder.emptyNodeText = this.placeholder
    },
    applyTextColor(commands, type) {
      let r; let g; let b; let a = null
      switch (type) {
        case 'red':
          r = this.red.r
          g = this.red.g
          b = this.red.b
          a = this.red.a
          commands.textcolor({ color: `rgba(${r},${g},${b},${a})` })
          break
        case 'green':
          r = this.green.r
          g = this.green.g
          b = this.green.b
          a = this.green.a
          commands.textcolor({ color: `rgba(${r},${g},${b},${a})` })
          break
        case 'blue':
          r = this.blue.r
          g = this.blue.g
          b = this.blue.b
          a = this.blue.a
          commands.textcolor({ color: `rgba(${r},${g},${b},${a})` })
          break
        case 'gray':
          r = this.gray.r
          g = this.gray.g
          b = this.gray.b
          a = this.gray.a
          commands.textcolor({ color: `rgba(${r},${g},${b},${a})` })
          break
      }

      this.showTextColorPicker = false
    },
    async uploadSet(file) {
      const formData = new FormData()
      formData.append('file', file)

      const url = await this.uploadFile(formData)
      console.log('url')

      // 표시할 이미지
      if (url) {
        return url
      } else {
        return
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.editor {
  width: 100%;
  .menububble__button {
    font-size: 16px;
  }
  .bubble_red {
    color: rgba(241, 105, 105, 1);
  }
  .bubble_blue {
    color: rgba(98, 157, 201, 1);
  }
  .bubble_green {
    color: rgba(24, 185, 124, 1);
  }
  .bubble_gray {
    color: rgba(206, 212, 218, 1);
  }
}
.contents { // 내용
  border: 1px solid #DCDFE6;
  margin: 0 0 15px 0;
  img {
    width: 100% !important;
  }
  p {
    padding: 10px;
    font-size: 0.3em;
    line-height: 1em;
    margin: 0;
  }
}
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #fff;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(#fff, 0.1);
    }

    &.is-active {
      background-color: rgba(#fff, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #fff;
  }
}
.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
