<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="c-modal-header">
      <div class="text-center font20 font-bold" v-if="lang === 'en'">
        Nominate to<span class="big">
          {{ crowdstaking.project.projectName + "'s" }} </span
        >validators <br />
        through<span class="big">
          {{ crowdstaking.community.communityName }} </span
        >community
      </div>
      <div class="text-center font20 font-bold" v-else>
        通过<span class="big"> {{ crowdstaking.community.communityName }} </span
        >社区<br />
        为<span class="big"> {{ crowdstaking.project.projectName }} </span
        >的验证者节点投票<br />
      </div>
    </div>
    <div class="h-line"></div>

      <p class="text-center fon14 text-grey" v-if="needToCancelValidators > 0">
        {{ $t("cs.cancelValidorsInfo", { n: needToCancelValidators }) }}
      </p>
    <div v-if="needToCancelValidators > 0" class="list-box">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        name="flavour-2"
      >
        <div v-for="item of availableNominators" :key="item.address">
          <b-form-checkbox class="checkbox-item" :value="item.address">
            <div class="checkbox-item-card">
              <span
                class="candidate-flag"
                v-if="item.otherStake === '0(0)' && item.ownStake === 0"
                >{{ $t("validator.waiting") }}</span
              >
              <div class="font16 font-bold mb-1">{{ item.nick }}</div>
              <div class="card-row flex-between-center">
                <div class="flex-item text-center">
                  <span class="stake-info">{{
                    $t("validator.commission")
                  }}</span>
                  <span class="stake-info">{{ item.commission }}</span>
                </div>
                <div class="v-line"></div>
                <div class="flex-item text-center">
                  <span class="stake-info">{{
                    $t("validator.otherStake")
                  }}</span>
                  <span class="stake-info">{{ item.otherStake }}</span>
                </div>
                <div class="v-line"></div>
                <div class="flex-item text-center">
                  <span class="stake-info">{{ $t("validator.ownStake") }}</span>
                  <span class="stake-info">{{ item.ownStake }}</span>
                </div>
              </div>
            </div>
          </b-form-checkbox>
        </div>
      </b-form-checkbox-group>
    </div>

    <button
      class="primary-btn"
      @click="confirm"
      :disabled="isNominating || !canNominate"
    >
      <b-spinner small type="grow" v-show="isNominating"></b-spinner
      >{{ $t("cs.confirm") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { nominate } from "@/utils/polkadot/staking";
import { MAX_NOMINATE_VALIDATOR } from "@/constant";

export default {
  data() {
    return {
      selected: [],
      inputAmount: "",
      inputNonimator: "",
      paraTokenSymbol: "",
      isNominating: false,
    };
  },
  props: {
    crowdstaking: {
      type: Object,
    },
  },
  computed: {
    ...mapState('polkadot',["symbol", "balance", "bonded", "nominators"]),
    ...mapState(['lang']),
    availableNominators() {
      return this.nominators.filter(
        ({ address }) =>
          this.crowdstaking.project.validators.indexOf(address) === -1
      );
    },
    needToCancelValidators() {
      return (
        this.availableNominators.length +
        this.crowdstaking.project.validators.length -
        MAX_NOMINATE_VALIDATOR
      );
    },
    // 确认按钮是否可点击
    canNominate() {
      if (this.needToCancelValidators) {
        return this.selected.length >= this.needToCancelValidators;
      } else {
        return true;
      }
    },
  },
  methods: {
    hide() {
      if (this.isNominating) return;
      this.$emit("hideNominate");
    },
    getNominateValidators() {
      if (this.needToCancelValidators > 0) {
        // 从用户选择的列表获取投票
        return this.availableNominators
          .filter(({ address }) => this.selected.indexOf(address) !== -1)
          .map(({ address }) => address)
          .concat(this.crowdstaking.project.validators);
      } else {
        // 直接拼接节点
        return this.availableNominators
          .map(({ address }) => address)
          .concat(this.crowdstaking.project.validators);
      }
    },
    async confirm() {
      try {
        this.isNominating = true;
        const { community, project } = this.crowdstaking;
        const validators = this.getNominateValidators();
        console.log("selecet validator", validators);
        await nominate(
          validators,
          community.communityId,
          project.projectId,
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideNominate");
          }
        );
      } catch (e) {
        this.$bvToast.toast(e.message, {
          title: this.$t("tip.error"),
          autoHideDelay: 5000,
          variant: "danger",
        });
      } finally {
        this.isNominating = false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.tip-modal {
  position: relative;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .list-box {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .close-btn {
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
  }
  .primary-btn {
    width: 100%;
    height: 48px;
    min-height: 48px;
  }
  .big {
    background-image: linear-gradient(
      to right,
      var(--primary-custom),
      var(--primary-custom)
    );
    background-size: 90% 50%;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 50%;
  }
}
.h-line {
  width: 100%;
  height: 1px;
  background-color: #f6f7f9;
  margin-bottom: 15px;
  margin-top: 24px;
}
.v-line {
  height: 26px;
  width: 1px;
  background-color: #bdbfc2;
  opacity: 0.2;
}
.stake-info {
  display: block;
  line-height: 16px;
}
.checkbox-item {
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  align-items: center;
}
.custom-control-label {
  width: 100%;
  &::before {
    top: 50% !important;
    transform: translateY(-50%);
    left: -1.8rem !important;
    width: 1.4rem !important;
    height: 1.4rem !important;
    border: none !important;
    background-image: url("~@/static/images/no-check.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
input {
  outline: none;
}
.custom-control {
  padding-left: 2rem !important;
}
.custom-control-input {
  width: 1.4rem !important;
  height: 1.4rem !important;
}
.custom-control-input:checked ~ .custom-control-label::before {
  background-image: url("~@/static/images/checked.png");
  background-color: transparent !important;
}
.checkbox-item-card {
  background-color: #f6f7f9;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  position: relative;
  .card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-item {
    flex: 1;
    color: #bdbfc2;
    font-size: 0.7rem;
  }
  .candidate-flag {
    position: absolute;
    background-color: var(--primary-custom);
    right: 0;
    display: inline-block;
    padding: 2px 10px;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    font-size: 0.7rem;
  }
}
@media (max-width: 320px) {
  .card-row {
    flex-direction: column;
  }
  .flex-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 3px 0;
  }
  .v-line {
    display: none;
  }
}
</style>
