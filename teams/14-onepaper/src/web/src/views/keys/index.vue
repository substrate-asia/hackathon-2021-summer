<template>
  <main-content class="wallet">
    <navbar />
    <main-content-body>
      <div class="login-wrap">
        <div class="login">
          <el-card :body-style="{padding: '20px 40px 30px'}">
            <img class="login-logo" src="@/assets/img/logo.png">
            <template v-if="accounts.length > 0">
              <div class="login-des">点击密钥进入</div>
              <div class="keys" :style="{ height: `${contentH}px` }">
                <span v-if="accounts.length === 0" class="no-key">暂无</span>
                <flexbox v-for="(item, index) in accounts" :key="index" align="stretch" class="key">
                  <flexbox-item>
                    <div class="key__title" @click="enterDetail(item)">{{ `${item.address}` }}<span style="color: #999;">{{ item.meta.name !== '' && item.meta.name !== undefined ? `(${item.meta.name})` : '' }}</span></div>
                    <el-button class="key__back" type="text" @click.stop="backClick(item)">备份助记词</el-button>
                  </flexbox-item>
                  <div>
                    <el-button type="text" class="key__delete" icon="one one-icon-delete-b" @click.stop="deleteClick(item)" />
                  </div>
                </flexbox>
              </div>
            </template>
            <div class="handles">
              <el-button type="primary" @click.stop="createClick">创建paper账户</el-button>
              <el-button @click.stop="importClick">助记词导入</el-button>
            </div>
          </el-card>

          <mnemonic-import-dialog
            v-if="importDialogVisible"
            :visible.sync="importDialogVisible"
            @change="importChange"
          />

          <back-account-dialog
            v-if="backDialogVisible"
            :address="selectAccount.address"
            :visible.sync="backDialogVisible"
          />
        </div>
      </div>
    </main-content-body>
  </main-content>

</template>

<script>
import Navbar from '@/layout/components/Navbar'
import { MainContent, MainContentBody } from '@/components/MainContent'
import MnemonicImportDialog from './components/MnemonicImportDialog'
import BackAccountDialog from './components/BackAccountDialog'

import { mapGetters } from 'vuex'
import { keyring } from '@polkadot/ui-keyring'

export default {
  name: 'Login',
  components: {
    Navbar,
    MainContent,
    MainContentBody,
    MnemonicImportDialog,
    BackAccountDialog
  },
  data() {
    return {
      importDialogVisible: false,
      backDialogVisible: false,
      accounts: [],
      selectAccount: {},
      contentH: document.documentElement.clientHeight - 600,
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters([
      'apiState',
      'polkadot'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },

    apiState: {
      handler() {
        if (this.apiState === 'READY') {
          this.queryAccount()
        }
      },
      immediate: true
    }
  },
  created() {
    window.onresize = () => {
      this.contentH = document.documentElement.clientHeight - 600
    }
  },
  methods: {
    /**
     * 查询账号
     */
    queryAccount() {
      const ignoreKeys = [
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
        '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
        '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
        '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
        '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
        '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL'
      ]
      const accounts = keyring.getAccounts()
      this.accounts = accounts.filter(item => !ignoreKeys.includes(item.address))
    },

    /**
     * 备份
     */
    backClick(item) {
      this.selectAccount = item
      this.backDialogVisible = true
    },

    /**
     * 导入
     */
    importClick() {
      this.importDialogVisible = true
    },

    importChange() {
      this.queryAccount()
    },

    /**
     * 删除
     */
    deleteClick(item) {
      this.$confirm('您将从可用帐户列表中删除此帐户。一旦完成，如果您需要再次访问它，您将不得不通过种子或备份文件重新创建帐户。<br>此操作不会从链中删除该帐户的历史记录，也不会从该帐户中删除任何关联资金。忘记操作只限制您访问此浏览器上的帐户。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          keyring.forgetAccount(item.address)
          this.$message.success('删除成功')
          this.queryAccount()
          // 更新缓存
          const localPair = localStorage.getItem('pair')
          if (localPair && !this.accounts.find(item => item.address === localPair.address)) {
            localStorage.removeItem('pair')
            this.$store.commit('user/SET_PAIR', null, { root: true })
            document.location.reload()
          }
        })
        .catch(() => {})
    },

    /**
     * 看详情
     */
    enterDetail(item) {
      localStorage.setItem('pair', JSON.stringify(item))
      this.$store.commit('user/SET_PAIR', item)
      this.$router.push({ path: this.redirect || '/periodical/index' })
    },

    /**
     * 去创建
     */
    createClick() {
      this.$router.push('/create/index')
    }
  }
}
</script>

<style lang="scss" scoped>
$light_gray:#eee;

.login-wrap {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  // background: url("./bg.jpg") center center;
  background-size: cover;

  .login {
    width: 480px;
    margin: 0 auto;
    text-align: center;
    padding-top: 60px;

    .login-logo {
      width: 120px;
      margin-top: 10px;
    }
    .login-des {
      font-size: 18px;
      margin-top: 10px;
    }

    .keys {
      min-height: 150px;
      overflow-y: auto;
      margin-top: 30px;
      border: 1px solid $wk-border-line-color;
      border-radius: $wk-border-radius-base;
      padding: 15px;

      .no-key {
        color: $wk-color-text-placeholder;
      }

      .key {
        cursor: pointer;
        .vux-flexbox-item {
          padding-right: 30px;
          border-radius: 4px;
          &:hover {
            background-color: $wk--background-color-base;
          }
        }
        &__title {
          word-wrap:break-word;
          white-space: pre-wrap;
          word-break: break-all;
          padding: 5px 5px 0;
          font-size: 13px;
          line-height: 1.5;
          color: #666;
        }

        &__back {
          padding-top: 5px;
          margin-left: 5px;
        }

        ::v-deep .key__delete {
          padding-top: 5px;
          i {
            font-size: 14px;
            color: #9BA0B5;
          }
        }
      }
    }

    .handles {
      margin-top: 30px;
      .el-button {
        margin-top: 20px;
        width: 100%;
      }

      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>
