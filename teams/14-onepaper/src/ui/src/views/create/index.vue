<template>
  <main-content class="home">
    <navbar>
      <!-- <el-button-group v-if="enterSteps">
        <el-button icon="el-icon-arrow-left" @click="upDownClick('pre')" />
        <el-button @click="upDownClick('down')"><i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group> -->
    </navbar>
    <main-content-body>
      <steps
        v-if="enterSteps"
        ref="steps"
        @cancel="enterSteps = false"
      />
      <create
        v-else
        @create="createClick"
      />
    </main-content-body>
  </main-content>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
import { MainContent, MainContentBody } from '@/components/MainContent'
import Create from './components/Create'
import Steps from './components/Steps'

export default {
  // 首页
  name: 'Home',

  components: {
    Navbar,
    MainContent,
    MainContentBody,
    Create,
    Steps
  },

  props: {},

  data() {
    return {
      enterSteps: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * enter steps
     */
    createClick() {
      this.enterSteps = true
    },

    upDownClick(type) {
      if (type === 'pre') {
        this.$refs.steps.preActive()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .el-button-group {
    margin-top: 25px;
    margin-left: 20px;
  }
  .el-button {
    padding: 8px 15px;
  }
}
</style>
