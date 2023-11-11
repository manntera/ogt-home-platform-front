import React from 'react';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const RoundButton: React.FC<{ sx?: object }> = ({ sx }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                ...sx,
                borderRadius: '50%',
                minWidth: 0,
                width: '64px',
                height: '64px',
                padding: 0,
            }}
        >
            <Stack spacing={1} alignItems="center">
                <PersonIcon />
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                    名前
                </Typography>
            </Stack>
        </Button>
    );
}
