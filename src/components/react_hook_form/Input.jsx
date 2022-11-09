import { TextField } from "@mui/material";
import React, { forwardRef } from "react";


export const Input = forwardRef((props, ref) => {
  return (
    <TextField 
        required
        label={props.label}
        type={props.type}
        sx={{height: 50, marginBottom: 4}}
        id="outlined-password-input"
        inputRef={ref}
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...props}
    />
  );
});

