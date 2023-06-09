import MenuItemCustom from '../MenuItemCustom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './header.css';

export default function Header(props) {
  return (
    <div className={'header'}>
      <div>
        <ArrowForwardIosIcon
          className={'showCursor'}
          style={{ color: 'white', fontSize: '3.35vh' }}
          onClick={() => props.setExpandShopSenseAI(false)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <img className={'shopsenseLogoIcon'} alt="" src="/image-23@2x.png" />
        <img className={'shopsenseTextIcon'} alt="" src="/screenshot-20230511-at-103-1@2x.png" />
      </div>
      <div className={'showCursor'}>
        <MenuItemCustom />
      </div>
      {/*<img className={styles.image13Icon} alt="" src="/image-13@2x.png" />*/}
    </div>
  );
}
