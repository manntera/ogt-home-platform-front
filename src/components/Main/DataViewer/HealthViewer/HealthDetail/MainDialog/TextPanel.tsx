import { ListItemText, Typography } from "@mui/material";

type Props = {
    hour: number;
    minute: string;
    healthScore: number;
    comment: string;
    medicineName: string;
};

export const TextPanel: React.FC<Props> = ({
    hour,
    minute,
    healthScore,
    comment,
    medicineName,
}) => {
    return (
        <ListItemText
            primary={`${hour}:${minute}`}
            secondary={
                <>
                    <br />
                    <Typography variant="body2" component="span">
                        {`【体調】 ${healthScore}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`【コメント】 ${comment || "コメントなし"}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`【薬】 ${medicineName || "なし"}`}
                    </Typography>
                </>
            }
            disableTypography={true}
            sx={{ mr: 2 }}
        />
    );
};
