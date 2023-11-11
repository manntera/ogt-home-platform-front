import React from 'react';
import Box from '@mui/material/Box';
import { RoundButton } from './RoundButton';

export const RecordSelector: React.FC = ({ }) => {
    return (
        <Box sx={{ position: 'absolute', right: 0, bottom: 0, width: `50%`, paddingTop: '50%' }}>
            <RoundButton sx={{
                position: 'absolute',
                bottom: '0',
                left: '0',
            }} />
        </Box>
    );
}
