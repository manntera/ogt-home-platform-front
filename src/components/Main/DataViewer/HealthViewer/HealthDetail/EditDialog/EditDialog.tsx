import {
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from "@mui/material";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const EditDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>データ変更</DialogTitle>
    </Dialog>
);
