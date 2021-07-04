import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './RecordItem.module.css'

function RecordItem({ history }) {
    return (
        <div className={styles.body}>
            <div className ={styles.topView}>
                <div>
                    <div className={styles.txidLable}>
                        <span>Amount</span>
                    </div>
                    <span className={styles.txidContent}>305.81</span>
                </div>
                <div>
                    <div className={styles.txidLable}>
                        <span>Status</span>
                    </div>
                    <span className={styles.txidContent}>Success</span>
                </div>
                <div>
                    <div className={styles.txidLable}>
                        <span>Time</span>
                    </div>
                    <span className={styles.txidContent}>18:44 04/12</span>
                </div>
            </div>
            {/** txid */}
            <div>
                <div className={styles.txidLable}>
                    <span>Txid</span>
                </div>
                <span className={styles.txidContent}>dsxxxxxxxxxxxx</span>
            </div>
        </div>

    )
}

export default withRouter(RecordItem)

