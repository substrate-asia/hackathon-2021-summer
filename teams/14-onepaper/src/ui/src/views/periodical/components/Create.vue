<template>
  <div class="p-create">
    <div class="el-dialog__header">
      <span class="el-dialog__title text-one-line">论文上传</span>
      <button class="el-dialog__headerbtn" @click="closeClick"><i class="el-dialog__close el-icon el-icon-close" /></button>
    </div>
    <div v-loading="loading" class="p-create__body">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" :maxlength="80" />
        </el-form-item>
        <el-form-item label="封面" prop="fileCover">
          <el-upload
            style="line-height: initial;"
            drag
            :show-file-list="false"
            action=""
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
            :http-request="coverFileChange"
          >
            <template v-if="coverFile">
              <div class="el-upload__text">{{ coverFile.name }}</div>
            </template>
            <template v-else>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author" :rows="3" :maxlength="80" />
        </el-form-item>
        <el-form-item label="年份" prop="createYear">
          <el-date-picker
            v-model="ruleForm.createYear"
            type="year"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="摘要" prop="content">
          <el-input v-model="ruleForm.content" type="textarea" :maxlength="3000" />
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="ruleForm.categoryId" placeholder="请选择活动区域">
            <el-option
              v-for="(item , index) in categoryList"
              :key="index"
              :label="item.categoryTitle"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="论文" prop="fileCover">
          <el-upload
            style="line-height: initial;"
            drag
            :show-file-list="false"
            action=""
            accept="application/pdf"
            :http-request="pathFileChange"
          >
            <template v-if="pathFile">
              <div class="el-upload__text">{{ pathFile.name }}</div>
            </template>
            <template v-else>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="closeClick">关闭</el-button>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { paperFilesUploadAPI, paperFilesAddAPI } from '@/api'

import { mapGetters } from 'vuex'

export default {
  // 论文上传
  name: 'PCreate',

  components: {},

  props: {
    categoryList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      ruleForm: {
        title: '',
        author: '',
        createYear: '',
        content: '',
        categoryId: '',
        fileCover: '',
        filePath: ''
      },
      coverFile: null,
      pathFile: null,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'change' }
        ],
        createYear: [
          { type: 'date', required: true, message: '请选择年份', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入摘要', trigger: 'change' }
        ],
        categoryId: [
          { type: 'date', required: true, message: '请选择分类', trigger: 'change' }
        ],
        fileCover: [
          { required: true, message: '请上传封面' }
        ],
        filePath: [
          { required: true, message: '请上传论文' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters([
      'pair'
    ])
  },

  watch: {
    categoryList: {
      handler() {
        if (this.categoryList.length > 0) {
          this.ruleForm.categoryId = this.categoryList[0].id
        }
      },
      immediate: true
    }
  },

  created() {
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    closeClick() {
      this.$emit('close')
    },

    coverFileChange({ file }) {
      this.uploadFile({
        type: 2, // type 1 pdf论文，2 封面图片
        file
      })
    },

    pathFileChange({ file }) {
      this.uploadFile({
        type: 1,
        file
      })
    },

    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submiteRequest()
        } else {
          return false
        }
      })
    },

    submiteRequest() {
      this.loading = true
      paperFilesAddAPI({
        ...this.ruleForm,
        createYear: this.ruleForm.createYear.getFullYear(),
        account: this.pair.address,
        accountName: this.pair.meta.name
      }).then(res => {
        this.$emit('success')
        this.$message.success('上传成功，已为您增加10个Paper')
        this.closeClick()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    uploadFile(data) {
      this.loading = true
      paperFilesUploadAPI(data).then(res => {
        if (data.type === 1) {
          this.ruleForm.filePath = res.data
          this.pathFile = data.file
          this.$refs.ruleForm.validateField('filePath')
        } else {
          this.ruleForm.fileCover = res.data
          this.coverFile = data.file
          this.$refs.ruleForm.validateField('fileCover')
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-create {
  background-color: white;

  .el-dialog__title {
    color: $wk-color-primary;
    font-size: 20px;
  }

  &__body {
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }

  ::v-deep .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      height: 55px;
      padding: 8px 10px;
      // background-color: transparent;

      .el-upload__text {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }
}
</style>
