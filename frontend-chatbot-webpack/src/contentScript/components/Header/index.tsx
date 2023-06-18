import React from "react";
import MenuItemCustom from '../MenuItemCustom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {HeaderLogo, HeaderLogoText} from '../../utils/ImagesBase64'
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
        <img className={'shopsenseLogoIcon'} alt="" src={HeaderLogo} />
        <img className={'shopsenseTextIcon'} alt="" src={HeaderLogoText} />
      </div>
      <div className={'showCursor'}>
        <MenuItemCustom />
      </div>
    </div>
  );
}
