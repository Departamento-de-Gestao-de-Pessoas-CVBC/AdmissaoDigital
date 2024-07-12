import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReactInputMask from "react-input-mask";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

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
  },
});

export const Input = ({ id, label, type, mask, onKeyDown, ...rest }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
              onKeyDown={onKeyDown}
              variant="outlined"
              type="text"
              sx={{
                width: "100%",
                "& .MuiInputLabel-root": {
                  color: theme.palette.gray[200],
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
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          label={label}
          onKeyDown={onKeyDown}
          variant="outlined"
          sx={{
            width: "100%",
            "& .MuiInputLabel-root": {
              color: theme.palette.gray[200],
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
            endAdornment: type === "password" && (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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
