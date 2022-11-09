import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ children, ...props }) => {

    return (
        <Button
            sx={{padding: "0", margin: "24px 0 8px", width: 260, height: 40}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            {...props}
        >
            {children}
        </Button>
    )
}
export default PrimaryButton