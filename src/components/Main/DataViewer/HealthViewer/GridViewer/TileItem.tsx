import { Box, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
    sizex: number;
    sizey: number;
    text: string;
    toolTipText: string | null;
    color: string;
    outlineColor: string;
    OutlineSize: number;
    style: React.CSSProperties;
    onLongPress?: () => void;
    onPress?: () => void;
};

export const TileItem: React.FC<Props> = ({ sizex, sizey, text, toolTipText, color, outlineColor, OutlineSize, style, onLongPress, onPress }) => {
    const [open, setOpen] = useState(false);
    const [pressStart, setPressStart] = useState<number>(0);

    const handleTouchStart = () => {
        setPressStart(Date.now());
    };

    const handleTouchEnd = () => {
        const pressDuration = Date.now() - pressStart;
        if (pressDuration < 1000) {
            setOpen(true);
            setTimeout(() => setOpen(false), 5000);
            if (onPress) {
                onPress();
            }
        } else {
            if (onLongPress) {
                onLongPress();
            }
        }
        setPressStart(0);
    };


    return (
        <Tooltip
            title={toolTipText ?? ''}
            placement="top-end"
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
        >
            <Box
                sx={{
                    width: sizex,
                    height: sizey,
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `${OutlineSize}px solid ${outlineColor}`,
                }}
                style={style}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
            >
                <Typography sx={{ userSelect: 'none' }}>{text}</Typography>
            </Box>
        </Tooltip>
    );
};
