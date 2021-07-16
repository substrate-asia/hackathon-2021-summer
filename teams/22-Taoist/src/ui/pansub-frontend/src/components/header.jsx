import React, {useState, useEffect} from 'react';
import {useSubstrate} from "../api/contracts";

import Accounts from '../api/Account';

import { Row, Col, Select } from 'antd';
import logo from '../images/logo.png'

import { UserOutlined,GiftOutlined } from '@ant-design/icons';

const { Option } = Select;


export default function Header(){
    const {state,dispatch} = useSubstrate();
    const {myAccount} = state;

    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
            dispatch({type: 'SET_ALLACCOUNTS',payload:selectedStorage});
        }
    }, []);

    const onGenderChange = (e) => {
        let selected = allList.filter(i => i.address === e);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));

        dispatch({type: 'SET_ALLACCOUNTS',payload:selected});
    };

    const connectWallet = async () => {
        const accoutlist = await Accounts.accountlist();
        setallList(accoutlist);

    }
    return(<div className='header'>
        <Row>
            <Col span={12} className='headerlft'>
                <img src={logo} alt=""/>
            </Col>
            <Col span={12} className='headerRht'>
                {
                    !selected.length &&!allList.length && <button  className='topBtn'  onClick={connectWallet}>
                        Connect Wallet
                    </button>
                }

                {
                    !selected.length &&!!allList.length && <Select
                        placeholder="Select a option"
                        onChange={(e)=>onGenderChange(e)}
                        className='ant-select-lg'
                        allowClear
                    >
                        {
                            allList.map((opt) =>
                                <Option value={opt.address} key={opt.address}>{opt.meta.name}</Option>
                            )
                        }
                    </Select>
                }
                {!!selected.length &&
                <div className='topName'>Hi, <span className='username'><UserOutlined />{selected[0].meta.name}</span> <span className='credit'><GiftOutlined />43254</span></div>
                }
            </Col>
        </Row>
    </div>)
}
