import './product.css';

export default function ProductDescription(props) {
  console.log(props);
  return (
    <div className={'productDesc'}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={'outerCircle'}>
          {/* <img className={'productImg'} alt="" src={'51a7vnwpatl-1@2x.png'} /> */}
          <img className={'productImg'} alt="" src={props.productImg} />
        </div>
        {/* <div className={'productName'}>Fossil Smart Watch</div> */}
        <div className={'productName'}>{props.productName}</div>
      </div>
      <div className={'productSummary'}>
        <p className={'summary'}>
          <b>Summary:</b>
        </p>
        <p className={'productDescText'}>
          {props.productDesc}
          {/* INSULATED SPORTS WATER BOTTLE: Goodbye sweat! The double wall insulation makes the Iron
          Flask sweat-free! It keeps your drink COLD for up to 24 hours, and HOT for up to 12 hours.
          *NOTE: ONLY the 14 Oz, 18 Oz, & 22 Oz fit in cupholders* 3 LIDS: YES, Iron Flask comes
          with THREE different 100% LEAK PROOF lids. Carabiner Straw Lid with 2 Straws, Flip Lid,
          and a Stainless Steel Lid! */}
        </p>
      </div>
    </div>
  );
}
