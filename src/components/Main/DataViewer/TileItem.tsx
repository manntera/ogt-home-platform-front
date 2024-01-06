import { Box, Tooltip, Typography } from '@mui/material';

type Props = {
    sizex: number;
    sizey: number;
    text: string;
    toolTipText: string | null;
    color: string;
    style: React.CSSProperties;
};

export const TileItem: React.FC<Props> = ({ sizex, sizey, text, toolTipText, color, style }) => {
    if (toolTipText == null) {
        return (
            <Box
                sx={{
                    width: sizex,
                    height: sizey,
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                style={style}
            >
                <Typography> {text}</Typography>
            </Box>
        );
    } else {
        return (
            <Tooltip title={toolTipText} placement="top-end">
                <Box
                    sx={{
                        width: sizex,
                        height: sizey,
                        bgcolor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    style={style}
                >
                    <Typography> {text}</Typography>
                </Box>
            </Tooltip>
        );
    }
};