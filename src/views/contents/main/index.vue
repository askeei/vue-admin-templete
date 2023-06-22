<template>
  <main>
    <header>
      <sticky :class-name="'sub-navbar'">
        <el-row type="flex" align="middle" justify="space-between">
          <p>{{ $t('안녕하세요?') }}</p>
        </el-row>
      </sticky>
    </header>

    <article class="main-wrapper" style="padding: 20px">
      <section>
        1
      </section>
    </article>
  </main>
</template>

<script>
// import i18n from '@/lang'
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'

export default {
  name: 'Dashboard',
  directives: { waves },
  components: {
    Sticky
  },
  filters: {

  },
  data() {
    return {

    }
  },
  mounted() {
  },
  created() {
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
