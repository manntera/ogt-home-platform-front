import { useState } from 'react';
import { HealthViewer } from './HealthViewer';

export const DataViewer = () => {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());

    return (
        <HealthViewer
            year={year}
            month={month}
        />
    );
}
