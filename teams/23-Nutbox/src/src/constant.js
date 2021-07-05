import BN from 'bn.js'

export const BLOCK_SECOND = 6

export const POLKADOT_DECIMAL = 10
export const KUSAMA_DECIMAL = 12
export const ROCOCO_DECIMAL = 12

export const TIME_PERIOD = {
    MINUTES:60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
    MONTH: 2592000,
}

export const POLKADOT_RELAYCHAIN_SYMBOL = {
    polkadot: 'DOT',
    kusama: 'KSM',
    rococo: 'ROC'
}

export const API_CONNECT_STATE = {
    CONNECT_INIT: 'CONNECT_INIT',
    CONNECT: 'CONNECT',
    CONNECT_SUCCESS: 'CONNECT_SUCCESS',
    CONNECT_ERROR:'CONNECT_ERROR'
}

export const DECIMAL = {
    polkadot: new BN(POLKADOT_DECIMAL),
    kusama: new BN(KUSAMA_DECIMAL),
    rococo: new BN(ROCOCO_DECIMAL)
}

// 最大投票数
export const MAX_NOMINATE_VALIDATOR = 16