import { usePostApi, UserGetRequest, UserGetResponse, UserApiUrl, HealthApiUrl, HealthGetRequest, HealthGetResponse } from '@/hooks/usePostApi';
import { getCurrentUser } from '@/lib/firebase/firebaseAuth';
import { useState, useEffect } from 'react';
import { TileGrid, TileItemInfo } from './TileGrid';
import { alpha, hslToRgb, rgbToHex } from '@mui/material';
import { Queue } from 'queue-typescript';

const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;
const MAX_HEALTH_SCORE = 100;

type Props = {
    year: number;
    month: number;
}

function getWeekDayText(weekDay: number): string {
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    return weekDays[weekDay];
}

function createHealthColor(healthScore: number): string {
    const hue = healthScore < 0 ? 210 : 60;
    const lightness = MAX_HEALTH_SCORE - Math.abs(healthScore) * 10;
    return rgbToHex(hslToRgb(`hsl(${hue},100%,${lightness}%)`));
}

export const HealthViewer: React.FC<Props> = ({ year, month }) => {
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

                const firstDayOfMonth = new Date(year, month - 1, 1);
                const lastDayOfMonth = new Date(year, month);
                const firstWeekDay = firstDayOfMonth.getDay();
                const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
                const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);
                const dayCount = (endTime - startTime) / 86400;

                const request = { userId: currentUser.uid, startTime: startTime, endTime: endTime };
                const healthData = await submitGetHealth(request);

                var searchStartTime = startTime;
                var searchEndTime = startTime + SECONDS_IN_HOUR;

                var tileItemInfos: (TileItemInfo)[][] = [[]];

                let healthQueue = new Queue<HealthGetResponse>();
                if (healthData != null && healthData.length != 0) {
                    healthQueue = new Queue<HealthGetResponse>(...healthData);
                }

                for (var i = 0; i < dayCount; i++) {
                    tileItemInfos.push([]);
                    tileItemInfos[i].push({ text: (i + 1).toString(), color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 });
                    const weekDay = (firstWeekDay + i) % 7;

                    tileItemInfos[i].push({ text: getWeekDayText(weekDay), color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 });
                    for (var j = 0; j < HOURS_IN_DAY; j++) {
                        if (healthQueue.length == 0) {
                            tileItemInfos[i].push({ text: "", color: alpha("#AAAAAA", 1), toolTipText: null, outlineColor: "#000000", outlineSize: 0 });
                            searchStartTime += SECONDS_IN_HOUR;
                            searchEndTime += SECONDS_IN_HOUR;
                            continue;
                        }

                        if (healthQueue.front.timestamp >= searchEndTime) {
                            tileItemInfos[i].push({ text: "", color: alpha("#AAAAAA", 1), toolTipText: null, outlineColor: "#000000", outlineSize: 0 });
                            searchStartTime += SECONDS_IN_HOUR;
                            searchEndTime += SECONDS_IN_HOUR;
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
                        var outlineColor = "#FFFFFF";
                        var outlineSize = 0;
                        if (targetHealth.comment != "") {
                            outlineSize = 1;
                        }
                        const healthColor = createHealthColor(targetHealth.healthScore);
                        tileItemInfos[i].push({ text: targetHealth.healthScore.toString(), color: healthColor, toolTipText: targetHealth.comment, outlineColor: outlineColor, outlineSize: outlineSize });
                        searchStartTime += SECONDS_IN_HOUR;
                        searchEndTime += SECONDS_IN_HOUR;
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
    }, [year, month]);

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
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "0時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "6時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "12時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "18時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
                            { text: "23時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 },
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
