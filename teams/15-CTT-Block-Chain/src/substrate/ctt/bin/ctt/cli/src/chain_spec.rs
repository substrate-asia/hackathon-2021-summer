// This file is part of Substrate.

// Copyright (C) 2018-2020 Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

//! Substrate chain configurations.

use grandpa_primitives::AuthorityId as GrandpaId;
use hex_literal::hex;
use node_runtime::constants::currency::*;
use node_runtime::Block;
use node_runtime::{
    wasm_binary_unwrap, AuthorityDiscoveryConfig, BabeConfig, BalancesConfig, ContractsConfig,
    CouncilConfig, DemocracyConfig, ElectionsConfig, GrandpaConfig, ImOnlineConfig, IndicesConfig,
    KpConfig, MembersConfig, SessionConfig, SessionKeys, SocietyConfig, StakerStatus,
    StakingConfig, SudoConfig, SystemConfig, TechnicalCommitteeConfig, TreasuryFin, TreasuryMod,
    TreasuryTech,
};
use pallet_im_online::sr25519::AuthorityId as ImOnlineId;
use sc_chain_spec::ChainSpecExtension;
use sc_service::{ChainType, Properties};
use sc_telemetry::TelemetryEndpoints;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sp_authority_discovery::AuthorityId as AuthorityDiscoveryId;
use sp_consensus_babe::AuthorityId as BabeId;
use sp_core::{crypto::UncheckedInto, sr25519, Pair, Public};
use sp_runtime::{
    traits::{IdentifyAccount, Verify},
    Perbill,
};

pub use node_primitives::{AccountId, Balance, Signature};
pub use node_runtime::GenesisConfig;

type AccountPublic = <Signature as Verify>::Signer;

const STAGING_TELEMETRY_URL: &str = "wss://telemetry.polkadot.io/submit/";

/// Node `ChainSpec` extensions.
///
/// Additional parameters for some Substrate core modules,
/// customizable from the chain spec.
#[derive(Default, Clone, Serialize, Deserialize, ChainSpecExtension)]
#[serde(rename_all = "camelCase")]
pub struct Extensions {
    /// Block numbers with known hashes.
    pub fork_blocks: sc_client_api::ForkBlocks<Block>,
    /// Known bad block hashes.
    pub bad_blocks: sc_client_api::BadBlocks<Block>,
}

/// Specialized `ChainSpec`.
pub type ChainSpec = sc_service::GenericChainSpec<GenesisConfig, Extensions>;
/// Flaming Fir testnet generator
pub fn flaming_fir_config() -> Result<ChainSpec, String> {
    ChainSpec::from_json_bytes(&include_bytes!("../res/flaming-fir.json")[..])
}

fn session_keys(
    grandpa: GrandpaId,
    babe: BabeId,
    im_online: ImOnlineId,
    authority_discovery: AuthorityDiscoveryId,
) -> SessionKeys {
    SessionKeys {
        grandpa,
        babe,
        im_online,
        authority_discovery,
    }
}

fn staging_testnet_config_genesis() -> GenesisConfig {
    // stash, controller, session-key
    let initial_authorities: Vec<(
        AccountId,
        AccountId,
        GrandpaId,
        BabeId,
        ImOnlineId,
        AuthorityDiscoveryId,
    )> = vec![
        (
            // 5HNSzWPh9jJngEbwN35qPaZ1L2cQvyMrGEkwFYLwazeenJEH
            hex!["eab58b85646653025a7aa2fbfbd566a99230d65289675a4d1fa5cfbbd16cc812"].into(),
            // 5HdvEEyHXxKHWt15LizRBEWkL8N3BozGwziXa23k5xEGS7xw
            hex!["f681e9cdbaea0fbd7f9e1a081eb78a5c2316829a82ff48eb3e4d9a44aefc5e14"].into(),
            // 5Gj94uPbYGgvzFh42mxdsHbEPeDB6MR56adBoLZ5EciZty8L
            hex!["ce412076e386503425654aed46a42a72b4afb2bdbf63f955c69c41892f87cb8f"]
                .unchecked_into(),
            // 5HNSzWPh9jJngEbwN35qPaZ1L2cQvyMrGEkwFYLwazeenJEH
            hex!["eab58b85646653025a7aa2fbfbd566a99230d65289675a4d1fa5cfbbd16cc812"]
                .unchecked_into(),
            // 5HNSzWPh9jJngEbwN35qPaZ1L2cQvyMrGEkwFYLwazeenJEH
            hex!["eab58b85646653025a7aa2fbfbd566a99230d65289675a4d1fa5cfbbd16cc812"]
                .unchecked_into(),
            // 5HNSzWPh9jJngEbwN35qPaZ1L2cQvyMrGEkwFYLwazeenJEH
            hex!["eab58b85646653025a7aa2fbfbd566a99230d65289675a4d1fa5cfbbd16cc812"]
                .unchecked_into(),
        ),
        (
            // 5E9T6mVvgrBhfbDJN1Hau1xoGZxquFroEvukDKpAoJAQgdwz
            hex!["5c17048ae329f3d5ddae8532d30ef5d574d1a4dd0a20c4881fc805931971a03f"].into(),
            // 5DZLq7gpzHfSpNruFamZKpUVnreNjB7z4E8uSLApJ36xjCWD
            hex!["42139158e68737d34d6db85cc12dce1f14a5d9a4d11192c156bf04e905022f16"].into(),
            // 5EbhjmyJwmfMcjwvCdAfhe3isMTArPHV6i68cnrUjsEXb1QB
            hex!["701caca5609146c095c83634bda9011edc6b1df134d8fb2e32f2557faaa4b2dd"]
                .unchecked_into(),
            // 5E9T6mVvgrBhfbDJN1Hau1xoGZxquFroEvukDKpAoJAQgdwz
            hex!["5c17048ae329f3d5ddae8532d30ef5d574d1a4dd0a20c4881fc805931971a03f"]
                .unchecked_into(),
            // 5E9T6mVvgrBhfbDJN1Hau1xoGZxquFroEvukDKpAoJAQgdwz
            hex!["5c17048ae329f3d5ddae8532d30ef5d574d1a4dd0a20c4881fc805931971a03f"]
                .unchecked_into(),
            // 5E9T6mVvgrBhfbDJN1Hau1xoGZxquFroEvukDKpAoJAQgdwz
            hex!["5c17048ae329f3d5ddae8532d30ef5d574d1a4dd0a20c4881fc805931971a03f"]
                .unchecked_into(),
        ),
    ];

    // generated with secret: subkey inspect "$secret"/fir
    let root_key: AccountId = hex![
        // 5FcBV9rczxcFLYFhxkuYnWHVi8UTt9DMqxhwkps1xeRgX7dP
        "9cb650c86e586c0c3791df694ac610a0adfaeeacdae856668186bef833dccf59"
    ]
    .into();

    let endowed_accounts: Vec<AccountId> = vec![root_key.clone()];

    testnet_genesis(
        initial_authorities,
        root_key,
        Some(endowed_accounts),
        false,
        vec![
            hex!["f681e9cdbaea0fbd7f9e1a081eb78a5c2316829a82ff48eb3e4d9a44aefc5e14"].into(),
            hex!["42139158e68737d34d6db85cc12dce1f14a5d9a4d11192c156bf04e905022f16"].into(),
        ],
    )
}

/// Staging testnet config.
pub fn staging_testnet_config() -> ChainSpec {
    let boot_nodes = vec![];
    ChainSpec::from_genesis(
        "Staging Testnet",
        "staging_testnet",
        ChainType::Live,
        staging_testnet_config_genesis,
        boot_nodes,
        Some(
            TelemetryEndpoints::new(vec![(STAGING_TELEMETRY_URL.to_string(), 0)])
                .expect("Staging telemetry url is valid; qed"),
        ),
        None,
        chain_properties(),
        Default::default(),
    )
}

/// Helper function to generate a crypto pair from seed
pub fn get_from_seed<TPublic: Public>(seed: &str) -> <TPublic::Pair as Pair>::Public {
    TPublic::Pair::from_string(&format!("//{}", seed), None)
        .expect("static values are valid; qed")
        .public()
}

/// Helper function to generate an account ID from seed
pub fn get_account_id_from_seed<TPublic: Public>(seed: &str) -> AccountId
where
    AccountPublic: From<<TPublic::Pair as Pair>::Public>,
{
    AccountPublic::from(get_from_seed::<TPublic>(seed)).into_account()
}

/// Helper function to generate stash, controller and session key from seed
pub fn authority_keys_from_seed(
    seed: &str,
) -> (
    AccountId,
    AccountId,
    GrandpaId,
    BabeId,
    ImOnlineId,
    AuthorityDiscoveryId,
) {
    (
        get_account_id_from_seed::<sr25519::Public>(&format!("{}//stash", seed)),
        get_account_id_from_seed::<sr25519::Public>(seed),
        get_from_seed::<GrandpaId>(seed),
        get_from_seed::<BabeId>(seed),
        get_from_seed::<ImOnlineId>(seed),
        get_from_seed::<AuthorityDiscoveryId>(seed),
    )
}

/// Helper function to create GenesisConfig for testing
pub fn testnet_genesis(
    initial_authorities: Vec<(
        AccountId,
        AccountId,
        GrandpaId,
        BabeId,
        ImOnlineId,
        AuthorityDiscoveryId,
    )>,
    root_key: AccountId,
    endowed_accounts: Option<Vec<AccountId>>,
    enable_println: bool,
    _auth_servers: Vec<AccountId>,
) -> GenesisConfig {
    let endowed_accounts: Vec<AccountId> = endowed_accounts.unwrap_or_else(|| {
        vec![
            get_account_id_from_seed::<sr25519::Public>("Alice"),
            get_account_id_from_seed::<sr25519::Public>("Bob"),
            get_account_id_from_seed::<sr25519::Public>("Charlie"),
            //get_account_id_from_seed::<sr25519::Public>("Dave"),
            //get_account_id_from_seed::<sr25519::Public>("Eve"),
            //get_account_id_from_seed::<sr25519::Public>("Ferdie"),
            get_account_id_from_seed::<sr25519::Public>("Alice//stash"),
            get_account_id_from_seed::<sr25519::Public>("Bob//stash"),
            get_account_id_from_seed::<sr25519::Public>("Charlie//stash"),
            //get_account_id_from_seed::<sr25519::Public>("Dave//stash"),
            //get_account_id_from_seed::<sr25519::Public>("Eve//stash"),
        ]
    });
    let num_endowed_accounts = endowed_accounts.len();

    const INITIAL_VALIDATOR_STAKING: Balance = 4000 * DOLLARS;
    const INITIAL_VALIDATOR_CONTROLLER: Balance = 1000 * DOLLARS;

    // initial staking balance
    let mut balances: Vec<(AccountId, Balance)> = initial_authorities
        .iter()
        .map(|x| (x.0.clone(), INITIAL_VALIDATOR_STAKING))
        .collect();

    let balances_ctrl: Vec<(AccountId, Balance)> = initial_authorities
        .iter()
        .map(|x| (x.1.clone(), INITIAL_VALIDATOR_CONTROLLER))
        .collect();

    let stash_total = initial_authorities.len() as Balance
        * (INITIAL_VALIDATOR_STAKING + INITIAL_VALIDATOR_CONTROLLER);

    let individual_balances: Vec<(AccountId, Balance)> = vec![
        // fund balances
        (TreasuryFin::account_id(), 500_000_000 * DOLLARS),
        (TreasuryTech::account_id(), 99_000_000 * DOLLARS),
        (TreasuryMod::account_id(), 300_000_000 * DOLLARS),
        (
            // py/acmod 5EYCAe5ijiYdQFKVTyae1wy3ne6CrutrAFZyN3bZsqrhf7jB
            hex!["6d6f646c70792f61636d6f640000000000000000000000000000000000000000"].into(),
            100_000_000 * DOLLARS,
        ),
        // initial sudo balance
        (
            // 5FcBV9rczxcFLYFhxkuYnWHVi8UTt9DMqxhwkps1xeRgX7dP
            hex!["9cb650c86e586c0c3791df694ac610a0adfaeeacdae856668186bef833dccf59"].into(),
            1_000_000 * DOLLARS - stash_total,
        ),
    ];

    balances = balances
        .iter()
        .cloned()
        .chain(balances_ctrl)
        .chain(individual_balances.iter().cloned())
        .collect();

    GenesisConfig {
        frame_system: Some(SystemConfig {
            code: wasm_binary_unwrap().to_vec(),
            changes_trie_config: Default::default(),
        }),
        pallet_balances: Some(BalancesConfig { balances }),
        pallet_indices: Some(IndicesConfig { indices: vec![] }),
        pallet_session: Some(SessionConfig {
            keys: initial_authorities
                .iter()
                .map(|x| {
                    (
                        x.0.clone(),
                        x.0.clone(),
                        session_keys(x.2.clone(), x.3.clone(), x.4.clone(), x.5.clone()),
                    )
                })
                .collect::<Vec<_>>(),
        }),
        pallet_staking: Some(StakingConfig {
            validator_count: initial_authorities.len() as u32,
            minimum_validator_count: initial_authorities.len() as u32,
            stakers: initial_authorities
                .iter()
                .map(|x| {
                    (
                        x.0.clone(), // Stash
                        x.1.clone(), // Controller
                        INITIAL_VALIDATOR_STAKING,
                        StakerStatus::Validator,
                    )
                })
                .collect(),
            invulnerables: initial_authorities.iter().map(|x| x.0.clone()).collect(),
            slash_reward_fraction: Perbill::from_percent(10),
            ..Default::default()
        }),
        pallet_democracy: Some(DemocracyConfig::default()),
        pallet_elections_phragmen: Some(ElectionsConfig {
            members: endowed_accounts
                .iter()
                .take((num_endowed_accounts + 1) / 2)
                .cloned()
                .map(|member| (member, INITIAL_VALIDATOR_STAKING))
                .collect(),
        }),
        pallet_collective_Instance1: Some(CouncilConfig::default()),
        pallet_collective_Instance2: Some(TechnicalCommitteeConfig {
            members: endowed_accounts
                .iter()
                .take((num_endowed_accounts + 1) / 2)
                .cloned()
                .collect(),
            phantom: Default::default(),
        }),
        pallet_contracts: Some(ContractsConfig {
            current_schedule: pallet_contracts::Schedule {
                enable_println, // this should only be enabled on development chains
                ..Default::default()
            },
        }),
        pallet_sudo: Some(SudoConfig { key: root_key }),
        pallet_babe: Some(BabeConfig {
            authorities: vec![],
        }),
        pallet_im_online: Some(ImOnlineConfig { keys: vec![] }),
        pallet_authority_discovery: Some(AuthorityDiscoveryConfig { keys: vec![] }),
        pallet_grandpa: Some(GrandpaConfig {
            authorities: vec![],
        }),
        pallet_membership_Instance1: Some(Default::default()),
        pallet_treasury_Instance1: Some(Default::default()),
        pallet_treasury_Instance2: Some(Default::default()),
        pallet_treasury_Instance3: Some(Default::default()),
        pallet_treasury_Instance4: Some(Default::default()),
        pallet_society: Some(SocietyConfig {
            members: endowed_accounts
                .iter()
                .take((num_endowed_accounts + 1) / 2)
                .cloned()
                .collect(),
            pot: 0,
            max_members: 999,
        }),
        pallet_vesting: Some(Default::default()),
        kp: Some(KpConfig {
            app_id_range: vec![
                (b"default".to_vec(), (100000000, 0 * DOLLARS, 1, 0, 0)),
                (
                    b"commodity_general".to_vec(),
                    //(100010000, 1_000_000 * DOLLARS, 0, 0, 100),
                    (100010000, 1 * DOLLARS, 0, 0, 100), // for test
                ),
                (
                    b"commodity_vertical".to_vec(),
                    (100020000, 500_000 * DOLLARS, 0, 0, 20),
                ),
                (
                    b"commodity_special".to_vec(),
                    (100030000, 1_000_000 * DOLLARS, 0, 0, 10),
                ),
                (
                    b"service_education".to_vec(),
                    (200010000, 500_000 * DOLLARS, 0, 0, 20),
                ),
                (
                    b"service_health".to_vec(),
                    (200020000, 500_000 * DOLLARS, 0, 0, 20),
                ),
                (
                    b"service_finance".to_vec(),
                    (200030000, 1_000_000 * DOLLARS, 0, 0, 20),
                ),
                (
                    b"service_medicine".to_vec(),
                    (200040000, 1_000_000 * DOLLARS, 0, 0, 50),
                ),
                (
                    b"governance_legal".to_vec(),
                    (300010000, 500_000 * DOLLARS, 0, 0, 20),
                ),
                (
                    b"governance_rules".to_vec(),
                    (300020000, 500_000 * DOLLARS, 0, 0, 20),
                ),
                (b"misc".to_vec(), (400010000, 1_000_000 * DOLLARS, 0, 0, 10)),
            ],
        }),
        members: Some(MembersConfig {
            finance_root: hex![
                // sudo
                "9cb650c86e586c0c3791df694ac610a0adfaeeacdae856668186bef833dccf59"
            ]
            .into(),
        }),
    }
}

fn development_config_genesis() -> GenesisConfig {
    testnet_genesis(
        vec![authority_keys_from_seed("Alice")],
        get_account_id_from_seed::<sr25519::Public>("Alice"),
        None,
        true,
        vec![
            get_account_id_from_seed::<sr25519::Public>("Alice"),
            get_account_id_from_seed::<sr25519::Public>("Bob"),
        ],
    )
}

/// Development config (single validator Alice)
pub fn development_config() -> ChainSpec {
    ChainSpec::from_genesis(
        "Development",
        "dev",
        ChainType::Development,
        development_config_genesis,
        vec![],
        None,
        None,
        chain_properties(),
        Default::default(),
    )
}

fn local_testnet_genesis() -> GenesisConfig {
    testnet_genesis(
        vec![
            authority_keys_from_seed("Alice"),
            authority_keys_from_seed("Bob"),
        ],
        get_account_id_from_seed::<sr25519::Public>("Alice"),
        None,
        false,
        vec![
            get_account_id_from_seed::<sr25519::Public>("Alice"),
            get_account_id_from_seed::<sr25519::Public>("Bob"),
        ],
    )
}

/// Local testnet config (multivalidator Alice + Bob)
pub fn local_testnet_config() -> ChainSpec {
    ChainSpec::from_genesis(
        "Local Testnet",
        "local_testnet",
        ChainType::Local,
        local_testnet_genesis,
        vec![],
        None,
        None,
        None,
        Default::default(),
    )
}

fn chain_properties() -> Option<Properties> {
    //None
    let mut p = Properties::new();
    p.insert("tokenDecimals".to_string(), json!(14));
    p.insert("tokenSymbol".to_string(), json!("KPT"));
    Some(p)
}

#[cfg(test)]
pub(crate) mod tests {
    use super::*;
    use crate::service::{new_full_base, new_light_base, NewFullBase};
    use sc_service_test;
    use sp_runtime::BuildStorage;

    fn local_testnet_genesis_instant_single() -> GenesisConfig {
        testnet_genesis(
            vec![authority_keys_from_seed("Alice")],
            get_account_id_from_seed::<sr25519::Public>("Alice"),
            None,
            false,
            vec![
                get_account_id_from_seed::<sr25519::Public>("Alice"),
                get_account_id_from_seed::<sr25519::Public>("Bob"),
            ],
        )
    }

    /// Local testnet config (single validator - Alice)
    pub fn integration_test_config_with_single_authority() -> ChainSpec {
        ChainSpec::from_genesis(
            "Integration Test",
            "test",
            ChainType::Development,
            local_testnet_genesis_instant_single,
            vec![],
            None,
            None,
            None,
            Default::default(),
        )
    }

    /// Local testnet config (multivalidator Alice + Bob)
    pub fn integration_test_config_with_two_authorities() -> ChainSpec {
        ChainSpec::from_genesis(
            "Integration Test",
            "test",
            ChainType::Development,
            local_testnet_genesis,
            vec![],
            None,
            None,
            None,
            Default::default(),
        )
    }

    #[test]
    #[ignore]
    fn test_connectivity() {
        sc_service_test::connectivity(
            integration_test_config_with_two_authorities(),
            |config| {
                let NewFullBase {
                    task_manager,
                    client,
                    network,
                    transaction_pool,
                    ..
                } = new_full_base(config, |_, _| ())?;
                Ok(sc_service_test::TestNetComponents::new(
                    task_manager,
                    client,
                    network,
                    transaction_pool,
                ))
            },
            |config| {
                let (keep_alive, _, client, network, transaction_pool) = new_light_base(config)?;
                Ok(sc_service_test::TestNetComponents::new(
                    keep_alive,
                    client,
                    network,
                    transaction_pool,
                ))
            },
        );
    }

    #[test]
    fn test_create_development_chain_spec() {
        development_config().build_storage().unwrap();
    }

    #[test]
    fn test_create_local_testnet_chain_spec() {
        local_testnet_config().build_storage().unwrap();
    }

    #[test]
    fn test_staging_test_net_chain_spec() {
        staging_testnet_config().build_storage().unwrap();
    }
}
