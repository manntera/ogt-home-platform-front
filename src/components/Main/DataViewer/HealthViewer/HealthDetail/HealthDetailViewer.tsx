import {
    usePostApi,
    HealthGetResponse,
    HealthGetRequest,
    HealthGetApiUrl,
} from "@/hooks/usePostApi";

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import { MainDialog } from "./MainDialog/MainDialog";

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

    const handleClose = () => {
        setHealthData([]);
        onClose();
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
        <MainDialog
            isOpenDialog={isOpenDialog}
            userId={userId}
            targetMonth={targetDate.month}
            targetDay={targetDate.day}
            targetHour={targetDate.hour}
            healthData={healthData}
            handleClose={handleClose}
        />
    );
};
