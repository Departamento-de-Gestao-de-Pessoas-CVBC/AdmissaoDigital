import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const textColor = "#bdbdbd";
const textColorHover = "#0051c2";
const borderColorHover = "#0051c2";
const borderColor = "#bdbdbd";
const bgColor = "#ffffff";

export const BasicButton = ({ title, icone, startIcon, ...rest }) => {
  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={startIcon}
        sx={{
          color: textColor,
          background: bgColor,
          borderColor: borderColor,
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
            color: textColorHover,
            background: bgColor,
            borderColor: borderColorHover,
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.677)",
            "& .MuiButton-startIcon": {
              color: textColorHover,
            },
          },
          "& .MuiButton-startIcon": {
            color: textColor,
          },
        }}
      >
        {title}
      </Button>
    </Box>
  );
};
