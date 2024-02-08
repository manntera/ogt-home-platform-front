import { BackButton } from "../../Util/BackButton";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

type Row = {
    id: number;
    name: string;
};

const initialRows: Row[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
];

type Props = {
    onBack: () => void;
};

export const ItemSetting: React.FC<Props> = ({ onBack }) => {
    const [rows, setRows] = useState<Row[]>(initialRows);
    const [newItemName, setNewItemName] = useState("");

    const handleAddItem = () => {
        const newItem: Row = {
            id: Math.max(0, ...rows.map((r) => r.id)) + 1,
            name: newItemName,
        };
        setRows((currentRows) => [...currentRows, newItem]);
        setNewItemName("");
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "名前",
            width: 150,
            flex: 1,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "削除",
            minWidth: 150,
            flex: 0,
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
            headerClassName: "actionsHeader",
        },
    ];

    return (
        <>
            <Box sx={{ padding: "20px", ".MuiDataGrid-root": { border: 0 } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="New Item Name"
                            variant="outlined"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleAddItem}
                        >
                            Add Item
                        </Button>
                    </Grid>
                </Grid>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    sx={{
                        "& .actions": {
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        },
                        "& .actionsHeader": {
                            justifyContent: "flex-end",
                        },
                    }}
                />
            </Box>
            <BackButton onBack={onBack} />
        </>
    );
};
