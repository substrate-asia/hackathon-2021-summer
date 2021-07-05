import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function StageList () {
    const [loading, setLoading] = useState(true);
    const [stages, setStages] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer "+ token;
        axios.get('https://api.scifanchain.com/stages/')
            .then(function (response) {
                // 处理成功情况
                setLoading(false)
                setStages(response.data)
                setError('')
                console.log(response);
            })
            .catch(function (error) {
                // 处理错误情况
                setLoading(false)
                setStages([])
                setError('很抱歉，没有获取到数据！')
                console.log(error);
            });
    }, [])

    const stageList = stages.map((stage) => (
        <List.Item key={stage.id} as={Link} to={
            {
                pathname: '/stage/' + stage.id,
            }
        }>
            {stage.title}
        </List.Item>
    ));

  // history.push({ pathname: "/stage/" + stage.id })
    
    return(
        <div>
            { loading &&　
            <div className="text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">正在加载...</span>
                </div>
            </div>
            }

            {!loading && !error && 
                <List>{stageList}</List>
            }
        </div>
    )
}

export default StageList