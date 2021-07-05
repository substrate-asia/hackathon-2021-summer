import { atom } from 'recoil'

// 本地存储
const storage = window.localStorage;
const username = storage.scifanchain_username

export const navState = atom({
    key: 'nav',
    default: true,
});

export const usernameState = atom({
    key: 'username', 
    default: username,
});

export const mnemonicState = atom({
    key: 'mnemonic',
    default: '',
});