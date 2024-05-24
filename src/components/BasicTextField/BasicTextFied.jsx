import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReactInputMask from "react-input-mask";

export const BasicTextFields = ({ id, label, type, mask, ...rest }) => {
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
          type={type}
          id={id}
          label={label}
          variant="outlined"
          sx={{
            width: "100%",
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
          {...rest}
        />
      )}
    </Box>
  );
};
