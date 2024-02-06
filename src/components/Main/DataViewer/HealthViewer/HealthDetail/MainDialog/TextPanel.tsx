import { ListItemText, Typography } from "@mui/material";

type Props = {
    hour: number;
    minute: string;
    healthScore: number;
    comment: string;
};

export const TextPanel: React.FC<Props> = ({
    hour,
    minute,
    healthScore,
    comment,
}) => {
    return (
        <ListItemText
            primary={`${hour}:${minute}`}
            secondary={
                <>
                    <Typography variant="body2" component="span">
                        {`【体調】 ${healthScore}`}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="textSecondary">
                        {`【コメント】 ${comment || "コメントなし"}`}
                    </Typography>
                </>
            }
            disableTypography={true}
            sx={{ mr: 2 }}
        />
    );
};
