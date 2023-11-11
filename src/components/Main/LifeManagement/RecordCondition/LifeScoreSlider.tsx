import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type LifeScoreSliderProps = {
    score: number;
    onScoreChange: (value: number) => void;
    disabled: boolean;
};

export const LifeScoreSlider: React.FC<LifeScoreSliderProps> = ({ score, onScoreChange, disabled }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'medium', mb: 1 }}>体調どう？</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2 }}>{score}</Typography>
            <Slider
                min={-5}
                max={5}
                value={score}
                onChange={(e, value) => onScoreChange(Number(value))}
                disabled={disabled}
                sx={{
                    width: '100%',
                    height: 6,
                    borderRadius: '999px',
                    background: 'linear-gradient(to right, purple 500, white 500, yellow 400)',
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                <Typography sx={{ fontSize: '2rem' }}>☁️</Typography>
                <Typography sx={{ fontSize: '2rem' }}>😊</Typography>
                <Typography sx={{ fontSize: '2rem' }}>🌞</Typography>
            </Box>
        </Box>
    );
};
