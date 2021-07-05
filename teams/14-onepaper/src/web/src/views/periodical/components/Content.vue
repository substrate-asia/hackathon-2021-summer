<template>
  <div v-loading="loading" class="p-content">
    <div class="el-dialog__header">
      <span class="el-dialog__title text-one-line">{{ content.title }}</span>
      <button class="el-dialog__headerbtn" @click="closeClick"><i class="el-dialog__close el-icon el-icon-close" /></button>
    </div>
    <div class="p-content__body">
      <el-image
        class="p-content-img"
        :src="getFileUrl(content.fileCover)"
        fit="fill"
      />
      <flexbox class="p-content-des" align="stretch">
        <div class="des-title">作者:</div>
        <flexbox-item class="des-content">{{ content.author }}</flexbox-item>
      </flexbox>
      <flexbox class="p-content-des" align="stretch">
        <div class="des-title">摘要:</div>
        <flexbox-item class="des-content">{{ content.content }}</flexbox-item>
      </flexbox>
      <flexbox class="p-content-des" align="stretch">
        <div class="des-title">年份:</div>
        <flexbox-item class="des-content">{{ content.createYear }}</flexbox-item>
      </flexbox>
      <div class="p-content-all">
        <el-button type="primary" @click="checkClick">查看全文</el-button>
      </div>
      <div class="p-content-handle">
        <!-- <el-button type="primary" icon="one one-icon-collect">收藏</el-button> -->
        <el-button type="primary" icon="one one-icon-download" @click="downClick">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { paperFilesDownAPI } from '@/api'

import { DownloadFileUrl, downloadFileWithBuffer, FileUrl } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  // 论文预览详情
  name: 'PContent',

  components: {},

  props: {
    // eslint-disable-next-line vue/require-default-prop
    content: Object
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters([
      'pair'
    ])
  },

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    closeClick() {
      this.$emit('close')
    },

    checkClick() {
      this.$confirm('查看全文，将扣除您1个币', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          window.open(DownloadFileUrl(this.pair.address, this.content.id))
        })
        .catch(() => {})
    },

    downClick() {
      this.$confirm('下载，将扣除您1个币', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          paperFilesDownAPI(DownloadFileUrl(this.pair.address, this.content.id)).then(res => {
            const blob = new Blob([res.data], {
              type: ''
            })
            downloadFileWithBuffer(blob, `${this.content.title}.pdf`)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        })
        .catch(() => {})
    },

    getFileUrl(url) {
      return FileUrl(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-content {
  background-color: white;

  .el-dialog__title {
    color: $wk-color-primary;
    font-size: 20px;
  }

  &__body {
    padding: 15px;
  }

  &-des {
    .des-title {
      width: 50px;
      flex-shrink: 0;
      color: #777;
    }

    .des-content {
      line-height: 1.5;
    }
  }

  .p-content-des + .p-content-des {
    margin-top: 15px;
  }

  &-all {
    margin-top: 15px;
  }

  &-handle {
    margin-top: 15px;

    ::v-deep .el-button {
      color: $wk-color-primary;
      background-color: #E9EEF9;
      border-color: transparent;
      font-size: 12px;
      height: 28px;
      border-radius: 14px;
      padding: 0 15px;
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }

    .el-button--primary:hover {
      background: $wk-color-primary;
      border-color: $wk-color-primary;
      color: #ffffff;
    }
  }

  .text-one-line {
    width: 90%;
    display: inline-block;
  }

  .p-content-img {
    width: 150px;
    height: 195px;
    margin-bottom: 20px;
  }
}
</style>
