import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    DialogActions,
    Button,
} from "@mui/material";
import { ControlPanel } from "./ControlPanel";
import { HealthGetResponse } from "@/hooks/usePostApi";
import { TextPanel } from "./TextPanel";
import { useEffect, useState } from "react";

type Props = {
    isOpenDialog: boolean;
    userId: string;
    targetMonth: number;
    targetDay: number;
    targetHour: number;
    healthData: HealthGetResponse[];
    handleClose: () => void;
    handleOpenDeleteConfirmDialog: (itemId: string) => void;
    handleOpenEditDialog: (itemId: string) => void;
};

export const MainDialog: React.FC<Props> = ({
    isOpenDialog,
    targetMonth,
    targetDay,
    targetHour,
    healthData,
    handleClose,
    handleOpenDeleteConfirmDialog,
    handleOpenEditDialog,
}) => {
    const [displayHealthData, setDisplayHealthData] =
        useState<HealthGetResponse[]>(healthData);

    useEffect(() => {
        setDisplayHealthData(healthData);
    }, [healthData]);

    const handleEdit = (itemId: string) => {
        console.log("編集: ", itemId);
    };

    return (
        <>
            <Dialog open={isOpenDialog} onClose={handleClose} fullWidth={true}>
                <DialogTitle>
                    {targetMonth + 1}月{targetDay}日 {targetHour}時の健康情報
                </DialogTitle>
                <DialogContent>
                    <List>
                        {displayHealthData.map((item, index) => {
                            const date = new Date(item.timestamp * 1000);
                            const minutes = date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0");
                            return (
                                <ListItem
                                    key={index}
                                    sx={{
                                        mb: 1,
                                        borderBottom: "1px solid #ddd",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <TextPanel
                                        hour={targetHour}
                                        minute={minutes}
                                        healthScore={item.healthScore}
                                        comment={item.comment}
                                    />
                                    <ControlPanel
                                        handleEdit={() =>
                                            handleOpenEditDialog(item.id)
                                        }
                                        handleDelete={() =>
                                            handleOpenDeleteConfirmDialog(
                                                item.id
                                            )
                                        }
                                        id={item.id}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
