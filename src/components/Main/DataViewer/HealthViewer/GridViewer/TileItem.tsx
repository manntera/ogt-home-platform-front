import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

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
    subText: string;
    subTextBgColor: string;
};

export const TileItem: React.FC<Props> = ({
    sizex,
    sizey,
    text,
    toolTipText,
    color,
    outlineColor,
    OutlineSize,
    style,
    onLongPress,
    onPress,
    subText,
    subTextBgColor,
}) => {
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
            title={toolTipText ?? ""}
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `${OutlineSize}px solid ${outlineColor}`,
                    position: "relative",
                }}
                style={style}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
            >
                {subText && (
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            position: "absolute",
                            top: `${-sizex / 4}px`,
                            left: `${-sizex / 4.7}px`,
                            fontSize: "0.6rem",
                            color: "text.primary",
                            userSelect: "none",
                            width: sizex * 0.45,
                            height: sizey * 0.85,
                            backgroundColor: subTextBgColor,
                            lineHeight: "1",
                        }}
                    >
                        {subText}
                    </Typography>
                )}
                <Typography sx={{ userSelect: "none" }}>{text}</Typography>
            </Box>
        </Tooltip>
    );
};
