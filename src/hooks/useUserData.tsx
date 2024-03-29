import { useState, useEffect } from 'react';
import { UserApiUrl, UserGetRequest, UserGetResponse, usePostApi } from '@/hooks/usePostApi';
import { getCurrentUser } from '@/lib/firebase/firebaseAuth';

export const useUserData = () => {
    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");

    const [userData, setUserData] = useState<UserGetResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const currentUser = getCurrentUser();
                if (!currentUser) throw new Error('ユーザーが見つかりません。');
                const userData = await submitGetUser({ id: currentUser.uid });
                setUserData(userData);
            } catch (error) {
                setError('ユーザー情報の取得に失敗しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);
    return { userData, error, isLoading };
};
