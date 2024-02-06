import {
    usePostApi,
    HealthGetResponse,
    HealthGetRequest,
    HealthGetApiUrl,
    HealthDeleteApiUrl,
    HealthDeleteResponse,
    HealthDeleteRequest,
    HealthAddRequest,
    HealthAddResponse,
    HealthAddApiUrl,
} from "@/hooks/usePostApi";

import { useEffect, useState } from "react";
import { MainDialog } from "./MainDialog/MainDialog";
import { DeleteConfirmationDialog } from "./DeleteDialog/DeleteConfirmationDialog";
import { EditDialog } from "./EditDialog/EditDialog";
import { CircularProgress } from "@mui/material";

type Props = {
    onClose: () => void;
    isOpenDialog: boolean;
    startUnixTime: number;
    endUnixTime: number;
    userId: string;
};

export const HealthDetailViewer: React.FC<Props> = ({
    onClose,
    isOpenDialog,
    startUnixTime,
    endUnixTime,
    userId,
}) => {
    const date = new Date(startUnixTime * 1000);
    const [healthData, setHealthData] = useState<HealthGetResponse[]>([]);

    const { submitData: submitGetHealth } = usePostApi<
        HealthGetRequest,
        HealthGetResponse[]
    >(HealthGetApiUrl);

    const { submitData: submitDeleteHealth } = usePostApi<
        HealthDeleteRequest,
        HealthDeleteResponse
    >(HealthDeleteApiUrl);

    const { submitData: submitAddHealth } = usePostApi<
        HealthAddRequest,
        HealthAddResponse
    >(HealthAddApiUrl);

    const handleClose = () => {
        setHealthData([]);
        onClose();
    };

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenConfirmDialog = (itemId: string) => {
        setDeleteItemId(itemId);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleOpenEditDialog = (itemId: string) => {
        setEditItemId(itemId);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };
    const fetchHealthData = async () => {
        setIsLoading(true);
        const request: HealthGetRequest = {
            userId: userId,
            startTime: startUnixTime,
            endTime: endUnixTime,
        };
        const res = await submitGetHealth(request);
        if (res && res.length > 0) {
            setHealthData(res);
        }
        setIsLoading(false);
    };
    const handleConfirmDelete = async () => {
        setIsLoading(true);
        if (deleteItemId) {
            try {
                const response = await submitDeleteHealth({
                    uuid: deleteItemId,
                    userId: userId,
                });
                console.log(response);
            } catch (error) {
                console.error("削除処理でエラーが発生しました", error);
            }
            handleCloseConfirmDialog();
        }
        fetchHealthData(); // 再フェッチを行う
        setIsLoading(false);
    };
    const handleEdit = async (
        comment: string,
        score: number,
        timestamp: number
    ) => {
        if (editItemId) {
            try {
                setIsLoading(true);
                console.log(comment, score, timestamp);
                await submitAddHealth({
                    userId: userId,
                    timestamp: timestamp,
                    healthScore: score,
                    comment: comment,
                });
                await submitDeleteHealth({
                    uuid: editItemId,
                    userId: userId,
                });
                fetchHealthData(); // 再フェッチを行う
            } catch (error) {
                console.error("編集処理でエラーが発生しました", error);
            }
            handleCloseEditDialog();
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (isOpenDialog) {
            fetchHealthData();
        }
    }, [isOpenDialog, startUnixTime, endUnixTime, userId, submitGetHealth]);

    return (
        <>
            <MainDialog
                isOpenDialog={isOpenDialog}
                isLoading={isLoading}
                userId={userId}
                targetMonth={date.getMonth()}
                targetDay={date.getDate()}
                targetHour={date.getHours()}
                healthData={healthData}
                handleClose={handleClose}
                handleOpenDeleteConfirmDialog={handleOpenConfirmDialog}
                handleOpenEditDialog={handleOpenEditDialog}
            />
            <DeleteConfirmationDialog
                isOpen={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDelete}
            />
            <EditDialog
                isOpen={openEditDialog}
                editData={healthData.find((item) => item.id === editItemId)}
                onClose={handleCloseEditDialog}
                onConfirm={handleEdit}
            />
        </>
    );
};
