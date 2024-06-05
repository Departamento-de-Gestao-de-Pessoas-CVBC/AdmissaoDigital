import React from "react";
import Button from "@mui/material/Button";

const textColor = "#bdbdbd";
const textColorHover = "#0051c2";
const borderColorHover = "#0051c2";
const borderColor = "#bdbdbd";
const bgColor = "#ffffff";

export const BasicButton = ({ title, startIcon, onClick, disabled }) => {
  return (
    <Button
      variant="outlined"
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: disabled ? "grey" : textColor,
        background: bgColor,
        borderColor: disabled ? "grey" : borderColor,
        fontSize: "1.2rem",
        padding: "1rem 2rem",
        "@media (min-width: 745px)": {
          fontSize: "1.4rem",
          padding: "1.2rem 2.2rem",
        },
        "@media (min-width: 1024px)": {
          fontSize: "1.6rem",
          padding: "1.4rem 2.4rem",
        },
        "&:hover": {
          color: disabled ? "grey" : textColorHover,
          background: bgColor,
          borderColor: disabled ? "grey" : borderColorHover,
          boxShadow: disabled ? "none" : "0px 0px 3px rgba(0, 0, 0, 0.677)",
          "& .MuiButton-startIcon": {
            color: disabled ? "grey" : textColorHover,
          },
        },
        "& .MuiButton-startIcon": {
          color: disabled ? "grey" : textColor,
        },
      }}
    >
      {title}
    </Button>
  );
};
