type Locales = Record<string, { zh: string; en: string }>;

import { mesonUseEn, mesonUseZh } from "@worktools/meson-form/lib/lingual/index";

export let localesData = {
  search: { zh: "搜索", en: "Search" },
  register: { zh: "注册", en: "Register" },
  details: { zh: "详情", en: "Details" },
  subdomains: { zh: "子域名", en: "Subdomains" },
  delete_subdomains: { zh: "删除子域名", en: "Delete Subdomain" },
  chinese: { zh: "中文", en: "Chinese" },
  english: { zh: "英文", en: "English" },
  new_names: { zh: "新域名", en: "New names" },
  favourites: { zh: "收藏", en: "Favourites" },
  my_names: { zh: "我的域名", en: "My names" },
  about: { zh: "关于", en: "About" },
  register_period: { zh: "注册时长", en: "Register Period" },
  register_price: { zh: "注册加个", en: "Register Price" },
  estimated_gas: { zh: "预计税", en: "Estimated Gas" },
  estimated_total: { zh: "总计", en: "Estimated Total" },
  estimated_total_details: { zh: "总计 (价格 + Ga税):", en: "Estimated Total (Price + Gas):" },
  request_register: { zh: "请求注册", en: "Request to Register" },
  reverse_record: { zh: "反向解析记录", en: "Reverse Record" },
  request_register_detial: {
    zh: "您的钱包将打开，您将被要求确认注册所需的两笔交易中的第一笔。 \n\n如果在第一笔交易的 24 小时内没有处理第二笔交易，您将需要从步骤 1 重新开始。",
    en: "Your wallet will open and you will be asked to confirm the first of two transactions required for registration. \n\nIf the second transaction is not processed within 24 hours of the first, you will need to start again from step 1.",
  },
  years: { zh: "年", en: "years" },
  connect_wallet: { zh: "连接钱包", en: "Connect Wallet" },
  connect_to_wallet: { zh: "连接钱包", en: "Connect to Wallet" },
  connect_to_metamask: { zh: "连接 Metamask", en: "Connect to Metamask" },

  my_address: { zh: "我的地址", en: "My Address" },

  disconnect_wallet: { zh: "退出钱包", en: "Disconnect Wallet" },
  search_your_domain: { zh: "搜索你想要的 Polkadot 域名", en: "Search for your polkadot domain" },
  expired: { zh: "已过期", en: "Expired" },
  expires_date: { zh: "过期时间", en: "Expires Date" },
  wait_1_min: { zh: "等待一分钟", en: "Wait for 1 minute" },
  wait_1_min_detail: {
    zh: "需要等待期以确保其他人没有尝试注册同名并在您提出请求后保护您。",
    en: "The waiting period is required to ensure another person hasn’t tried to register the same name and protect you after your request.",
  },

  complete_registration: { zh: "完成注册", en: "Complete Registration" },
  connect_your_wallets: { zh: "连接您的钱包", en: "Connect your wallet" },
  how_to_get_wallet: { zh: "如何创建一个钱包?", en: "How to get a Wallet?" },
  back: { zh: "返回", en: "Back" },
  exactly_match: { zh: "精确匹配", en: "Exactly match" },
  available: { zh: "可注册", en: "Available" },
  view_on_polkascan: { zh: "前往 Polkascan 查看", en: "View on Polkascan" },
  registrants: { zh: "注册者", en: "Registrants" },
  registrant: { zh: "注册者", en: "Registrant" },
  controllers: { zh: "域名控制者", en: "Controllers" },
  hint_increase_peroid: { zh: "每年增加注册期以避免gas费", en: "Increase registration period to avoid gas fee every year" },
  parent: { zh: "上级", en: "Parent" },
  registration: { zh: "注册", en: "Registration" },
  registration_period: { zh: "注册时长", en: "Registration Period" },
  registration_prise: { zh: "注册价格", en: "Registration Price" },
  controller: { zh: "域名控制者", en: "Controller" },
  resolver: { zh: "域名解析器", en: "Resolver" },
  at_least: { zh: "最少", en: "at least" },
  set: { zh: "设置", en: "Set" },
  name_details: { zh: "域名详情", en: "Name Details" },
  transfer: { zh: "转移", en: "Transfer" },
  not_set: { zh: "未设置", en: "not set" },
  tableIsEmpty: { zh: "表格没有数据", en: "Table is empty" },
  no_subdomains: { zh: "未添加子域名", en: "No subdomains have been added" },
  add_subdomain: { zh: "添加子域名", en: "Add New Subdomain" },
  type_in_subdomain_hint: { zh: "在此输入子域名的字段", en: "Type in a label for your subdomain" },
  type_in_subdomain_label: { zh: "输入子域名字段", en: "Enter subdomain label" },
  copied: { zh: "复制成功", en: "Copied" },
  renew: { zh: "续费", en: "Renew" },
  address: { zh: "地址", en: "Address" },
  content: { zh: "内容", en: "Content" },
  text_record: { zh: "文本记录", en: "Text Record" },
  notice: { zh: "通知", en: "Notice" },
  email: { zh: "邮箱", en: "Email" },
  url: { zh: "网址", en: "Url" },
  avatar: { zh: "头像", en: "Avatar" },
  edit_record: { zh: "编辑记录", en: "Edit Record" },
  save: { zh: "保存", en: "Save" },
  cancel: { zh: "取消", en: "Cancel" },
  set_controller: { zh: "设置域名控制者", en: "Set Controller" },
  set_resolver: { zh: "设置域名解析器", en: "Set Resolver" },
  name_register: { zh: "域名注册", en: "Name Register" },
  polkadot_name_address: { zh: "Polkadot 账户名或地址", en: "Polkadot name or address" },
  price_total_detail: { zh: "{x} ETH + at least {y} ETH gas fee", en: "{x} ETH + at least {y} ETH gas fee" },
  transfer_registration: { zh: "转移注册", en: "Transfer Registration" },
  hint_transfer_name: { zh: "输入 Polkadot 地址或者名称来用于转移", en: "Enter polkadot address or name to transfer" },
  hint_reserve_record: {
    zh: "反向解析将地址转换为名称。 \n\n它允许Dapps在他们的界面中显示'jiang.pns'而不是长地址'{id}'。 \n\n如果您想为不同的帐户设置反向，请在您的dapp浏览器中切换帐户",
    en: "The Reverse Resolution translates an address into a name. \n\nIt allows Dapps to show in their interfaces 'jiang.pns' rather than the long address '{id}'. \n\nIf you would like to set up your reverse for a different account, please switch accounts in your dapp browser",
  },
  edit_record_hint: {
    zh: "添加、删除或编辑一个或多个记录。在一笔交易中确认。",
    en: "Add, delete, or edit one or multiple records. Confirm in one transaction.",
  },
  learn_to_manage: { zh: "学习如何管理您的域名", en: "Learn How to Manage your Domain Names" },
  read_only: { zh: "只读", en: "Read Only" },
  connected_to_wallet: { zh: "已连接到钱包", en: "Connected to wallet" },
  disconnected_wallet: { zh: "已断开钱包", en: "Disconnected wallet" },
  during_processing: { zh: "仍在处理中", en: "Still processing" },
  x_is_invalid_name: { zh: '"{x}" 不是格式正确的域名地址', en: 'invalid domain name "{x}"' },
};

export let portalLocalesData = {
  connect_wallet: { zh: "连接到钱包", en: "Connect Wallet" },
  polkadot_name: { zh: "波卡\n域名系统.", en: "Polkadot\nName System" },
  search: { zh: "搜索", en: "Search" },
  search_domain_hint: { zh: "搜索你需要的波卡域名 例如 “polkadot”", en: "Search for your polkadot domain. Like “polkadot”" },
  what_is_pns: { zh: "什么是PNS？", en: "What is PNS Project?" },
  what_is_pns_explain: {
    zh: "PNS 是构建于 Polkadot 区块链平台之上开源、开放的域名系统。\n每个人都可以注册自己独一无二的个性化域名，并且解析到钱包账号、合约地址、NFT 资产、网址或者 IPFS 站点，成为穿梭 Web3 世界的通行证。",
    en: "PNS is an open, decentralized domain name system on the Polkadot blockchain.\nWith PNS, every user can have their on-chain unique name, and resolves to their wallet account, smart contract address, NFT token, URL or IPFS address. PNS is the universal passport of Web3 ecosystem.",
  },
  pns_features: { zh: "PNS 特性", en: "PNS Features" },
  uniqueness: { zh: "全局唯一", en: "Uniqueness" },
  uniqueness_explain: {
    zh: "使用 PNS 注册以 .pns 结尾的个性化域名，通过区块链保证全网唯一，并且可查询、可追溯、可验证",
    en: "Register your unique and personalized name ends with .pns, and also make it queryable, auditable and verifiable.",
  },
  decentralized: { zh: "去中心化", en: "Decentralized" },
  decentralized_explain: {
    zh: "PNS 域名运行在区块链上，无需许可，并且保证域名只有你能进行控制",
    en: "PNS is built on top of permissionless blockchain system, owned and controlled by the name owner.",
  },
  polkadot_integration: { zh: "深度集成 Polkadot 体系", en: "Polkadot Ecosystem Integration" },
  polkadot_integration_explain: {
    zh: "PNS 为波卡的生态体系设计，可以将多平行链上的身份聚合到同一个域名进行管理",
    en: "PNS is built for Polkadot and the parachain ecosystem. You can have multiple parachain identity binded to a single name.",
  },
  NFT_support: { zh: "NFT 支持", en: "NFT Support" },
  NFT_support_explain: {
    zh: "可以将 PNS 域名铸造为 NFT 进行交易，也可以为每一个 NFT 分配独有的域名",
    en: "Trade and exchange PNS name as NFT, and give every NFT a PNS name.",
  },
  extendable_resolvers: { zh: "自定义域名解析器", en: "Extendable Resolvers" },
  extendable_resolvers_explain: {
    zh: "将 PNS 域名解析到区块链账号，应用合约地址，IPFS，URL，邮箱或者社交账号，成为 Web3 的统一入口",
    en: "PNS names can be resolved to blockchain account, contract address, IPFS address, URL, email or social network account",
  },
  DNS_resolution: { zh: "DNS 解析", en: "DNS Resolution" },
  DNS_resolution_explain: {
    zh: "域名不光可以在链上查询，还可以通过 DNS 进行解析，通过浏览器直接访问解析内容，所以解析数据透明可验证",
    en: "PNS names can be accessed with DNS gateway and used in the browser without plugins.",
  },
  usage_scenarios: { zh: "使用场景", en: "Usage Scenarios" },
  usage_bind_account: {
    zh: "将PNS域名绑定到您的钱包帐户，添加联系人并转移令牌。",
    en: "Bind PNS name to your wallet account, add contacts, and transfer tokens.",
  },
  usage_access_DApp: { zh: "使用 PNS 名称访问 DApp 合约地址.", en: "Access DApp contract address with PNS name." },
  usage_unlimited_subnames: {
    zh: "为您的域创建无限子名称，例如 alice.myapp.pns",
    en: "Create unlimited sub name for your domain, like alice.myapp.pns",
  },
  usage_trade_pns: { zh: "通过交易和交换 PNS 域名", en: "Trade and exchange PNS name as NFT" },
  usage_unify_identities: {
    zh: "使用单个 PNS 名称统一多个链上身份。即使您在 Acala、Litentry、Ethereum 等上拥有帐户，也请使用一个名称来统治所有这些帐户。",
    en: "Unify multiple on-chain identity with a single PNS name. Even though you have accounts on Acala, Litentry, Ethereum and more, use one name to rule them all.",
  },
  usage_one_name_for_address: {
    zh: "One Name for Long Address",
    en: "One Name for Long Address",
  },
  usage_access_dapp_by_name: {
    zh: "Access DApp by Readable Name",
    en: "Access DApp by Readable Name",
  },
  usage_unify_multiple_chains: {
    zh: "Unify Multiple Chain",
    en: "Unify Multiple Chain",
  },
  usage_nft_support: {
    zh: "NFT Support",
    en: "NFT Support",
  },
  usage_unlimited_names: {
    zh: "Unlimited Sub Name",
    en: "Unlimited Sub Name",
  },
  search_your_domain_hint: { zh: "搜索\n你的波卡域名.", en: "Find Your\nPolkadot Domain." },
  overview: { zh: "概览", en: "General" },
  about: { zh: "关于", en: "About" },
  technology: { zh: "技术", en: "Technology" },
  support: { zh: "支持", en: "Support" },
  roadmap: { zh: "路线图", en: "Roadmap" },
  community: { zh: "社区", en: "Community" },
  documentation: { zh: "文档", en: "Documentation" },
  brand_assets: { zh: "品牌资源", en: "Brand Assets" },
  blog: { zh: "博客", en: "Blog" },
  links: { zh: "链接", en: "Links" },
};
// extract types
type LocaleK = keyof typeof localesData;
type PortalLocaleK = keyof typeof portalLocalesData;
let langData: Record<LocaleK, string> = {} as any;
let portalLangData: Record<PortalLocaleK, string> = {} as any;

let copyLang = (kind: LanguageKind) => {
  if (kind === "zh") {
    for (let k in localesData) {
      let v = (localesData as Locales)[k];
      (langData as any)[k] = v.zh; // dirty
    }
    for (let k in portalLocalesData) {
      let v = (portalLocalesData as Locales)[k];
      (portalLangData as any)[k] = v.zh; // dirty
    }
    mesonUseZh();
  } else {
    for (let k in localesData) {
      let v = (localesData as Locales)[k];
      (langData as any)[k] = v.en; // dirty
    }
    for (let k in portalLocalesData) {
      let v = (portalLocalesData as Locales)[k];
      (portalLangData as any)[k] = v.en; // dirty
    }
    mesonUseEn();
  }
};

/** replace interpolation in locale */
export let formatLocale = (locale: string, fields: Record<string, string>) => {
  let result = locale;
  for (let k in fields) {
    result = result.replace(`{${k}}`, fields[k]); // only once
  }
  return result;
};

const LANG_STORAGE_KEY = "pns_language_preference";

export type LanguageKind = "en" | "zh";

let pickLang = (): LanguageKind => {
  let v: string = localStorage.getItem(LANG_STORAGE_KEY);
  if (/zh/i.test(v)) {
    return "zh";
  }
  if (/zh/i.test(navigator.language)) {
    // very rough detection
    return "zh";
  }
  return "en";
};

// source of truth
export let cachesLanguagePreference: LanguageKind = pickLang();

copyLang(cachesLanguagePreference);

export let getLanguagePreference = () => {
  return cachesLanguagePreference;
};

export let setLanguagePreference = (kind: LanguageKind) => {
  localStorage.setItem(LANG_STORAGE_KEY, kind);
  console.info("Keep in storage: lang=", kind);
};

// TODO, decide language

export let lang = langData;
export let portalLang = portalLangData;
