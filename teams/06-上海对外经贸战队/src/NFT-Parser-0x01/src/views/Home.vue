<template>
  <div class="home">
    <github-link/>
    <a-layout>
      <a-layout-header>
        <a-row class="project-name">NFT-Parser-0x01</a-row>
        <a-row class="project-description">基本款</a-row>
      </a-layout-header>
      <a-layout-content>
        <!-- 用户输入地址并显示 NFT -->
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16" :offset="4">
            <a-input-search
              v-model="addr"
              size="large"
              allow-clear
              @search="fetchNFT"
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
        <!-- 横向显示 NFT 列表 -->
        <a-row
          v-if="showSlides"
          class="token-list"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <a-col :span="16" :offset="4">
            <a-carousel arrows>
              <div
                slot="prevArrow"
                class="custom-slick-arrow"
                style="left: 10px; zIndex: 1"
              >
                <a-icon type="left-circle" />
              </div>
              <div
                slot="nextArrow"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <div
                v-for="pageIndex in pageCount"
                :key="pageIndex"
              >
                <a-row>
                  <a-col
                    v-for="(tokens, index) in pagedTokens[pageIndex - 1]"
                    :key="((pageIndex - 1) * eachPageSlide) + index"
                    :span="24 / eachPageSlide"
                    class="token-card"
                  >
                    <token-card
                      :token="pagedTokens[pageIndex - 1][index]"
                    />
                  </a-col>
                </a-row>
              </div>
            </a-carousel>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import web3 from "@/web3/index"

import {
  erc721Abi,
  erc721Address,
  chainId,
  nftAddress,
} from '@/web3/erc721Contract';
import {
  evidenceAbi,
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
        erc721_addr: erc721Address,
        addr: nftAddress,
        chain_id: chainId,
        evidence_addr: evidenceFactoryAddress,
      },
      erc721_addr: null,
      addr: null,
      chain_id: null,
      evidence_addr: null,
      erc721Contract: null,
      evidenceContract: null,
      tokens: [],
      eachPageSlide: 3,
      showSlides: false,
    };
  },
  computed: {
    tokenCount() {
      return this.tokens.length;
    },
    pageCount() {
      return Math.ceil(this.tokenCount / this.eachPageSlide);
    },
    pagedTokens() {
      const arr = [];
      for (let i = 0; i < this.pageCount; i++) {
        arr.push(this.tokens.slice(i * this.eachPageSlide, (i + 1) * this.eachPageSlide));
      }
      return arr;
    },
    searchEnabled() {
      return this.addr.length > 0
    },
  },
  created() {
    this.checkQueryInUrl()
    this.initContracts()
    this.fetchNFT()
  },
  watch:{
    $route(to, from) {
      // 路由变化，但变化前后都没有带上 NFT 地址，无需任何操作
      if (!from.query.addr && !from.query.erc721_addr
        && !to.query.addr && !to.query.erc721_addr) {
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
    },
    initContracts() {
      this.erc721Contract = new web3.eth.Contract(erc721Abi, this.erc721_addr)
      this.evidenceContract = new web3.eth.Contract(evidenceAbi, this.evidence_addr)
    },
    async fetchNFT() {
      if (!this.searchEnabled) {
        return
      }

      this.showSlides = false
      this.tokens = []

      try {
        const tokenLength = await this.asyncBalanceOf(this.addr)

        if (+tokenLength === 0) {
          this.infoOnZeroTokens()
          return
        }

        for (let i = 0; i < tokenLength; i++) {
          let tokenId = await this.asyncTokenOfOwnerByIndex(this.addr, i)
          this.tokens.push({
            tokenId: parseInt(tokenId),
          })
        }

        for (let i = 0; i < this.tokens.length; i++) {
          const tokenUri = await this.asyncTokenURI(this.tokens[i].tokenId)
          this.tokens[i].tokenUri = tokenUri

          const evidenceKey = `${chainId}:${this.erc721_addr}:${this.tokens[i].tokenId}`
          this.tokens[i].evidenceKey = evidenceKey

          const result = await this.asyncGetEvidenceByKey(evidenceKey)
          this.tokens[i].evidence = result
        }

        this.showSlides = true

      } catch (error) {
        if (error.message.indexOf('invalid address') > -1) {
          this.errorOnInvalidNFTAddress()
        } else {
          console.log(error)
        }
      }
    },
    asyncBalanceOf(addr) {
      return new Promise((resolve, reject) => {
        this.erc721Contract.methods.balanceOf(addr).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncTokenOfOwnerByIndex(addr, tokenIndex) {
      return new Promise((resolve, reject) => {
        this.erc721Contract.methods.tokenOfOwnerByIndex(addr, tokenIndex).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncTokenURI(tokenId) {
      return new Promise((resolve, reject) => {
        this.erc721Contract.methods.tokenURI(tokenId).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncGetEvidenceByKey(evidenceKey) {
      return new Promise((resolve, reject) => {
        this.evidenceContract.methods.getEvidenceByKey(evidenceKey).call((err, result) => {
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
    }
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;

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
    }
  }
}

.ant-carousel {

  .slick-slider {
    text-align: center;
    height: auto;
    overflow: hidden;

    .custom-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #000;
      opacity: 0.3;

      &:before {
        display: none;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .slick-slide {
    padding: 0 40px;

    &.slick-active {
      margin-bottom: 20px;
    }

    .token-card {
      display: flex;
      justify-content: center;
    }
  }

  .slick-dots li button {
    background: #69c0ff !important;
  }

  .slick-dots li.slick-active button {
    background: #1890ff !important;
  }

  .slick-dots-bottom {
    bottom: 1px !important;
  }
}
</style>
