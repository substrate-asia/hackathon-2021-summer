<template>
  <div class="token-card">
    <a-card
      :title="evidenceKey"
    >
      <div class="nft-img">
        <img :src="tokenUri">
      </div>
      <div class="nft-extra">
        <span>名称：</span>
        <span>{{ extra.name }}</span>
      </div>
      <div class="nft-extra">
        <span>描述：</span>
        <span>{{ extra.description }}</span>
      </div>
      <div class="nft-extra">
        <span>链接：</span>
        <a v-if="extra.url !== '暂无'" :href="extra.url">{{ extra.url }}</a>
        <span v-else>暂无</span>
      </div>
      <div class="nft-extra">
        <span>生效时间：</span>
        <span>{{ extra.effective_date }}</span>
      </div>
      <div class="nft-extra">
        <span>过期时间：</span>
        <span>{{ extra.expiration_date }}</span>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'

export default {
  name: 'TokenCard',
  props: {
    token: Object,
  },
  data() {
    return {
      evidenceKey: null,
      tokenUri: null,
      extra: {
        name: null,
        description: null,
        url: null,
        effective_date: null,
        expiration_date: null,
        gene: null,
      },
    };
  },
  mounted() {
    this.normalize()
  },
  methods: {
    normalize() {
      this.evidenceKey = this.token.evidenceKey
      this.tokenUri = this.token.tokenUri

      if (!this.token.evidence[0]) {
        this.extra = {
          name: '暂无',
          description: '暂无',
          url: '暂无',
          effective_date: '暂无',
          expiration_date: '暂无',
          gene: '暂无',
        }

        return
      }

      const intro = JSON.parse(this.token.evidence[0].replaceAll("'", '\"'))

      this.extra = {
        name: this.formatString(intro.name),
        description: this.formatString(intro.description),
        url: this.formatString(intro.url),
        effective_date: this.formatTime(intro.effective_date),
        expiration_date: this.formatTime(intro.expiration_date),
        gene: this.formatString(intro.gene),
      }
    },
    formatString(value) {
      return !value ? '暂无': value
    },
    formatTime(time) {
      if (!time) {
        return '暂无'
      }

      if (time === 'forever') {
        return '永久有效'
      }

      if (dayjs(time).isValid()) {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      }

      return '时间格式错误'
    },
  },
};
</script>

<style lang="scss">
.ant-card {
  width: 90%;
}

.ant-card-head-title {
  white-space: normal !important;
  text-overflow: unset !important;
  overflow-wrap: anywhere;
}

.nft-img {
  padding-bottom: 100%;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
  }
}

.nft-extra {
  text-align: left;
  padding: 5px 0;
}
</style>
