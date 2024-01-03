import { usePostApi, UserGetRequest, UserGetResponse, UserApiUrl, HelathAddRequest, HealthAddResponse, HealthApiUrl, HealthGetRequest, HealthGetResponse } from '@/hooks/usePostApi';
import { getCurrentUser } from '@/lib/firebase/firebaseAuth';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';

export const DataViewer = () => {
    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");
    const { submitData: submitGetHealth } = usePostApi<HealthGetRequest, HealthGetResponse[]>(HealthApiUrl + "get");

    const [userData, setUserData] = useState<UserGetResponse | null>(null);
    const [healthData, setHealthData] = useState<HealthGetResponse[] | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = getCurrentUser();
                if (!currentUser) return;

                const userData = await submitGetUser({ id: currentUser.uid });
                setUserData(userData);
            } catch (error) {
                console.error(error);
                setError('ユーザー情報の取得に失敗しました。');
            }
        };

        const fetchHealthData = async () => {
            try {
                const currentUser = getCurrentUser();
                if (!currentUser) return;

                const now = new Date();
                const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
                const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);

                const request = { userId: currentUser.uid, startTime: startTime, endTime: endTime };
                const healthData = await submitGetHealth(request);
                setHealthData(healthData);
            } catch (error) {
                console.error(error);
                setError('体調情報の取得に失敗しました。');
            }
        };

        fetchUserData();
        fetchHealthData();
    }, []);

    if (userData === null || healthData === null) {
        return (
            <div>
                <p>データを取得中です。</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }
    return (
        <div>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C', 'bar D'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3, 3],
                    },
                ]}
                width={300}
                height={300}
            />
        </div>
    );
}