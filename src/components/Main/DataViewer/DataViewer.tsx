import { useState } from 'react';
import { HealthViewer } from './HealthViewer';
import Button from '@mui/material/Button';

export const DataViewer = () => {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    const incrementMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const decrementMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const incrementYear = () => setYear(year + 1);
    const decrementYear = () => setYear(year - 1);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={decrementYear}>前の年</Button>
                <Button onClick={decrementMonth}>前の月</Button>
                <span>{year}年 {month}月</span>
                <Button onClick={incrementMonth}>次の月</Button>
                <Button onClick={incrementYear}>次の年</Button>
            </div>
            <HealthViewer year={year} month={month} />
        </div>
    );
}
