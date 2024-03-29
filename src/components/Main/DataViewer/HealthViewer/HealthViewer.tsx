import React, { useState, useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useMonthHealthData } from "@/hooks/useMonthHealthData";
import { TileGrid, TileItemInfo } from "./GridViewer/TileGrid";
import { alpha, rgbToHex, hslToRgb } from "@mui/material";
import { Queue } from "queue-typescript";
import { HealthGetResponse } from "@/hooks/usePostApi";
import { HealthDetailViewer } from "./HealthDetail/HealthDetailViewer";

const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;
const MAX_HEALTH_SCORE = 100;

type Props = {
    year: number;
    month: number;
};

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
    const {
        userData,
        error: userError,
        isLoading: isUserLoading,
    } = useUserData();

    const {
        healthData,
        error: healthError,
        isLoading: isHealthLoading,
        refetch: refetchHealthData,
    } = useMonthHealthData(year, month);

    const [tileItemInfos, setTileItemInfos] = useState<TileItemInfo[][]>([]);

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [startUnixTime, setStartUnixTime] = useState<number>(0);
    const [endUnixTime, setEndUnixTime] = useState<number>(0);

    const handleTileClick = (columnIndex: number, tileIndex: number) => {
        console.log(
            `Clicked on Tile at Column: ${columnIndex}, Tile: ${tileIndex}`
        );
        if (tileItemInfos[columnIndex][tileIndex].text == "") {
            return;
        }

        const hour = tileIndex - 2;
        const day = columnIndex + 1;
        const startHourUnixTime = Math.floor(
            new Date(year, month - 1, day, hour).getTime() / 1000
        );
        const endHourUnixTime = startHourUnixTime + SECONDS_IN_HOUR;
        setStartUnixTime(startHourUnixTime);
        setEndUnixTime(endHourUnixTime);
        setIsOpenDialog(true);
    };

    useEffect(() => {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month);
        const firstWeekDay = firstDayOfMonth.getDay();
        const startTime = Math.floor(firstDayOfMonth.getTime() / 1000);
        const endTime = Math.floor(lastDayOfMonth.getTime() / 1000);
        const dayCount = (endTime - startTime) / SECONDS_IN_DAY;

        var searchStartTime = startTime;
        var searchEndTime = startTime + SECONDS_IN_HOUR;

        var tileItemInfos: TileItemInfo[][] = [[]];

        let healthQueue = new Queue<HealthGetResponse>();
        if (healthData != null && healthData.length != 0) {
            healthQueue = new Queue<HealthGetResponse>(...healthData);
        }

        for (var dayIndex = 0; dayIndex < dayCount; dayIndex++) {
            tileItemInfos.push([]);
            const dayTileItemInfos = tileItemInfos[dayIndex];
            dayTileItemInfos.push({
                text: (dayIndex + 1).toString(),
                color: alpha("#000000", 0),
                toolTipText: null,
                outlineColor: "#000000",
                outlineSize: 0,
                subText: "",
                subTextBgColor: "",
            });
            const weekDay = (firstWeekDay + dayIndex) % 7;

            dayTileItemInfos.push({
                text: getWeekDayText(weekDay),
                color: alpha("#000000", 0),
                toolTipText: null,
                outlineColor: "#000000",
                outlineSize: 0,
                subText: "",
                subTextBgColor: "",
            });
            for (var hourIndex = 0; hourIndex < HOURS_IN_DAY; hourIndex++) {
                if (healthQueue.length == 0) {
                    dayTileItemInfos.push({
                        text: "",
                        color: alpha("#AAAAAA", 1),
                        toolTipText: null,
                        outlineColor: "#000000",
                        outlineSize: 0,
                        subText: "",
                        subTextBgColor: "",
                    });
                    searchStartTime += SECONDS_IN_HOUR;
                    searchEndTime += SECONDS_IN_HOUR;
                    continue;
                }

                if (healthQueue.front.timestamp >= searchEndTime) {
                    dayTileItemInfos.push({
                        text: "",
                        color: alpha("#AAAAAA", 1),
                        toolTipText: null,
                        outlineColor: "#000000",
                        outlineSize: 0,
                        subText: "",
                        subTextBgColor: "",
                    });
                    searchStartTime += SECONDS_IN_HOUR;
                    searchEndTime += SECONDS_IN_HOUR;
                    continue;
                }
                var targetHealth: HealthGetResponse = healthQueue.front;
                while (
                    healthQueue.front.timestamp >= searchStartTime &&
                    healthQueue.front.timestamp < searchEndTime
                ) {
                    const health = healthQueue.dequeue();
                    if (health) {
                        if (
                            Math.abs(health.healthScore) >
                            Math.abs(targetHealth.healthScore)
                        ) {
                            targetHealth = health;
                        }
                    }
                    if (healthQueue.front == null) {
                        break;
                    }
                }
                var outlineColor = "#000000";
                var outlineSize = 0;
                if (targetHealth.comment != "") {
                    outlineSize = 1;
                }
                const healthColor = createHealthColor(targetHealth.healthScore);
                dayTileItemInfos.push({
                    text: targetHealth.healthScore.toString(),
                    color: healthColor,
                    toolTipText: targetHealth.comment,
                    outlineColor: outlineColor,
                    outlineSize: outlineSize,
                    subText: targetHealth.medicineName,
                    subTextBgColor: "rgba(255, 255, 255, 0.6)",
                });
                searchStartTime += SECONDS_IN_HOUR;
                searchEndTime += SECONDS_IN_HOUR;
            }
            setTileItemInfos(tileItemInfos);
        }
    }, [healthData, month, year]);

    if (userError) {
        return (
            <div>
                <p>ユーザー情報の認証にエラーが発生しました。</p>
            </div>
        );
    }

    if (healthError) {
        return (
            <div>
                <p>健康情報の取得にエラーが発生しました。</p>
            </div>
        );
    }

    if (isUserLoading || isHealthLoading) {
        return (
            <div>
                <p>データを取得中です。</p>
            </div>
        );
    }

    const nullTile: TileItemInfo = {
        text: "",
        color: alpha("#000000", 0),
        toolTipText: null,
        outlineColor: "#000000",
        outlineSize: 0,
        subText: "",
        subTextBgColor: "",
    };

    const hourTile = (hour: { toString: () => string }): TileItemInfo => {
        return {
            text: hour.toString() + "時",
            color: alpha("#000000", 0),
            toolTipText: null,
            outlineColor: "#000000",
            outlineSize: 0,
            subText: "",
            subTextBgColor: "",
        };
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <TileGrid
                tileSizeX={40}
                tileSizeY={20}
                tileItemInfos={[
                    [
                        nullTile,
                        nullTile,
                        hourTile(0),
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        hourTile(6),
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        hourTile(12),
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        hourTile(18),
                        nullTile,
                        nullTile,
                        nullTile,
                        nullTile,
                        hourTile(23),
                    ],
                ]}
                margin={1}
            />
            <TileGrid
                tileSizeX={20}
                tileSizeY={20}
                tileItemInfos={tileItemInfos}
                margin={1}
                onTileClick={handleTileClick}
            />
            <HealthDetailViewer
                userId={userData ? userData.id : ""}
                onClose={() => {
                    refetchHealthData();
                    setIsOpenDialog(false);
                }}
                isOpenDialog={isOpenDialog}
                startUnixTime={startUnixTime}
                endUnixTime={endUnixTime}
            />
        </div>
    );
};
