import React from "react";
import { TileItem } from "./TileItem";

export type TileItemInfo = {
    text: string;
    color: string;
    toolTipText: string | null;
    outlineColor: string;
    outlineSize: number;
    subText: string;
    subTextBgColor: string;
};

type Props = {
    tileSizeX: number;
    tileSizeY: number;
    tileItemInfos: TileItemInfo[][];
    margin: number;
    onTileClick?: (columnIndex: number, tileIndex: number) => void;
};

export const TileGrid: React.FC<Props> = ({
    tileSizeX,
    tileSizeY,
    tileItemInfos,
    margin,
    onTileClick,
}) => {
    return (
        <div style={{ display: "flex" }}>
            {tileItemInfos.map((column, columnIndex) => (
                <div
                    key={columnIndex}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {column.map((tileItemInfo, tileIndex) => (
                        <TileItem
                            key={tileIndex}
                            sizex={tileSizeX}
                            sizey={tileSizeY}
                            text={tileItemInfo.text}
                            toolTipText={
                                tileItemInfo.toolTipText === null
                                    ? null
                                    : tileItemInfo?.toolTipText
                            }
                            color={tileItemInfo.color}
                            outlineColor={tileItemInfo.outlineColor}
                            OutlineSize={tileItemInfo.outlineSize}
                            style={{
                                marginBottom: margin,
                                marginRight: margin,
                            }}
                            onLongPress={() => {
                                if (onTileClick) {
                                    onTileClick(columnIndex, tileIndex);
                                }
                            }}
                            subText={tileItemInfo.subText}
                            subTextBgColor={tileItemInfo.subTextBgColor}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
