import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReactInputMask from "react-input-mask";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0051c2",
    },
    secondary: {
      main: "#f8c600",
    },
    gray: {
      100: "#e5e5e5",
      200: "#dddddd",
      300: "#bdbdbd",
      text: "#5c5c5c",
    },
    green: {
      main: "#00be00", // Alterado para verde
    },
  },
});

export const Input = ({ id, label, type, mask, ...rest }) => {
  const [filled, setFilled] = useState(false);

  const handleInputChange = (event) => {
    const filled = event.target.value !== "";
    setFilled(filled);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
      }}
    >
      {mask ? (
        <ReactInputMask mask={mask} {...rest}>
          {(inputProps) => (
            <TextField
              {...inputProps}
              id={id}
              label={label}
              variant="outlined"
              type="text"
              sx={{
                width: "100%",
                "& .MuiInputLabel-root": {
                  color: filled
                    ? theme.palette.green.main
                    : theme.palette.gray[200],
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.primary.main,
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "1.6rem",
                },
                onChange: handleInputChange,
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "1.6rem",
                },
              }}
            />
          )}
        </ReactInputMask>
      ) : (
        <TextField
          type={type}
          id={id}
          label={label}
          variant="outlined"
          sx={{
            width: "100%",
            "& .MuiInputLabel-root": {
              color: filled
                ? theme.palette.green.main
                : theme.palette.gray[200],
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.main,
            },
          }}
          InputProps={{
            sx: {
              fontSize: "1.6rem",
            },
            onChange: handleInputChange,
          }}
          InputLabelProps={{
            sx: {
              fontSize: "1.6rem",
            },
          }}
          {...rest}
        />
      )}
    </Box>
  );
};
