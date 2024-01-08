import React, { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { useHealthData } from '@/hooks/useHealthData';
import { TileGrid, TileItemInfo } from './TileGrid';
import { alpha, rgbToHex, hslToRgb } from '@mui/material';
import { Queue } from 'queue-typescript';
import { HealthGetResponse } from '@/hooks/usePostApi';

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
    const { userData, error: userError } = useUserData();
    const { healthData, error: healthError } = useHealthData(year, month);
    const [tileItemInfos, setTileItemInfos] = useState<TileItemInfo[][]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month);
        const firstWeekDay = firstDayOfMonth.getDay();
        const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
        const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);
        const dayCount = (endTime - startTime) / 86400;

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
            setTileItemInfos(tileItemInfos);
        };
        setIsLoading(false);
    }, [healthData]);

    if (isLoading) {
        return <div><p>データを取得中です。</p></div>;
    }

    if (userError || healthError) {
        return <div><p>エラーが発生しました。</p></div>;
    }

    const nullTile = { text: "", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 };
    const hourTile = (hour: { toString: () => string; }) => {
        return { text: hour + "時", color: alpha("#000000", 0), toolTipText: null, outlineColor: "#000000", outlineSize: 0 };
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TileGrid
                tileSizeX={40}
                tileSizeY={20}
                tileItemInfos={
                    [
                        [
                            nullTile, nullTile, hourTile(0),
                            nullTile, nullTile, nullTile, nullTile, nullTile, hourTile(6),
                            nullTile, nullTile, nullTile, nullTile, nullTile, hourTile(12),
                            nullTile, nullTile, nullTile, nullTile, nullTile, hourTile(18),
                            nullTile, nullTile, nullTile, nullTile, hourTile(23),
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
