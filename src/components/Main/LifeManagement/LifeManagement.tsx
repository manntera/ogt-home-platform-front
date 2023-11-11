import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getAuthState } from '@/lib/firebase/firebaseAuth';
import { RecordCondition } from './RecordCondition/RecordCondition';
import CircularProgress from '@mui/material/CircularProgress';

const LifeManagement = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAuthState((currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress /> { }
            </div>
        );
    }

    return (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!user ?
                (
                    <p>ログインしてください</p>
                ) : (
                    <RecordCondition user={user} />
                )
            }
        </div >
    );
};

export default LifeManagement;
