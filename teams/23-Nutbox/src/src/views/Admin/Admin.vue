<template>
  <div class="admin">
    <h3>
      {{ this.$t("admin.admin") }}
    </h3>
    <div class="nav sub-page-nav">
      <router-link to="/admin" exact>Pokadot</router-link>
      <router-link to="/admin/kusama">Kusama</router-link>
      <router-link v-if="isDebug" to="/admin/rococo">Rococo</router-link>
      <div class="center-blank"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getCrowdstacking } from '@/apis/api'
import { stanfiAddress } from "@/utils/commen/account"
import { DEBUG } from "@/config"

export default {
  name: "Wallet",
  data() {
    return {
      showLogout: false,
      isDebug: DEBUG
    };
  },
  computed: {

  },
  methods: {
  },
  created () {
          // 获取验证者节点投票卡片信息 --- 所有的
      getCrowdstacking().then((res) => {
        const crowdstaking = res.map(({ community, project, nominatorCount, relaychain }) => ({
          community: {
            ...community,
            communityId: stanfiAddress(community.communityId),
          },
          project: {
            ...project,
            projectId: stanfiAddress(project.projectId),
            validators: project.validators.map((v) => stanfiAddress(v)),
          },
          nominatorCount,
          relaychain
        }));
        const polkadotcs = crowdstaking.filter(c => c.relaychain === 'polkadot')
        const kusamacs = crowdstaking.filter(c => c.relaychain === 'kusama')
        this.$store.commit('polkadot/saveCrowdstakings', polkadotcs);
        this.$store.commit('kusama/saveCrowdstakings', kusamacs)
      });
    }
};
</script>

<style lang="less" scoped>
.sub-page-nav{
  margin-bottom: 0.5rem;
}
</style>
