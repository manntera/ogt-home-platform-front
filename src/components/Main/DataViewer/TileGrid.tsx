import React from 'react';
import { TileItem } from './TileItem';

export type TileItemInfo = {
    text: string;
    color: string;
};

type Props = {
    tileSizeX: number;
    tileSizeY: number;
    tileItemInfos: TileItemInfo[][];
    margin: number;
};

export const TileGrid: React.FC<Props> = ({ tileSizeX, tileSizeY, tileItemInfos, margin }) => {
    return (
        <div style={{ display: 'flex' }}>
            {tileItemInfos.map((column, columnIndex) => (
                <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                    {column.map((tileItemInfo, tileIndex) => (
                        <TileItem
                            key={tileIndex}
                            sizex={tileSizeX}
                            sizey={tileSizeY}
                            text={tileItemInfo.text}
                            color={tileItemInfo.color}
                            style={{ marginBottom: margin, marginRight: margin }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
