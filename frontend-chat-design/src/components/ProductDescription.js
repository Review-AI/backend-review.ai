import styles from "../pages//ShopSenseMain.module.css";


export default function ProductDescription(props) {
  return (
    <div style={{width: "424px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"15px 0px 3px"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div className={styles.circledImg}>
                    <img
                        className={styles.a7vnwpatl1Icon}
                        alt=""
                        src={props.productImg}
                    />
                </div>
                <div className={styles.productName}>{props.productName}</div>
            </div>
            <div className={styles.summaryBestSellingContainer}>
                <p className={styles.summary}>
                  <b>Summary:</b>
                </p>
                <p className={styles.bestSellingBottles}>
                  {props.productDesc}
                    {/* INSULATED SPORTS WATER BOTTLE: Goodbye sweat! The double wall insulation makes the Iron Flask sweat-free! It keeps your drink COLD for up to 24 hours, and HOT for up to 12 hours. *NOTE: ONLY the 14 Oz, 18 Oz, & 22 Oz fit in cupholders* 3 LIDS: YES, Iron Flask comes with THREE different 100% LEAK PROOF lids. Carabiner Straw Lid with 2 Straws, Flip Lid, and a Stainless Steel Lid! */}
                </p>
            </div>
        </div>
  );
}
