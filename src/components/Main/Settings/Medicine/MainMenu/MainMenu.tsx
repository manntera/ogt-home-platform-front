import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { BackButton } from "../../Util/BackButton";
import { MenuItem } from "./MenuItem";

type Props = {
    onSelectMedicineItem: () => void;
    onSelectMedicineGroup: () => void;
    onBack: () => void;
};

export const MainMenu: React.FC<Props> = ({
    onSelectMedicineItem,
    onSelectMedicineGroup,
    onBack,
}) => {
    return (
        <>
            <Grid
                container
                spacing={2}
                style={{ width: "100%", marginBottom: 20 }}
            >
                <Grid item xs={6}>
                    <MenuItem
                        onClick={() => onSelectMedicineItem()}
                        lines={["薬を登録"]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MenuItem
                        onClick={() => onSelectMedicineGroup()}
                        lines={["薬グループ", "を登録"]}
                    />
                </Grid>
            </Grid>
            <BackButton onBack={() => onBack()} />
        </>
    );
};
