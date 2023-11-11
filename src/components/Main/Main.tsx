import React from 'react';
import Box from '@mui/material/Box';

type MainProps = {
    children: React.ReactNode;
};
export const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <Box sx={{ position: 'fixed', top: 64, bottom: 56, width: '100%', overflowX: 'auto', backgroundColor: `#BFDBFE` }}>
            {children}
        </Box>
    );
}
