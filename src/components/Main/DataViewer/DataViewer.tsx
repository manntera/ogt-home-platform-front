import { BarChart } from '@mui/x-charts/BarChart';

export const DataViewer = () => {
    return (
        <div>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C', 'bar D'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3, 3],
                    },
                ]}
                width={300}
                height={300}
            />
        </div>
    );
}