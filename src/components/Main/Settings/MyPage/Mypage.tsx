import React, { useState, useEffect } from 'react';
import { getAuthState } from '@/lib/firebase/firebaseAuth';
import { User } from 'firebase/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePostApi, UserGetRequest, UserGetResponse, UserApiUrl } from '@/hooks/usePostApi';

const Mypage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        getAuthState(async (user: User | null) => {
            if (!user) {
                setUserEmail(null);
                setUserName(null);
                return;
            }
            try {
                const userData = await submitGetUser({ id: user.uid });
                setUserEmail(userData.email);
                setUserName(userData.name);
            }
            catch (e) {
                setUserEmail(null);
                setUserName(null);
            }
        });
    }, []);

    return (
        <Box style={{
            position: 'absolute',
            display: 'flex',
            inset: 0,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Typography variant="body1">
                {userEmail ? `ログインメールアドレス: ${userEmail}` : 'ログインしていません。'}
            </Typography>
            <Typography variant="body1">
                {userName ? `ユーザー名: ${userName}` : ''}
            </Typography>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => onBack()}
                sx={{
                    mt: 2,
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                }}
            >
                戻る
            </Button>
        </Box>
    );
};

export default Mypage;
