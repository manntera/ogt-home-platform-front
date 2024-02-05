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
import {
    HealthDeleteApiUrl,
    HealthDeleteRequest,
    HealthDeleteResponse,
    HealthGetResponse,
    usePostApi,
} from "@/hooks/usePostApi";
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
};

export const MainDialog: React.FC<Props> = ({
    isOpenDialog,
    userId,
    targetMonth,
    targetDay,
    targetHour,
    healthData,
    handleClose,
}) => {
    const { submitData: submitDeleteHealth } = usePostApi<
        HealthDeleteRequest,
        HealthDeleteResponse
    >(HealthDeleteApiUrl);

    const [displayHealthData, setDisplayHealthData] =
        useState<HealthGetResponse[]>(healthData);

    useEffect(() => {
        setDisplayHealthData(healthData);
    }, [healthData]);

    const handleEdit = (itemId: string) => {
        console.log("編集: ", itemId);
    };

    const handleDelete = async (itemId: string) => {
        console.log("削除: ", itemId);
        try {
            const response = await submitDeleteHealth({
                uuid: itemId,
                userId: userId,
            });
            console.log(response);
            setDisplayHealthData(
                displayHealthData.filter((item) => item.id !== response.id)
            );
        } catch (error) {
            console.error("削除処理でエラーが発生しました", error);
        }
    };
    return (
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
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
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
    );
};
