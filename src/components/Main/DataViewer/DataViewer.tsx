import { useState } from "react";
import { HealthViewer } from "./HealthViewer/HealthViewer";
import { Grid, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

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
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <IconButton onClick={decrementYear} size="large">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={decrementMonth} size="large">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        {year}年 {month}月
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={incrementMonth} size="large">
                        <ArrowForwardIos />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={incrementYear} size="large">
                        <ArrowForwardIos />
                    </IconButton>
                </Grid>
            </Grid>
            <HealthViewer year={year} month={month} />
        </div>
    );
};
