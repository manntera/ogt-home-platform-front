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

export const DeleteConfirmationDialog: React.FC<Props> = ({
    isOpen,
    onClose,
    onConfirm,
}) => (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
            <DialogContentText>
                この項目を削除してもよろしいですか？
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                いいえ
            </Button>
            <Button onClick={onConfirm} color="primary" autoFocus>
                はい
            </Button>
        </DialogActions>
    </Dialog>
);
