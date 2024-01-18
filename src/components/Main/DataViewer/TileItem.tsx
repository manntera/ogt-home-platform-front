import { Box, Tooltip, Typography } from '@mui/material';

type Props = {
    sizex: number;
    sizey: number;
    text: string;
    toolTipText: string | null;
    color: string;
    outlineColor: string;
    OutlineSize: number;
    style: React.CSSProperties;
    onClick: () => void;
};

export const TileItem: React.FC<Props> = ({ sizex, sizey, text, toolTipText, color, outlineColor, OutlineSize, style, onClick }) => {
    const [open, setOpen] = useState(false);

    const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        setOpen(true);
        setTimeout(() => setOpen(false), 5000);
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
                onClick={onClick}
                onTouchEnd={onTouchEnd}
            >
                <Typography sx={{ userSelect: 'none' }}>{text}</Typography>
            </Box>
        </Tooltip>
    );
};
function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.');
}

