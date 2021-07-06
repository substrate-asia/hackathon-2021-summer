<template>
  <div class="reward-token-box">
    <img :src="icon" alt="" />
    <span>{{ token }}</span>
  </div>
</template>

<script>
    export default {
        name:'RewardToken',
        props: {
            icon: {
                type: String,
            },
            token: {
                type: String
            }
        },
        mounted () {
        },
    }
</script>

<style lang="scss" scoped>
.reward-token-box {
  display: inline-flex;
  align-items: center;
  margin-left: .5rem;
  background-color: #F6F7F9;
  border-radius: 1rem;
  height: .9rem;
  padding: 0 .4rem 0 .1rem;
  line-height: .9rem;
  img {
    width: .7rem;
    height: .7rem;
    margin-right: .1rem;
  }
}
</style>
