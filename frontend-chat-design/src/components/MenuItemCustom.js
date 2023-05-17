import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LanguageIcon from '@mui/icons-material/Language';
import CommentIcon from '@mui/icons-material/Comment';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const options = [
    <span style={{display:"flex"}}><LanguageIcon style={{marginRight:"5px"}}/>Website</span>,
    <span style={{display:"flex"}}><CommentIcon style={{marginRight:"5px"}}/>Feedback</span>,
    <span style={{display:"flex"}}><ContactMailIcon style={{marginRight:"5px"}}/>Contact Us</span>,
];

export default function MenuItemCustom() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ width: "100%"}}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{float:"right"}}
      >
        <MoreVertIcon style={{color: "white", fontSize:"40px"}}/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}