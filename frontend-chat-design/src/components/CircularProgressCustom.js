import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CircularProgressCustom() {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", justifyContent:"center" }}>
      <CircularProgress
        variant="determinate"
        value={40}
        style={{
          color: "#B0E657",
          width: "77px",
          height: "77px",
          borderRadius: "100%",
          boxShadow: "inset 0 0 0px 11px #E2F5D7",
          backgroundColor: "transparent"
        }}
        thickness={5}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="#50A668"
          style={{
            fontFamily: "Nunito",
            textAlign: "center",
            lineHeight: "20.46px",
            fontWeight: 900,
            fontSize: "14px"
          }}
        >
          40%
        </Typography>
      </Box>
    </Box>
  );
}
