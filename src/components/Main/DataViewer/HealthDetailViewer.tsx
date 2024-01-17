import { usePostApi, HealthGetResponse, HealthApiUrl, HealthGetRequest } from "@/hooks/usePostApi";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    onClickClose: () => void;
    isOpenDialog: boolean;
    startUnixTime: number;
    endUnixTime: number;
    userId: string;
};

export const HealthDetailViewer: React.FC<Props> = ({ onClickClose, isOpenDialog, startUnixTime, endUnixTime, userId }) => {
    const targetDate = new Date(startUnixTime * 1000);
    const targetMonth = targetDate.getMonth();
    const targetDay = targetDate.getDate();
    const targetHour = targetDate.getHours();

    // 健康データの状態
    const [healthData, setHealthData] = useState<HealthGetResponse[]>([]);

    const { submitData: submitGetHealth } = usePostApi<HealthGetRequest, HealthGetResponse[]>(HealthApiUrl + "get");

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
                endTime: endUnixTime
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
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Dialog open={isOpenDialog} onClose={handleClose}>
                <DialogTitle>
                    {targetMonth}月{targetDay}日 {targetHour}時の健康情報
                </DialogTitle>
                <DialogContent>
                    <List>
                        {healthData.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`スコア: ${item.healthScore}`}
                                    secondary={`コメント: ${item.comment || 'なし'}Time: ${item.timestamp}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
