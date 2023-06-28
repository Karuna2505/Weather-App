import { Box, Button, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  width: 100%;
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
`;
const StyledTypography = styled(Typography)`
  font-family: "Rajdhani" !important;
  display: flex;
  color: #ffffff;
  font-size: 6vw !important;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 30%;
  background-color: #ffffff4f !important;
  border-radius: 16px !important;
  margin-left: auto !important;
  margin-right: auto !important;
`;

function ErrorScreen() {
  function reloadClickHandler() {
    window.location.reload();
  }

  return (
    <StyledBox>
      <StyledTypography>Page Not Found</StyledTypography>
      <StyledButton onClick={reloadClickHandler}>
        <StyledTypography>Reload</StyledTypography>
      </StyledButton>
    </StyledBox>
  );
}

export default ErrorScreen;
