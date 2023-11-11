import React, { useState, useEffect } from 'react';
import { getAuthState } from '@/lib/firebase/firebaseAuth';
import { User } from 'firebase/auth';
import { Login } from './Login';
import { Logout } from './Logout';
import Box from '@mui/material/Box';

export const Account: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getAuthState((currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <Box sx={{
            maxWidth: 'md',
            margin: 'auto',
            padding: 4,
        }}>
            {user ? (
                <Logout onBack={onBack} />
            ) : (
                <Login onBack={onBack} />
            )}
        </Box>
    );
};
