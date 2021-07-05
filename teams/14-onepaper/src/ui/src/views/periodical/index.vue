<template>
  <main-content class="periodical">
    <navbar />
    <main-content-body>
      <flexbox class="container">
        <div class="left-search">
          <div class="title">首字母</div>
          <word-search @change="wordChange" />
        </div>
        <div class="right-content">
          <div class="title">中文期刊 <el-button type="text" icon="el-icon-upload" @click="uploadClick">上传</el-button></div>
          <el-tabs v-model="categoryId" @tab-click="typeChange">
            <el-tab-pane
              v-for="(item , index) in allCategoryList"
              :key="index"
              :label="item.categoryTitle"
              :name="(item.id).toString()"
            />
          </el-tabs>
          <div class="periodical-num">找到约{{ total }}条相关记录</div>
          <div
            v-loading="loading"
            class="periodical__body"
            :style="{ height: `${contentH}px` }"
          >
            <flexbox
              v-for="(item , index) in list"
              :key="index"
              align="stretch"
              class="p-item"
              @click.native="itemClick(item)"
            >
              <el-image
                class="p-item__img"
                :src="getFileUrl(item.fileCover)"
                fit="fill"
              />
              <div class="p-item__content">
                <div class="p-item__title text-one-line">{{ item.title }}</div>
                <div class="p-item__des text-one-line">{{ item.author }}</div>
                <div class="p-item__des text-one-line">{{ item.content }}</div>
                <div class="p-item__des text-one-line">{{ item.createYear }}</div>
              </div>
            </flexbox>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="currentPage"
            @current-change="currentPageChange"
          />
        </div>
        <p-content
          v-if="contentVisible"
          :content="contentObj"
          @close="contentVisible = false"
        />
        <p-create
          v-if="createVisible"
          :category-list="categoryList"
          @close="createVisible = false"
          @success="refreshList"
        />
      </flexbox>
    </main-content-body>

  </main-content>
</template>

<script>
import { paperCategoryIndexAPI, paperFilesListAPI } from '@/api'

import Navbar from '@/layout/components/Navbar'
import { MainContent, MainContentBody } from '@/components/MainContent'
import WordSearch from './components/WordSearch'
import PContent from './components/Content'
import PCreate from './components/Create'

import { mapGetters } from 'vuex'
import { FileUrl } from '@/utils'

export default {
  // 期刊
  name: 'Periodical',

  components: {
    Navbar,
    MainContent,
    MainContentBody,
    WordSearch,
    PContent,
    PCreate
  },

  props: {},

  data() {
    return {
      loading: false,
      contentH: document.documentElement.clientHeight - 340,
      word: '',
      categoryId: 'all',
      currentPage: 1,
      total: 0,
      list: [],
      contentObj: null,
      contentVisible: false,
      categoryList: [],
      createVisible: false
    }
  },

  computed: {
    ...mapGetters([
      'pair'
    ]),
    allCategoryList() {
      return [{
        categoryTitle: '全部',
        id: 'all'
      }].concat(this.categoryList)
    },
    hasAccount() {
      return !!this.pair
    }
  },

  watch: {},

  created() {
    window.onresize = () => {
      this.contentH = document.documentElement.clientHeight - 340
    }
    this.getCategory()
    this.refreshList()
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * word change
     */
    wordChange(word) {
      this.word = word
      this.getList()
    },

    /**
     * type change
     */
    typeChange() {
      this.getList()
    },

    /**
     * currentPage change
     */
    currentPageChange(page) {
      this.currentPage = page
      this.getList()
    },

    /**
     * item click
     */
    itemClick(item) {
      this.loading = false
      if (!this.hasAccount) {
        this.$router.push('/keys/index')
      } else {
        this.contentObj = item
        this.contentVisible = true
      }
    },

    /**
     * 分类
     */
    getCategory() {
      paperCategoryIndexAPI().then(res => {
        this.categoryList = res.data || []
      }).catch(() => {})
    },

    refreshList() {
      this.currentPage = 1
      this.getList()
    },

    getList() {
      this.loading = true
      paperFilesListAPI({
        current: this.currentPage,
        size: 20,
        categoryId: this.categoryId === 'all' ? '' : this.categoryId,
        firstChar: this.word.toLowerCase()
      }).then(res => {
        const resData = res.data || {}
        this.list = resData.records || []
        this.total = resData.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },

    uploadClick() {
      this.loading = false
      if (!this.hasAccount) {
        this.$router.push('/keys/index')
      } else {
        this.createVisible = true
      }
    },

    getFileUrl(url) {
      return FileUrl(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.periodical {
  .container {
    height: 100%;
    border-radius: $wk-border-radius-base;
    overflow: hidden;
    position: relative;

    .left-search {
      width: 220px;
      height: 100%;
      padding: 30px 20px;
      background-color: #F5F5F5;
      flex-shrink: 0;

      .title {
        font-weight: bold;
        font-size: 18px;
      }

      .word-search {
        margin-top: 30px;
      }
    }

    .right-content {
      flex: 1;
      height: 100%;
      padding: 30px 30px 10px;
      width: 0;

      .title {
        font-weight: bold;
        font-size: 20px;
        .el-button {
          float: right;
          font-size: 15px;
          padding: 0;
        }
      }
    }
  }

  ::v-deep .el-tabs {
    margin-top: 10px;
    .el-tabs__nav-wrap::after {
      display: none;
    }

    .el-tabs__active-bar {
      border-radius: 2px;
      height: 4px;
    }
  }

  &-num {
    color: #aaa;
    margin-top: 15px;
  }

  .el-pagination {
    text-align: center;
  }

  &__body {
    margin: 20px 0;
    overflow-y: auto;
    vertical-align: top;
  }

  .p-item {
    padding: 20px 30px;
    display: inline-flex;
    cursor: pointer;
    width: 350px;
    overflow: hidden;
    height: 170px;
    border-radius: $wk-border-radius-base;

    &:hover {
      background-color: $wk--background-color-base;
    }

    word-wrap:break-word;
    white-space: pre-wrap;
    word-break: break-all;

    &__img {
      width: 100px;
      height: 130px;
      flex-shrink: 0;
    }

    &__content {
      margin-left: 10px;
      overflow-y: auto;

      .p-item__title {
        color: $wk-color-primary;
        font-size: 18px;
      }
      .p-item__des {
        margin-top: 10px;
        color: #C1C1C1;
      }
    }
  }

  .p-create,
  .p-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
}
</style>
