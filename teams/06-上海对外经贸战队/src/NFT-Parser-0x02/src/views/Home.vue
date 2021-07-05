<template>
  <div class="home">
    <github-link/>
    <a-layout>
      <a-layout-header>
        <a-row class="project-name">NFT-Parser-0x02</a-row>
        <a-row class="project-description">分解NFT</a-row>
      </a-layout-header>
      <a-layout-content>
        <!-- 用户输入地址并显示 NFT -->
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16" :offset="4">
            <a-input-search
              v-model="finalEvidenceKey"
              size="large"
              allow-clear
              @search="onSearch"
            >
              <a-button
                slot="enterButton"
                type="primary"
                :disabled="!searchEnabled"
              >
                获取 NFT!
              </a-button>
            </a-input-search>
          </a-col>
        </a-row>
        <!-- 纵向显示 NFT 列表 -->
        <a-row
          v-if="showSlides"
          class="token-list"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <a-col :span="16" :offset="4">
            <a-row
              v-for="(token, index) in tokens"
              :key="token.tokenId"
            >
              <token-card :token="token" />
              <div class="arrow-up">
                <a-icon v-if="index + 1 < tokens.length" type="arrow-up" />
                <a-icon v-if="index + 1 < tokens.length" type="arrow-up" />
                <a-icon v-if="index + 1 < tokens.length" type="arrow-up" />
              </div>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import {
  erc721Contract,
  erc721Address,
  chainId,
} from '@/web3/erc721Contract';
import {
  evidenceContract,
  evidenceFactoryAddress,
} from '@/web3/evidenceContract';
import TokenCard from '../components/TokenCard.vue';
import GithubLink from '@/components/GithubLink';

export default {
  name: 'Home',
  components: {
    GithubLink,
    TokenCard,
  },
  data() {
    return {
      defaultParams: {
        chain_id: chainId,
        erc721_addr: erc721Address,
        evidence_addr: evidenceFactoryAddress,
        token_id: 14,
      },
      chain_id: null,
      erc721_addr: null,
      evidence_addr: null,
      token_id: null,
      finalEvidenceKey: null,
      tokens: [],
      eachPageSlide: 3,
      showSlides: false,
    };
  },
  computed: {
    evidenceKey() {
      return this.chain_id + ':' + this.erc721_addr + ':' + this.token_id
    },
    searchEnabled() {
      return this.finalEvidenceKey.length > 0
    },
  },
  created() {
    this.checkQueryInUrl()
    this.fetchNFT()
  },
  watch:{
    $route(to, from) {
      // 路由变化，但变化前后都没有带上任意默认值，则无需任何操作
      if (!from.query.chain_id && !from.query.erc721_addr
        && !from.query.evidence_addr && !from.query.token_id
        && !to.query.chain_id && !to.query.erc721_addr
        && !to.query.evidence_addr && !to.query.token_id) {
        return
      }

      this.tokens = []
      this.checkQueryInUrl()
      this.fetchNFT()
    },
  },
  methods: {
    checkQueryInUrl() {
      const paramList = Object.keys(this.defaultParams)

      for (let i = 0; i < paramList.length; i++) {
        if (this.$route.query[paramList[i]]) {
          this[paramList[[i]]] = this.$route.query[paramList[i]]
        } else {
          this[paramList[i]] = this.defaultParams[paramList[i]]
        }
      }

      // 保证 chain_id 为数字
      this.chain_id = +this.chain_id

      this.finalEvidenceKey = this.evidenceKey
    },
    isEvidenceKeyValid(str) {
      return (/(\d+):(\w+):(\d+)/).test(str)
    },
    parseEvidenceKeyInInput() {
      const matchResult = this.finalEvidenceKey.match(/(\d+):(\w+):(\d+)/)
      this.chain_id = +matchResult[1]
      this.erc721_addr = matchResult[2]
      this.token_id = +matchResult[3]
    },
    onSearch() {
      if (!this.finalEvidenceKey) {
        return
      }

      if (!this.isEvidenceKeyValid(this.finalEvidenceKey)) {
        this.errorOnInvalidEvidencKey()
      }

      this.parseEvidenceKeyInInput()
      this.fetchNFT()
    },
    async fetchNFT() {
      if (!this.searchEnabled) {
        return
      }

      this.showSlides = false
      this.tokens = []

      try {
        let loopFlag = true
        while (loopFlag) {
          this.tokens.push({
            tokenId: +this.token_id,
          })

          const tokenUri = await this.asyncTokenURI(this.tokens[this.tokens.length - 1].tokenId)
          this.tokens[this.tokens.length - 1].tokenUri = tokenUri

          this.tokens[this.tokens.length - 1].evidenceKey = this.evidenceKey

          const result = await this.asyncGetEvidenceByKey(this.evidenceKey)
          this.tokens[this.tokens.length - 1].evidence = result

          const parentEvidence = await this.asyncGetEvidenceByKey(this.evidenceKey + '#parent')
          if (!parentEvidence[0]) {
            loopFlag = false
          } else {
            this.token_id = +parentEvidence[0].slice(2, -2).split(':')[2]
          }
        }

        this.tokens.reverse()
        this.showSlides = true

      } catch (error) {
        if (error.message.indexOf('invalid address') > -1) {
          this.errorOnInvalidNFTAddress()
        } else {
          console.log(error)
        }
      }
    },
    asyncTokenURI(tokenId) {
      return new Promise((resolve, reject) => {
        erc721Contract.methods.tokenURI(tokenId).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncGetEvidenceByKey(evidenceKey) {
      return new Promise((resolve, reject) => {
        evidenceContract.methods.getEvidenceByKey(evidenceKey).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    infoOnZeroTokens() {
      this.$notification.info({
        message: '注意！',
        description: '该地址下没有 NFT 资源',
      })
    },
    errorOnInvalidNFTAddress() {
      this.$notification.error({
        message: '注意！',
        description: 'NFT 地址无效，请检查后重新查询',
      })
    },
    errorOnInvalidEvidencKey() {
      this.$notification.error({
        message: '注意！',
        description: 'EvidencKey 地址无效，请检查后重新查询',
      })
    },
  }
};
</script>

<style lang="scss">
.home {

  .ant-layout {
    background-color: inherit;

    .ant-layout-header {
      background: inherit;
      height: auto;

      .project-name {
        padding-top: 30px;
        text-align: center;
        font-size: 2em;
        font-weight: bolder;
      }

      .project-description {
        padding-bottom: 30px;
        text-align: center;
        font-size: 1.2em;
        font-weight: bold;
      }
    }

    .token-list {
      margin-top: 50px;
      padding-bottom: 30px;

      .arrow-up {
        text-align: center;
        margin: 2em 0;
      }
    }
  }
}
</style>
