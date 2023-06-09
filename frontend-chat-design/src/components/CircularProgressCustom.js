import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../pages/ShopSenseMain.module.css';

export default function CircularProgressCustom(props) {
  let progressTextColor = '';
  let progressBarColor = '';
  let progressBgColor = '';
  if (props.progressTitle == 'Product Complaints') {
    if (props.progressPercent > 66) {
      progressTextColor = '#D02F12';
      progressBarColor = '#E66D57';
      progressBgColor = '#F2B5AA';
    } else if (props.progressPercent > 33 && props.progressPercent <= 66) {
      progressTextColor = '#FF7F0A';
      progressBarColor = '#FAA04D';
      progressBgColor = '#FFE6CE';
    } else {
      progressTextColor = '#50a668';
      progressBarColor = '#B0E657';
      progressBgColor = '#E2F5D7';
    }
  } else {
    if (props.progressPercent <= 33) {
      progressTextColor = '#D02F12';
      progressBarColor = '#E66D57';
      progressBgColor = '#F2B5AA';
    } else if (props.progressPercent > 33 && props.progressPercent <= 66) {
      progressTextColor = '#FF7F0A';
      progressBarColor = '#FAA04D';
      progressBgColor = '#FFE6CE';
    } else {
      progressTextColor = '#50a668';
      progressBarColor = '#B0E657';
      progressBgColor = '#E2F5D7';
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
        <CircularProgress
          variant="determinate"
          value={props.progressPercent}
          sx={{ color: 'red' }}
          style={{
            color: `${progressBarColor}`,
            width: '50px',
            height: '50px',
            borderRadius: '100%',
            boxShadow: `inset 0 0 0px 7.2px ${progressBgColor}`,
            backgroundColor: 'transparent'
          }}
          thickness={5}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color={progressTextColor}
            style={{
              fontFamily: 'Nunito',
              textAlign: 'center',
              lineHeight: '20.46px',
              fontWeight: 900,
              fontSize: '10px'
            }}
          >
            {props.progressBarTitle}
          </Typography>
        </Box>
      </Box>
      <span className={styles.batch} style={{ color: progressTextColor, textAlign: 'center' }}>
        {props.progressTitle.split(' ')[0]}
      </span>
      <span
        className={styles.batch}
        style={{ color: progressTextColor, textAlign: 'center', padding: 0, margin: 0 }}
      >
        {props.progressTitle.split(' ')[1]}
      </span>
    </div>
  );
}
