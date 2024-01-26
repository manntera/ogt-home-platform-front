import {
    usePostApi,
    HealthGetResponse,
    HealthApiUrl,
    HealthGetRequest,
} from "@/hooks/usePostApi";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    onClickClose: () => void;
    isOpenDialog: boolean;
    startUnixTime: number;
    endUnixTime: number;
    userId: string;
};

export const HealthDetailViewer: React.FC<Props> = ({
    onClickClose,
    isOpenDialog,
    startUnixTime,
    endUnixTime,
    userId,
}) => {
    const targetDate = new Date(startUnixTime * 1000);
    const targetMonth = targetDate.getMonth();
    const targetDay = targetDate.getDate();
    const targetHour = targetDate.getHours();

    const [healthData, setHealthData] = useState<HealthGetResponse[]>([]);

    const { submitData: submitGetHealth } = usePostApi<
        HealthGetRequest,
        HealthGetResponse[]
    >(HealthApiUrl + "get");

    const handleClose = () => {
        setHealthData([]);
        onClickClose();
    };

    useEffect(() => {
        const fetchHealthData = async () => {
            if (startUnixTime === 0 || endUnixTime === 0) {
                return;
            }
            const request: HealthGetRequest = {
                userId: userId,
                startTime: startUnixTime,
                endTime: endUnixTime,
            };

            const res = await submitGetHealth(request);
            console.log(res);
            if (res && res.length > 0) {
                setHealthData(res);
            }
        };
        fetchHealthData();
    }, [startUnixTime, endUnixTime, userId, submitGetHealth, isOpenDialog]);

    return (
        <Dialog open={isOpenDialog} onClose={handleClose} fullWidth={true}>
            <DialogTitle>
                {targetMonth}月{targetDay}日 {targetHour}時の健康情報
            </DialogTitle>
            <DialogContent>
                <List>
                    {healthData.map((item, index) => {
                        const date = new Date(item.timestamp * 1000);
                        const hours = date.getHours();
                        const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                        return (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${hours}:${minutes}`}
                                    secondary={`【体調】 ${
                                        item.healthScore
                                    }【コメント】${
                                        item.comment || "コメントなし"
                                    }`}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
