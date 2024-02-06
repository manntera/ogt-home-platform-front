import Box from "@mui/material/Box";
import { BackButton } from "../Util/BackButton";

type Props = {
    onBack: () => void;
};

export const Medicine: React.FC<Props> = ({ onBack }) => {
    return (
        <Box
            style={{
                position: "absolute",
                display: "flex",
                inset: 0,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <BackButton onBack={() => onBack()} />
        </Box>
    );
};
