import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme } from "@mui/material/styles";

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

export const BasicSelect = ({ label, options, value, onChange, ...rest }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: theme.palette.gray[200],
            fontSize: "1.6rem",
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            color: theme.palette.gray.text,
            fontSize: "1.6rem",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                color: theme.palette.gray.text,
                fontSize: "1.6rem",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
