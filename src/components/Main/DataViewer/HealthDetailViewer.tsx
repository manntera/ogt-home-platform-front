import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Props = {
    onClickClose: () => void;
    isOpenDialog: boolean;
    startUnixTime: number;
    endUnixTime: number;
}
export const HealthDetailViewer: React.FC<Props> = ({ onClickClose, isOpenDialog, startUnixTime, endUnixTime }) => {
    const targetDate = new Date(startUnixTime * 1000);
    const targetMonth = targetDate.getMonth();
    const targetDay = targetDate.getDate();
    const targetHour = targetDate.getHours();
    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Dialog open={isOpenDialog} onClose={() => onClickClose()}>
                <DialogTitle>
                    {targetMonth}月{targetDay}日 {targetHour}時
                </DialogTitle>
                <DialogContent>
                    体調詳細
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClickClose()} color="primary"> OK</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}
