import React, { useEffect, useState, createRef } from 'react';
import { Grid, Container, Header } from 'semantic-ui-react';
import axios from 'axios'
import qs from 'qs'
import TheBook from './story/TheBook';


const contextRef = createRef();


function Galaxy() {

   return (
        <div ref={contextRef} style={{padding: '2rem'}}>
       <Container fluid>
         <Header as='h2'>银河书：意谛的涌现</Header>
         <p>
           银河星旋的人类文明高度发达，数百万计的文明星球在璀璨银河生生不息，体现着创造主的荣耀。人类不断提开宇宙的奥秘，其中一个里程碑式的重大发现是意识的神秘载体——意子。然而由于缺失信仰的指引，人类迷失在技术牢笼中，滥用意子科技创造了一个邪恶的意频网络，它弥漫星空，监视、控制和利用每一个人的意识，并最终自行进化出一个代表所有人的超级客观意识存在——意谛。意谛以超乎想象的方式加速星河进化，禁锢人类的灵魂，利用人类的理性智慧，妄图取代不可知的创造者，成为一个无所不能、拥有无上威权的宇宙统治者。人类进退维谷，在人工智能、硅基生命体主导的所谓星河时代，遇到无法克服的生存困境。
          </p>
          <p>
           无数仁人志士试图反抗意谛，但由于意频网络无处不在，意谛洞悉每个人的思想意识，反抗行动艰险重重，毫无希望。在无边的黑暗，只有一缕希望之光能激发人们的信念，那就是关于探寻者的预言：一些孩子们将带着时代之门开启的信息现身在特定的星域，带领人类认识创造者的真正指引，回归到正确发文明发展航道。围绕着探寻者预言，残存的抗争者们合作起来，精心制定了长达6千年的“靠岸计划”来迎接探寻的孩子们，意谛对此了如指掌，它播下重重迷雾，布下陷阱准备将抗争者一网打尽，并利用人类精英们在反抗过程中迸发的潜能，完成最后的终极进化。</p>
          <p>
           来自低等星球的雕刻匠阿明-穆法帕里、来自迷蓝水域的天才小公主涅摩叶、流落星际的少年黑客蒙释玛等三个少年，经由奇妙的命运安排，居然出乎意料地在这场预言之战中，发现了时代之门的真正含义，他们闯荡星河世界，在各路英雄们的支持帮助下，冲破重重障碍，共同发现了隐藏在星河间的神圣文明和强大力量，依造来自内心正义的指引，他们带领抗争者们战胜重重困难，最终摆脱超级智能意谛的奴役，从沉沦虚空幻灭的边缘险境重新踏上光明之路。
         </p>
       </Container>
        <Grid style={{marginTop: '2rem'}}>
            <Grid.Row>
            <Grid.Column width={3}>
                <TheBook ></TheBook>
            </Grid.Column>
                <Grid.Column width={8}>
                    <span>galaxy</span>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </div>
    )
}

export default Galaxy