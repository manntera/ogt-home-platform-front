import Button from "@mui/material/Button";

type Props = {
    onBack: () => void;
};

export const BackButton: React.FC<Props> = ({ onBack }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={() => onBack()}
            sx={{
                mt: 2,
                py: 1,
                px: 2,
                borderRadius: 1,
            }}
        >
            戻る
        </Button>
    );
};
