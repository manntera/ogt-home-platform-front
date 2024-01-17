import { useState, useEffect } from 'react';
import { usePostApi, HealthGetRequest, HealthGetResponse, HealthApiUrl } from '@/hooks/usePostApi';
import { getCurrentUser } from '@/lib/firebase/firebaseAuth';

export const useHealthData = (year: number, month: number) => {
    const { submitData: submitGetHealth } = usePostApi<HealthGetRequest, HealthGetResponse[]>(HealthApiUrl + "get");

    const [healthData, setHealthData] = useState<HealthGetResponse[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                setIsLoading(true);
                const currentUser = getCurrentUser();
                if (!currentUser) throw new Error('ユーザーが見つかりません。');

                const firstDayOfMonth = new Date(year, month - 1, 1);
                const lastDayOfMonth = new Date(year, month, 0); // 月末日の取得
                const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
                const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);
                const request: HealthGetRequest = {
                    userId: currentUser.uid,
                    startTime: startTime,
                    endTime: endTime
                };
                const response = await submitGetHealth(request);
                setHealthData(response);
            } catch (error) {
                setError('体調情報の取得に失敗しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHealthData();
    }, [year, month, submitGetHealth]);

    return { healthData, error, isLoading };
};
