import React, { useState } from 'react';
import { registerUser, getCurrentUser } from '@/lib/firebase/firebaseAuth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { usePostApi, UserApiUrl, UserAddRequest, UserAddResponse } from '@/hooks/usePostApi';

type RegisterFormProps = {
    onBack: () => void;
    isSuccessRegister: (success: boolean) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onBack, isSuccessRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const { submitData: submitAddUser } = usePostApi<UserAddRequest, UserAddResponse>(UserApiUrl + "add");

    const handleRegister = async () => {
        if (!userName) {
            isSuccessRegister(false);
            alert('ユーザー名を入力してください');
            return;
        }

        if (!email) {
            isSuccessRegister(false);
            alert('メールアドレスを入力してください');
            return;
        }

        if (!password) {
            isSuccessRegister(false);
            alert('パスワードを入力してください');
            return;
        }
        if (password !== confirmPassword) {
            isSuccessRegister(false);
            alert('パスワードが一致しません');
            return;
        }

        setIsRegistering(true);

        try {
            await registerUser(email, password);

            const currentUser = getCurrentUser();

            if (!currentUser) {
                throw new Error('ユーザー情報が取得できませんでした');
            }
            const request = { id: currentUser.uid, name: userName, email: email }
            const response = await submitAddUser(request);

            alert('アカウント作成成功');
            isSuccessRegister(true);
        } catch (error) {
            alert('アカウント作成失敗');
            isSuccessRegister(false);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 'md', margin: 'auto', padding: 4 }}>
            <TextField
                type="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ユーザー名"
                variant="outlined"
                fullWidth
                disabled={isRegistering}
            />
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                variant="outlined"
                fullWidth
                disabled={isRegistering}
            />
            <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                variant="outlined"
                fullWidth
                disabled={isRegistering}
            />
            <TextField
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="パスワードの確認"
                variant="outlined"
                fullWidth
                disabled={isRegistering}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleRegister}
                disabled={isRegistering}
                sx={{ py: 1, px: 2, mt: 2, position: 'relative' }}
            >
                {isRegistering && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', ml: '-12px', mt: '-12px' }} />}
                アカウント作成
            </Button>
            <Button variant="contained" color="secondary" onClick={onBack} sx={{ py: 1, px: 2, mt: 2 }}>
                戻る
            </Button>
        </Box>
    );
};

export default RegisterForm;
