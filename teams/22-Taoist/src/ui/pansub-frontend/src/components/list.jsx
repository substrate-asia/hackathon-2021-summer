import { CopyOutlined,BarsOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { Modal, message, Tooltip,Button } from 'antd';
import React, { useState,useEffect } from 'react';
import api from '../api/indexApi'
import {useSubstrate} from "../api/contracts";

export default function List(){
    const {state,dispatch} = useSubstrate();
    const {addnew} = state;

    const [visible, setvisible] = useState(false);

    const [Name, setName] = useState('');
    const [Size, setSize] = useState('');
    const [Uploader, setUploader] = useState('');
    const [Checksum, setChecksum] = useState('');
    const [hash, setHash] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        getList()
    }, []);

    useEffect(() => {
        if(!addnew)return
        setTimeout(()=>{
            getList()
        },1000)

        dispatch({type: 'FINISHED_ADDNEW'});
    }, [addnew]);
    const getList = async () =>{
       let result =  await api.listfiles();
       let arr = [...list];
        if(result.status === 'ok'){
            arr.push(...result.data)
            setList(arr)
        }
    }
    const change = (num) => {
        let limit = parseInt(num.replace(/,/g,''));

        let size = "";
        if(limit < 0.1 * 1024){
            size = limit.toFixed(2) + "B"
        }else if(limit < 0.1 * 1024 * 1024){
            size = (limit/1024).toFixed(2) + "KB"
        }else if(limit < 0.1 * 1024 * 1024 * 1024){
            size = (limit/(1024 * 1024)).toFixed(2) + "MB"
        }else{
            size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
        }

        let sizeStr = size + "";
        let index = sizeStr.indexOf(".");
        let dou = sizeStr.substr(index + 1 ,2);
        if(dou === "00"){
            return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
        }
        return size;
    }

    const initTypeOfFile = (name) => {
        let typeArr = name.split('.');
        let type = typeArr[typeArr.length-1];
        let str;
        switch (type) {
            case 'jpg':
            case 'png':
            case 'bmp':
            case 'jpeg':
            case 'gif':
            case 'jfif':
            case 'tif':
            case 'tiff':
            case 'svg':
                str='icon-format_image';
                break;
            case 'doc':
            case 'docx':
                str='icon-format_doc';
                break;
            case 'ppt':
            case 'pptx':
                str='icon-format_ppt';
                break;
            case 'pdf':
                str='icon-format_pdf';
                break;
            case 'mp3':
            case 'wma':
            case 'amr':
            case 'mid':
                str='icon-format_mp';
                break;
            case 'zip':
            case 'rar':
            case '7z':
                str='icon-format_zip';
                break;
            case '3gp':
            case 'mp4':
            case 'avi':
            case 'rmvb':
            case 'mov':
                str='icon-format_video';
                break;
            case 'html':
            case 'htm':
                str='icon-format_html';
                break;
            case 'xls':
            case 'xlsx':
                str='icon-format_excel';
                break;
            case 'txt':
                str='icon-format_txt';
                break;
            default:
                str='icon-format_default';
                break;

        }
        return `iconfont ${str} `
    }
    let operation = true;
    const copyId = (id) => {

        if(operation){
            operation = false
            const cInput = document.createElement('input');
            cInput.setAttribute('id', 'copyLayer');
            cInput.value = id;
            document.body.appendChild(cInput);
            cInput.select();
            document.execCommand('Copy');

            const thisNode = document.getElementById('copyLayer');
            thisNode.parentNode.removeChild(thisNode);

            message.success('file\'s hash is copied to clipboard.',2);
            setTimeout(()=>{
                operation = true;
            },1500)
        }

    }
    const hideModal = (id) => {
        setvisible(false)

    }
    const showModal = (obj) => {
        let { name,size, uploader,hash} = obj
        setvisible(true)
        setName(name)
        setSize(change(size))
        setUploader(uploader)
        setHash(hash)

    }
    return(<div className='list'>
            <Modal
                title={[<div><InfoCircleOutlined /> <span className='info'>File's Information</span></div>]}
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
                bodyStyle={{background:'#000',color:'#cecfd2'}}
                centered={true}
                cancelText={true}
                maskClosable={false}
                className='modalBrdr'
            >
                <p><span>Name:</span>{Name}</p>
                <p><span>Size:</span>{Size}</p>
                <p><span>Uploader:</span>{Uploader}</p>
                <p><span>hash:</span>{hash}</p>
            </Modal>
            <ul>
                {
                    list.map(item=> <li key={`filelist_${item.id}`}>
                        <div className='overEllipse'>
                            <i className={initTypeOfFile(item.name)} />{item.name}</div>
                        <div className='clickBtn'>
                            <Tooltip placement="top" title="copy to clipboard" zIndex={999999}>
                                <CopyOutlined onClick={()=>copyId(item.hash)} />
                            </Tooltip>
                            <BarsOutlined onClick={()=>showModal(item)} />
                        </div>
                    </li>)
                }



            </ul>
            {/*<div className='loadingMore'>*/}
            {/*    <Button type="primary" ghost={true}>loading more</Button>*/}
            {/*</div>*/}
    </div>)
}
