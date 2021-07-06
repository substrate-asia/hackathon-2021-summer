<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="false"
    class="mnemonic-import-dialog"
    title="助记词导入"
    width="500px"
    append-to-body
    @close="cancelClick"
  >
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="file" style="border-color: transparent;">
        <el-upload
          style="line-height: initial;"
          drag
          :show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept="application/json, text/plain"
          :on-change="fileChange"
        >
          <template v-if="loginForm.file">
            <div class="el-upload__text">{{ loginForm.file.name }}</div>
          </template>
          <template v-else>
            <div class="el-upload__text">备份文件</div>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          prefix-icon="one one-icon-lock"
          @keyup.enter.native="importClick"
        >
          <!-- <i slot="suffix" @click="showPwd" class="el-icon-view"></i> -->
          <span slot="suffix" class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-input>

      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取消</el-button>
      <el-button :loading="loading" :disabled="loading" type="primary" @click="importClick">导入</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { keyring } from '@polkadot/ui-keyring'
import { hexToU8a, isHex, u8aToString } from '@polkadot/util'

// 助记词导入
export default {
  name: 'MnemonicImportDialog',
  components: {},
  props: {
    visible: Boolean
  },
  data() {
    return {
      loginForm: {
        file: null,
        password: ''
      },
      loginRules: {
        file: [{ required: true, trigger: 'blur', message: '附件不能为空' }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    importClick() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            try {
              const result = keyring.addPair(this.pair, this.loginForm.password)
              console.log(result, result.pair)
              this.$message.success('成功')
              this.$emit('change')
              this.$emit('update:visible', false)
              this.loading = false
            } catch (error) {
              this.loading = false
              this.$message.error('文件和密码不匹配')
            }
          }, 100)
        } else {
          this.loading = false
          return false
        }
      })
    },

    /**
     * 选择文件
     */
    fileChange(fileObj) {
      const file = fileObj.raw
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        if (target && target.result) {
          this.loginForm.file = file
          const data = this.convertToUint8Array(target.result)
          this.pair = this.parseFile(data)
        }
      }
      reader.readAsArrayBuffer(file)
    },

    /**
     * 获取 pair
     */
    parseFile(file) {
      try {
        const data = this.convertToUint8Array(file)
        return keyring.createFromJson(JSON.parse(u8aToString(data)))
      } catch (error) {
        console.error(error)
      }
      return null
    },

    /**
     * 转换到Uint8Array
     */
    convertToUint8Array(result) {
      const BYTE_STR_0 = '0'.charCodeAt(0)
      const BYTE_STR_X = 'x'.charCodeAt(0)
      const STR_NL = '\n'
      const data = new Uint8Array(result)

      // this converts the input (if detected as hex), via the hex conversion route
      if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
        let hex = u8aToString(data)

        while (hex[hex.length - 1] === STR_NL) {
          hex = hex.substr(0, hex.length - 1)
        }

        if (isHex(hex)) {
          return hexToU8a(hex)
        }
      }

      return data
    },

    cancelClick() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#9BA0B5;
$light_gray:#eee;

.el-dialog__wrapper {
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

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

}
</style>
