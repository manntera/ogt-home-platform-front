import React from 'react';
import { logoutUser } from '@/lib/firebase/firebaseAuth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Logout: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const handleLogout = async () => {
        try {
            await logoutUser();
            alert('ログアウトしました');
        } catch (error) {
            alert('ログアウト失敗');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: 4,
        }}>
            <Button
                onClick={handleLogout}
                variant="contained"
                color="error"
                sx={{ py: 1, px: 2, fontWeight: 'bold', borderRadius: 1 }}
            >
                ログアウト
            </Button>
            <Button
                onClick={onBack}
                variant="contained"
                color="secondary"
                sx={{ py: 1, px: 2, fontWeight: 'bold', borderRadius: 1 }}
            >
                戻る
            </Button>
        </Box>
    );
};
