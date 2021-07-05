import React, { useEffect, useState, createRef, createContext, useMemo } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { Grid, List, Header, Input, Button, GridColumn } from 'semantic-ui-react';
import axios from 'axios';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function StageEditor (props) {

  const history = useHistory();

  const {stage} = props
  const stageIsEmpty = JSON.stringify(stage) === '{}';

  const [stageTitle, setStageTitle] = useState('')
  const [stageContent, setStageContent] = useState('')

  const onBlurTitle = (e) => {
    setStageTitle(e.target.value)
    console.log(stageTitle)
  }

  const onChangeContent = (stageContent) => {
    setStageContent(stageContent);
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
    }
  }, []);

  // 提交
  const [method, setMethod] = useState('post')
  const [url, setUrl] = useState('https://api.scifanchain.com/stages/create_stage/')

  
  useEffect(() => {
    setStageTitle(stage.title)
    setStageContent(stage.content)

    if (!stageIsEmpty) {
      setMethod('put')
      setUrl('https://api.scifanchain.com/stages/' + stage.id)
    }

  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      title: stageTitle,
      content: stageContent,
    }

    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: method,
      url: url,
      data: submitData
    }).then(response => {
      // console.log(response)
      history.push({
        pathname: '/stage/' + response.data.id,
      })
      history.go();
      // console.log(response.data.refresh_token)
    }).catch(err => {
      console.log(err)
    });
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Input fluid placeholder='一个从脑海中浮同的想法...' style={{ marginBottom: '1rem' }} onBlur={onBlurTitle} value={stageTitle} />
          <SimpleMDE
            value={stageContent}
            onChange={onChangeContent}
            options={autofocusNoSpellcheckerOptions}
          />
          <Button.Group>
            <Button positive onClick={handleSubmit}>提交保存</Button>
            <Button.Or />
            <Button>重置</Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
