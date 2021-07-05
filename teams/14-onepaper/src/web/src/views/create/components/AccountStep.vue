<template>
  <div class="account-step">
    <div>创建用户名和密码</div>
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountRules"
      class="account-form"
      label-position="left"
    >
      <el-form-item prop="username">
        <el-input
          v-model="accountForm.username"
          placeholder="请输入用户名"
          prefix-icon="one one-icon-user"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="accountForm.password"
          placeholder="密码6-20位，数字+字母"
          prefix-icon="one one-icon-lock"
          name="password"
          tabindex="2"
        /><el-tooltip placement="top">
          <div slot="content">此密码是用来加密你的私钥，它必须强度足够且唯一，你将会使用你的账户<br>来签名交易，你可以用你的密码和备份文件来恢复此帐号</div>
          <i class="one one-icon-question" />
        </el-tooltip>
      </el-form-item>

      <el-form-item prop="confirmPwd">
        <el-input
          v-model="accountForm.confirmPwd"
          placeholder="请再次输入密码"
          prefix-icon="one one-icon-d-lock"
          name="password"
          tabindex="2"
        />
      </el-form-item>
    </el-form>

    <div class="account-handle">
      <el-button @click="cancelClick">取消</el-button>
      <el-button
        type="primary"
        plain
        @click="preClick"
      >上一步</el-button>
      <el-button
        type="primary"
        @click="nextClick"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 创建账号
  name: 'AccountStep',

  components: {},

  props: {},

  data() {
    const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/

    const validatedConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        username: '',
        password: '',
        confirmPwd: ''
      },
      accountRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: pwdReg, message: '密码必须由6-20位字母、数字组成', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatedConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    cancelClick() {
      this.$emit('action', 'cancel', this.accountForm)
    },

    preClick() {
      this.$emit('action', 'pre', this.accountForm)
    },

    nextClick() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.$emit('action', 'next', this.accountForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.account-step {
  .account-form {
    margin-top: 30px;
  }

  .account-handle {
    text-align: right;
    padding-right: 20px;
  }

  .el-input {
    width: calc(100% - 20px);
  }
}
</style>
