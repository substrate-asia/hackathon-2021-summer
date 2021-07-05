<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="false"
    class="back-account-dialog"
    width="500px"
    append-to-body
    @close="cancelClick"
  >
    <template slot="title">创建备份文件<el-tooltip placement="top">
      <div slot="content">点击下载即可创建一个加密的备份文件，可以在任何设备上重新导入你的账户。<br>与此帐号关联的密码及备份文件同时提供才能找回你的账户。</div>
      <i class="one one-icon-question" />
    </el-tooltip></template>
    <el-form ref="form" :model="form" auto-complete="on" label-position="left">
      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
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
      <el-button :loading="loading" :disabled="loading" type="primary" @click="downClick">下载</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { keyring } from '@polkadot/ui-keyring'
import { backAccount } from '@/utils'

// 助记词导入
export default {
  name: 'MnemonicImportDialog',
  components: {},
  props: {
    visible: Boolean,
    address: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      form: {
        password: ''
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

    /**
     * 下载备份
     */
    downClick() {
      this.loading = true
      setTimeout(() => {
        try {
          const addressKeyring = this.address && keyring.getPair(this.address)
          const json = addressKeyring && keyring.backupAccount(addressKeyring, this.form.password)
          backAccount(json, this.address)
          this.$message.success('成功')
          this.cancelClick()
          this.loading = false
        } catch (error) {
          this.$message.error('备份失败')
          this.loading = false
        }
      }, 100)
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
