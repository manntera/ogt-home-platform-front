import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface ContentItemData {
    label: string;
    icon: string;
    component: React.FC<{ onBack: () => void }>;
}

export const ContentItem: React.FC<ContentItemData> = ({ icon, label }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100wh',
            padding: '8px',
            borderBottom: '1px solid #ccc',
        }}>
            <Image src={icon} alt={label} width={30} height={30} style={{ marginRight: '10px' }} />
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>{label}</Typography>
        </Box>
    );
};
