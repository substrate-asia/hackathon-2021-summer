import React, {useState, useEffect} from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Accounts from '../api/Account';

import {useSubstrate} from "../api/contracts";



export default function UploadFile(){
    const {state,dispatch} = useSubstrate();
    const {myAccount} = state;

    const { Dragger } = Upload;

    let acc = ''
    if(myAccount && myAccount.length){
        acc = myAccount[0].address
    }
    const props = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:4000/upload',
        data:{
            uploader: acc
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log("====")
                dispatch({type: 'SET_ADDNEW'});
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        async onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);

        },
    };

    return(<div >

        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading  data or other
                band files
            </p>
        </Dragger>

    </div>)
}
