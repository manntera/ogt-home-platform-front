import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { HealthGetResponse } from "@/hooks/usePostApi";

type Props = {
    isOpen: boolean;
    editData: HealthGetResponse | undefined;
    onClose: () => void;
    onConfirm: (
        comment: string,
        score: number,
        timestamp: number,
        medicineName: string
    ) => void;
};

export const EditDialog: React.FC<Props> = ({
    isOpen,
    editData,
    onClose,
    onConfirm,
}) => {
    const [comment, setComment] = useState("");
    const [score, setScore] = useState("");
    const [medicineName, setMedicineName] = useState("");
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        if (editData === undefined) {
            return;
        }
        setComment(editData.comment ?? "");
        setScore(
            editData.healthScore !== undefined
                ? editData.healthScore.toString()
                : ""
        );
        setMedicineName(editData.medicineName ?? "");
        const localDateTimeString = new Date(editData.timestamp * 1000)
            .toLocaleString("sv", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(" ", "T");

        setDateTime(localDateTimeString);
    }, [editData]);

    const handleConfirm = () => {
        if (editData === undefined) {
            return;
        }
        const timestamp = Math.floor(new Date(dateTime).getTime() / 1000);
        const confirmedScore = score !== "" ? parseInt(score, 10) : 0;
        onConfirm(comment, confirmedScore, timestamp, medicineName);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>データ変更</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="コメント"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="スコア"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={score}
                    onChange={(e) =>
                        setScore(
                            e.target.value === ""
                                ? e.target.value
                                : e.target.value
                        )
                    }
                    inputProps={{ min: "-5", max: "5", step: "1" }}
                />
                <FormControl fullWidth>
                    <InputLabel id="medicine-select-label">薬を選択</InputLabel>
                    <Select
                        labelId="medicine-select-label"
                        id="medicine-select"
                        value={medicineName}
                        label="薬を選択"
                        onChange={(e) => setMedicineName(e.target.value)}
                    >
                        <MenuItem
                            value=""
                            style={{ height: "50px" }}
                        ></MenuItem>
                        <MenuItem value="とA" style={{ height: "50px" }}>
                            とA
                        </MenuItem>
                        <MenuItem value="とB" style={{ height: "50px" }}>
                            とB
                        </MenuItem>
                        <MenuItem value="とC" style={{ height: "50px" }}>
                            とC
                        </MenuItem>
                        <MenuItem value="夜" style={{ height: "50px" }}>
                            夜
                        </MenuItem>
                        <MenuItem value="寝" style={{ height: "50px" }}>
                            寝
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="日付と時刻"
                    type="datetime-local"
                    fullWidth
                    variant="outlined"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
                <Button onClick={handleConfirm}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};
