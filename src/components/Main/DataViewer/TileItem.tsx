import { Box, Typography } from '@mui/material';

type Props = {
    sizex: number;
    sizey: number;
    text: string;
    color: string;
    style: React.CSSProperties;
};

export const TileItem: React.FC<Props> = ({ sizex, sizey, text, color, style }) => {
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
};