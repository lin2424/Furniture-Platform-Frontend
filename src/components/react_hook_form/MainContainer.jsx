import { Container } from '@mui/material'
import React from 'react'


const MainContainer = ({ children, ...props }) => {

    return (
        <Container 
            sx={{
                margin: "50px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            component="main" 
            maxWidth="md" 
            {...props} 
        >
            {children}
        </Container>
    )
}

export default MainContainer