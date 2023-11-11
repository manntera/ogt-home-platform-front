import React, { useState } from 'react';
import { loginUser, getCurrentUser, logoutUser } from '@/lib/firebase/firebaseAuth';
import { RegisterForm } from './RegisterForm';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { UserApiUrl, UserGetRequest, UserGetResponse, usePostApi } from '@/hooks/usePostApi';

export const Login: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setisRegisterMode] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");

    const handleLogin = async () => {
        setIsLogging(true);
        try {
            await loginUser(email, password);
            alert('ログイン成功');
        } catch (error) {
            alert('ログイン失敗');
            setIsLogging(false);
            return;
        }

        const currentUser = getCurrentUser();
        if (!currentUser) {
            logoutUser();
            alert('無効なIDです');
            return;
        }
        try {
            const request = { id: currentUser.uid }
            const response = await submitGetUser(request);
            if (!response) {
                logoutUser();
                alert('無効なIDです');
                setIsLogging(false);
                return;
            }
            if (response.id !== currentUser.uid) {
                logoutUser();
                alert('無効なIDです');
                setIsLogging(false);
                return;
            }
            if (response.email !== currentUser.email) {
                logoutUser();
                alert('無効なIDです');
                setIsLogging(false);
                return;
            }
        }
        catch (error) {
            logoutUser();
            alert('無効なIDです');
            setIsLogging(false);
            return;
        }
        setIsLogging(false);
    };

    const handleSuccessRegister = (success: boolean) => {
        if (success) {
            setisRegisterMode(false);
        }
    };

    const handleBack = () => {
        setisRegisterMode(false);
    };

    if (isRegisterMode) {
        return <RegisterForm onBack={handleBack} isSuccessRegister={handleSuccessRegister} />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                variant="outlined"
                fullWidth
                disabled={isLogging}
            />
            <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                variant="outlined"
                fullWidth
                disabled={isLogging}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleLogin}
                disabled={isLogging}
                sx={{ py: 1, px: 2, position: 'relative' }}
            >
                {isLogging && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', ml: '-12px', mt: '-12px' }} />}
                ログイン
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setisRegisterMode(true)}
                disabled={isLogging}
                sx={{ py: 1, px: 2, position: 'relative' }}
            >
                {isLogging && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', ml: '-12px', mt: '-12px' }} />}
                アカウント作成
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onBack()} sx={{ py: 1, px: 2 }}>
                戻る
            </Button>
        </Box>
    );
};
