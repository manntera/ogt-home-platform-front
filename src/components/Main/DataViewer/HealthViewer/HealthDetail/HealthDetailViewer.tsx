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
import { formatDate } from "@/utils/dateUtils";
import { MainDialog } from "./MainDialog/MainDialog";
import { DeleteConfirmationDialog } from "./DeleteDialog/DeleteConfirmationDialog";
import { EditDialog } from "./EditDialog/EditDialog";

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
    const targetDate = formatDate(startUnixTime);
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

    const handleConfirmDelete = async () => {
        if (deleteItemId) {
            try {
                const response = await submitDeleteHealth({
                    uuid: deleteItemId,
                    userId: userId,
                });
                console.log(response);
                const updatedHealthData = healthData.filter(
                    (item) => item.id !== deleteItemId
                );
                setHealthData(updatedHealthData);
            } catch (error) {
                console.error("削除処理でエラーが発生しました", error);
            }
            handleCloseConfirmDialog();
        }
    };
    const handleEdit = async () => {
        if (editItemId) {
            try {
                //ここで更新処理を行う
            } catch (error) {
                console.error("編集処理でエラーが発生しました", error);
            }
            handleCloseEditDialog();
        }
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
        <>
            <MainDialog
                isOpenDialog={isOpenDialog}
                userId={userId}
                targetMonth={targetDate.month}
                targetDay={targetDate.day}
                targetHour={targetDate.hour}
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
                onClose={handleCloseEditDialog}
                onConfirm={handleEdit}
            />
        </>
    );
};
