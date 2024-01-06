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
    return (
        <Tooltip title={toolTipText ?? ''} placement="top-end">
            <Box
                sx={{
                    width: sizex,
                    height: sizey,
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: toolTipText ? '1px solid white' : 'none', // 枠線の追加
                }}
                style={style}
            >
                <Typography sx={{ userSelect: 'none' }}>{text}</Typography>
            </Box>
        </Tooltip>
    );
};
