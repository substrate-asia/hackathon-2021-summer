<template>
  <div class="search-container" :class="isExpand?'expand': ''">
    <div class="search-bar flex-between-center">
      <div class="input-box flex-between-center">
        <i class="search-icon" @click="isExpand=true"></i>
        <input class="search-input" type="text" name="" placeholder="Search" v-model="searchText">
        <i v-if="searchText.trim()!==''" class="clear-input-text text-grey" @click="searchText = ''"></i>
      </div>
      <span class="cancel-btn" @click="onCancel">取消</span>
    </div>
<!--    <div v-if="searchText.trim()!==''" class="search-list c-card">-->

<!--    </div>-->
    <div v-if="isExpand && searchText.trim()!==''" class="search-list">
      <div class="list-item" v-for="i of 5" :key="i" @click="isExpand= false">AAAA</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data () {
    return {
      isExpand: window.screenWidth > 620,
      searchText: ''
    }
  },
  watch: {
    searchText(newValue, oldValue) {
      this.$store.commit('saveCrowdloanCardSearchText', newValue)
    },
  },
  methods: {
    onSearchIcon () {

    },
    clearSearch(){
      this.searchText = ''
    },
        onCancel () {
      this.searchText = ''
      this.isExpand = false
    }
  },
  mounted () {
    const _this = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.isExpand = window.screenWidth > 620
      })()
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/static/css/customCard";
@mixin icon($w: 1rem, $h: 1rem) {
  width: $w;
  min-width: $w;
  height: $h;
  min-height: $h;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.search-container {
  position: absolute;
  top: .5rem;
  right: 0;
  transition: 0.4s;
  width: 15rem;
  max-width: 15rem;
  z-index: 10;
}
.search-bar {
  height: 2.4rem;
  padding: 0 .6rem;
  background: white;
  border-radius: .6rem;
  .search-icon {
    @include icon(1.2rem, 1.2rem);
    background-image: url("~@/static/images/search-icon.svg");
  }
  input {
    border:none;
    background: none;
    outline:none;
    flex: 1;
    padding: 0 .4rem;
  }
  .clear-input-text {
    display: flex;
  }
  .clear-input-text::after {
    content: '';
    display: inline-block;
    @include icon;
    background-image: url("~@/static/images/circle-close.png");
  }
  .cancel-btn {
    white-space: nowrap;
    display: none;
  }
  .input-box {
    flex: 1;
  }
}
.search-list {
  padding: .6rem;
  margin-top: .2rem;
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  box-shadow: 0 2px 20px rgba(0,0,0,.1);
  background: white;
  .list-item {
    padding: .6rem 0;
  }
}

@media (max-width: 620px) {
  .search-container {
    top: 0;
    right: -15px;
    padding: 0 15px;
    width: 4rem;
    overflow: hidden;
    .search-bar {
      background: transparent;
      height: 3rem;
      border-radius: 0;
      padding: 0;
      .search-icon {
        margin-right: 2rem;
      }
      .cancel-btn {
        display: inline-block;
      }
    }
    &.expand {
      background: white;
      width: calc(100% + 30px);
      max-width: calc(100% + 30px);
      transition: 0.4s;
      .search-icon {
        margin-right: .5rem;
      }
    }
  }

  .input-box {
    background: #F6F7F9;
    margin-right: 1rem;
    padding: .3rem .6rem;
    border-radius: 2rem;
  }
}
</style>
