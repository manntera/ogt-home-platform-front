import { usePostApi, UserGetRequest, UserGetResponse, UserApiUrl, HealthApiUrl, HealthGetRequest, HealthGetResponse } from '@/hooks/usePostApi';
import { getCurrentUser } from '@/lib/firebase/firebaseAuth';
import { useState, useEffect } from 'react';
import { TileGrid, TileItemInfo } from './TileGrid';
import { alpha, hslToRgb, rgbToHex } from '@mui/material';
import { Queue } from 'queue-typescript';

export const DataViewer = () => {
    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");
    const { submitData: submitGetHealth } = usePostApi<HealthGetRequest, HealthGetResponse[]>(HealthApiUrl + "get");

    const [userData, setUserData] = useState<UserGetResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [tileItemInfos, setTileItemInfos] = useState<(TileItemInfo)[][]>([[]]);

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
                const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1);
                const firstWeekDay = firstDayOfMonth.getDay();
                const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
                const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);
                const dayCount = (endTime - startTime) / 86400;

                const request = { userId: currentUser.uid, startTime: startTime, endTime: endTime };
                const healthData = await submitGetHealth(request);
                var searchStartTime = startTime;
                var searchEndTime = startTime + 3600;

                var tileItemInfos: (TileItemInfo)[][] = [[]];

                let healthQueue = new Queue<HealthGetResponse>(...healthData);

                for (var i = 0; i < dayCount; i++) {
                    tileItemInfos.push([]);
                    tileItemInfos[i].push({ text: (i + 1).toString(), color: alpha("#000000", 0), toolTipText: null });
                    const weekDay = (firstWeekDay + i) % 7;
                    let weekDayText = "";
                    switch (weekDay) {
                        case 0:
                            weekDayText = "日";
                            break;
                        case 1:
                            weekDayText = "月";
                            break;
                        case 2:
                            weekDayText = "火";
                            break;
                        case 3:
                            weekDayText = "水";
                            break;
                        case 4:
                            weekDayText = "木";
                            break;
                        case 5:
                            weekDayText = "金";
                            break;
                        case 6:
                            weekDayText = "土";
                            break;
                    }
                    tileItemInfos[i].push({ text: weekDayText, color: alpha("#000000", 0), toolTipText: null });
                    for (var j = 0; j < 24; j++) {
                        if (healthQueue.length == 0) {
                            tileItemInfos[i].push({ text: "", color: alpha("#AAAAAA", 1), toolTipText: null });
                            searchStartTime += 3600;
                            searchEndTime += 3600;
                            continue;
                        }

                        if (healthQueue.front.timestamp >= searchEndTime) {
                            tileItemInfos[i].push({ text: "", color: alpha("#AAAAAA", 1), toolTipText: null });
                            searchStartTime += 3600;
                            searchEndTime += 3600;
                            continue;
                        }
                        var targetHealth: HealthGetResponse = healthQueue.front;
                        while (healthQueue.front.timestamp >= searchStartTime && healthQueue.front.timestamp < searchEndTime) {
                            const health = healthQueue.dequeue();
                            if (health) {
                                if (Math.abs(health.healthScore) > Math.abs(targetHealth.healthScore)) {
                                    targetHealth = health;
                                }
                            }
                            if (healthQueue.front == null) {
                                break;
                            }
                        }
                        var h = 60;
                        if (targetHealth.healthScore < 0) {
                            h = 210;
                        }
                        var l = 100 - Math.abs(targetHealth.healthScore) * 10;
                        tileItemInfos[i].push({ text: targetHealth.healthScore.toString(), color: rgbToHex(hslToRgb("hsl(" + h.toString() + ",100," + l.toString() + ")")), toolTipText: targetHealth.comment });
                        searchStartTime += 3600;
                        searchEndTime += 3600;
                    }
                }
                setTileItemInfos(tileItemInfos);
            } catch (error) {
                console.error(error);
                setError('体調情報の取得に失敗しました。');
            }
        };

        fetchUserData();
        fetchHealthData();
    }, []);

    if (userData === null || tileItemInfos.length === 0) {
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TileGrid
                tileSizeX={40}
                tileSizeY={20}
                tileItemInfos={
                    [
                        [
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "0時", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "6時", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "12時", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "18時", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "", color: alpha("#000000", 0) },
                            { text: "23時", color: alpha("#000000", 0) },
                        ]
                    ]
                }
                margin={1}
            />
            <TileGrid
                tileSizeX={20}
                tileSizeY={20}
                tileItemInfos={tileItemInfos}
                margin={1}
            />
        </div>
    );
}
