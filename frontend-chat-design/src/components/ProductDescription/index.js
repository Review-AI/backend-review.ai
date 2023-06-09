import './product.css';

export default function ProductDescription(props) {
  return (
    <div className={'productDesc'} style={{ height: '33vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={'outerCircle'}>
          <img className={'productImg'} alt="" src={props.productImg} />
        </div>
        <div className={'productName'}>{props.productName}</div>
      </div>
      <div className={'summaryBestSellingContainer'}>
        <p className={'summary'}>
          <b>Summary:</b>
        </p>
        <p className={'bestSellingBottles'}>
          {/* {props.productDesc} */}
          INSULATED SPORTS WATER BOTTLE: Goodbye sweat! The double wall insulation makes the Iron
          Flask sweat-free! It keeps your drink COLD for up to 24 hours, and HOT for up to 12 hours.
          *NOTE: ONLY the 14 Oz, 18 Oz, & 22 Oz fit in cupholders* 3 LIDS: YES, Iron Flask comes
          with THREE different 100% LEAK PROOF lids. Carabiner Straw Lid with 2 Straws, Flip Lid,
          and a Stainless Steel Lid!
        </p>
      </div>
    </div>
  );
}
