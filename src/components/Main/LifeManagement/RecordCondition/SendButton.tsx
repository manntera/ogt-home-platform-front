import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';

type SendButtonProps = {
    handleSubmit: () => void;
    isSubmitting: boolean;
    submitSuccess: boolean;
    sx?: SxProps;
};

export const SendButton: React.FC<SendButtonProps> = ({ handleSubmit, isSubmitting, submitSuccess, sx }) => {
    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
                onClick={handleSubmit}
                disabled={isSubmitting || submitSuccess}
                variant="contained"
                color="primary"
                sx={sx}
            >
                {isSubmitting ? (
                    <>
                        <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                        送信中...
                    </>
                ) : submitSuccess ? '送信完了' : '送信'}
            </Button>
        </Box>
    );
};
