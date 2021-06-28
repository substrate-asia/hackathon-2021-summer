import { SearchBar, } from 'antd-mobile'
import styles from './mine.module.css'
import edit from '../../images/icon_edit.png'
import event from '../../images/my_event.png'
import price from '../../images/my_wallets.png'
import right from '../../images/icon_right.png'
function Mine() {
  return (
    <div className={styles.body}>
      <SearchBar className={styles.searchBar} placeholder="Search" maxLength={8} />
      {/** 显示头像 */}
      <div className={styles.topHeader}>
        <div className={styles.fillet}>
          <span className={styles.topText}>A</span>
        </div>
        <div className={styles.address}>
          <span>0x4234....1e45</span>
          <img src={edit} className={styles.iconEdit}></img>
        </div>
      </div>
      {/** 显示其他项目 */}
      <div className={styles.otherView}>
        <div className={styles.myItem}>
          <img src={price} className={styles.iconWallets}></img>
          <span className={styles.textLable}>My wallets</span>
          <img src={right} className={styles.rightArrow}></img>
        </div>
        {/** 分割线 */}
        <div className={styles.dotLine}></div>
        <div className={styles.myItem}>
          <img src={event} className={styles.iconWallets}></img>
          <span className={styles.textLable}>My event</span>
          <img src={right} className={styles.rightArrow}></img>
        </div>
        <div className={styles.dotLine}></div>
      </div>
    </div>
  );
}

export default Mine;