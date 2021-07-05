<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="false"
    class="back-account-dialog"
    width="500px"
    title="转账"
    append-to-body
    @close="cancelClick"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item
        prop="amount"
      >
        <template slot="label">转账金额<el-tooltip placement="top">
          <div slot="content">转账金额</div>
          <i class="one one-icon-question" />
        </el-tooltip></template>
        <flexbox class="amount-input" align="stretch">
          <el-input-number
            v-model="form.amount"
            :precision="0"
            :min="0"
            placeholder="输入金额"
            :controls="false"
          />
          <el-select
            v-model="unit"
            placeholder="请选择"
            @change="unitChange"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.text"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </flexbox>
        <span>余额: {{ balance }}</span>
      </el-form-item>
      <el-form-item
        prop="addressTo"
      >
        <template slot="label">接收地址<el-tooltip placement="top">
          <div slot="content">接收地址</div>
          <i class="one one-icon-question" />
        </el-tooltip></template>
        <el-input
          v-model="form.addressTo"
          placeholder="输入地址"
          name="text"
        />
      </el-form-item>
      {{ status }}
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">关闭</el-button>
      <el-button :loading="loading" :disabled="loading" type="primary" @click="transferClick">转账</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { keyring } from '@polkadot/ui-keyring'
import { mapGetters } from 'vuex'
import { web3FromSource } from '@polkadot/extension-dapp'
import { getSiOptions, inputToBn } from '@/utils/index'
import { formatBalance } from '@polkadot/util'

// 转账
export default {
  name: 'TransferDialog',
  components: {},
  props: {
    visible: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    balance: [String, Number],
    address: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      accountPair: null,
      status: '',
      form: {
        amount: undefined,
        addressTo: ''
      },
      rules: {
        amount: [{ required: true, trigger: 'blur', message: '转账金额不能为空' }],
        addressTo: [{ required: true, trigger: 'blur', message: '接收地址不能为空' }]
      },
      loading: false,
      unitOptions: [],
      unit: '-'
    }
  },
  computed: {
    ...mapGetters([
      'apiState',
      'polkadot'
    ])
  },
  watch: {},
  mounted() {
    this.accountPair = keyring.getPair(this.address)
    this.unitOptions = getSiOptions()
  },

  beforeDestroy() {},
  methods: {

    /**
     * 转账
     */
    async transferClick() {
      this.status = ''
      const result = await this.getResult()
      if (result) {
        if (this.accountPair.isLocked) {
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if (this.unlockAccount(this.accountPair.address, value)) {
              this.transfer()
            } else {
              this.$message.error('密码错误')
            }
          }).catch(() => {
          })
        } else {
          this.transfer()
        }
      }
    },

    getResult() {
      return new Promise((resolve, reject) => { // eslint-disable-line
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(true)
          } else {
            reject(false)
          }
        })
      })
    },

    async transfer() {
      if (this.unsub) {
        this.unsub()
        this.unsub = null
      }
      // this.loading = true
      //     setTimeout(() => {
      const { api } = this.polkadot
      const fromAcct = await this.getFromAcct()
      const si = formatBalance.findSi(this.unit)
      const amountArray = inputToBn(this.form.amount || 0, si)
      const amountBn = amountArray && amountArray.length > 0 ? amountArray[0] : 0
      const transformed = this.transformParams([true, true], [this.form.addressTo, amountBn])
      // transformed can be empty parameters

      const txExecute = transformed
        ? api.tx.balances.transfer(...transformed)
        : api.tx.balances.transfer()

      const unsub = await txExecute.signAndSend(fromAcct, ({ status }) => {
        if (status.isFinalized) {
          this.status = `😉 最终确定。块哈希: ${status.asFinalized.toString()}`
          this.$message.success('转账成功')
        } else {
          this.status = `当前事务状态: ${status.type}`
        }
      })
        .catch(err => {
          this.status = `😞 交易失败: ${err.toString()}`
        })
      this.unsub = unsub
      //     }, 100)
    },

    async getFromAcct() {
      const { api } = this.polkadot
      const {
        address,
        meta: { source, isInjected }
      } = this.accountPair
      let fromAcct

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await web3FromSource(source)
        fromAcct = address
        api.setSigner(injected.signer)
      } else {
        fromAcct = this.accountPair
      }

      return fromAcct
    },

    transformParams(paramFields, inputParams, opts = { emptyAsNull: true }) {
      // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
      //   Otherwise, it will not be added
      const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
        if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
          return inputParam.value.trim()
        } else if (typeof inputParam === 'string') {
          return inputParam.trim()
        }
        return inputParam
      })
      const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }))

      return params.reduce((memo, { type = 'string', value }) => {
        if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo)

        let converted = value

        // Deal with a vector
        if (type.indexOf('Vec<') >= 0) {
          converted = converted.split(',').map(e => e.trim())
          converted = converted.map(single => this.isNumType(type)
            ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
            : single
          )
          return [...memo, converted]
        }

        // Deal with a single value
        if (this.isNumType(type)) {
          converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted)
        }
        return [...memo, converted]
      }, [])
    },

    isNumType(type) {
      const utils = {
        paramConversion: {
          num: [
            'Compact<Balance>',
            'BalanceOf',
            'u8', 'u16', 'u32', 'u64', 'u128',
            'i8', 'i16', 'i32', 'i64', 'i128'
          ]
        }
      }
      return utils.paramConversion.num.some(el => type.indexOf(el) >= 0)
    },

    cancelClick() {
      this.$emit('update:visible', false)
    },

    /**
     * unit change
     */
    unitChange(unit) {
      // const si = formatBalance.findSi(unit)
      // console.log('si---', si)
      // console.log('inputToBn---', inputToBn(this.form.amount || 0, si))

      // inputToBn
    },

    unlockAccount(address, password) {
      let publicKey

      try {
        publicKey = keyring.decodeAddress(address)
      } catch (error) {
        console.error(error)

        return false
      }

      const pair = keyring.getPair(publicKey)

      try {
        pair.decodePkcs8(password)
        return true
        // isUnlockCached && cacheUnlock(pair)
      } catch (error) {
        console.error(error)

        return false
      }
    }

  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-form-item {
  .el-form-item__label {
    line-height: 20px;
    font-size: 14px;
    font-weight: normal;
  }
}

::v-deep.el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
    padding: 0 8px;
  }
}

.amount-input {
  ::v-deep .el-input-number{
    flex: 1;
    .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  ::v-deep .el-select{
    flex-shrink: 0;
    width: 90px;
    .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: -1px;
    }
  }
}
</style>
