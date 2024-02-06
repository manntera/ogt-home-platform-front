import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    handleEdit: (itemId: string) => void;
    handleDelete: (itemId: string) => void;
    id: string;
};

export const ControlPanel: React.FC<Props> = ({
    handleEdit,
    handleDelete,
    id,
}) => {
    return (
        <div
            style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
            }}
        >
            <IconButton
                onClick={() => handleEdit(id)}
                size="large"
                color="primary"
            >
                <EditIcon />
            </IconButton>
            <IconButton
                onClick={() => handleDelete(id)}
                size="large"
                color="secondary"
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
