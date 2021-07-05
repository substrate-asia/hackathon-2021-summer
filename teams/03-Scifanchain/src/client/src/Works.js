import React, { useEffect, useState, createRef } from 'react';
import { Grid, } from 'semantic-ui-react';
import axios from 'axios'

const contextRef = createRef();

function Works() {

    return (
        
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div>
                            输入文本: 
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default Works