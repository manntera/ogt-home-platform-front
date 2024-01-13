import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SxProps } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type TimeSelectButtonProps = {
    handleSubmit: (selectedDate: Date) => void;
    isSubmitting: boolean;
    submitSuccess: boolean;
    sx?: SxProps;
};

export const TimeSelectButton: React.FC<TimeSelectButtonProps> = ({ handleSubmit, isSubmitting, submitSuccess, sx }) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

    const handleSend = () => {
        if (selectedDate) {
            handleSubmit(selectedDate.toDate());
            setOpen(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
                onClick={() => setOpen(true)}
                disabled={isSubmitting || submitSuccess}
                variant="contained"
                color="primary"
                sx={sx}
            >
                {isSubmitting ? (
                    <>
                        <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                        送信中...
                    </>
                ) : submitSuccess ? '送信完了' : '時間指定して送信'}
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>日時を選択</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ja'}>
                        <DateTimePicker
                            label="記録日時"
                            defaultValue={dayjs()}
                            value={selectedDate}
                            onChange={(val) => setSelectedDate(val)}
                            format='YYYY/MM/DD HH:mm'
                            ampm={false}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>キャンセル</Button>
                    <Button onClick={handleSend} color="primary">送信</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};
