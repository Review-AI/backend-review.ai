import styles from "../pages//ShopSenseMain.module.css";
import MenuItemCustom from "./MenuItemCustom";


export default function Header() {
  return (
    <div className={styles.iphone1420Item} >
            <img className={styles.image23Icon} alt="" src="/image-23@2x.png"/>
            <img
                className={styles.screenshot20230511At103}
                alt=""
                src="/screenshot-20230511-at-103-1@2x.png"
              />
            <MenuItemCustom />
            {/*<img className={styles.image13Icon} alt="" src="/image-13@2x.png" />*/}
    </div>
  );
}
