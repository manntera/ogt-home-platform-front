import { Box } from "@mui/material";
import { MainMenu } from "./MainMenu/MainMenu";
import { useState } from "react";
import { GroupSetting } from "./GroupSetting/GroupSetting";
import { ItemSetting } from "./ItemSetting/ItemSetting";

type Props = {
    onBack: () => void;
};
enum MedicineMenu {
    MainMenu,
    ItemSetting,
    GroupSetting,
}
export const Medicine: React.FC<Props> = ({ onBack }) => {
    const [currentMenu, setCurrentMenu] = useState<MedicineMenu>(
        MedicineMenu.MainMenu
    );
    const renderCurrentMenu = () => {
        switch (currentMenu) {
            case MedicineMenu.MainMenu:
                return (
                    <MainMenu
                        onSelectMedicineItem={() =>
                            setCurrentMenu(MedicineMenu.ItemSetting)
                        }
                        onSelectMedicineGroup={() =>
                            setCurrentMenu(MedicineMenu.GroupSetting)
                        }
                        onBack={onBack}
                    />
                );
            case MedicineMenu.ItemSetting:
                return (
                    <ItemSetting
                        onBack={() => setCurrentMenu(MedicineMenu.MainMenu)}
                    />
                );
            case MedicineMenu.GroupSetting:
                return (
                    <GroupSetting
                        onBack={() => setCurrentMenu(MedicineMenu.MainMenu)}
                    />
                );
            default:
                return (
                    <MainMenu
                        onSelectMedicineItem={() =>
                            setCurrentMenu(MedicineMenu.ItemSetting)
                        }
                        onSelectMedicineGroup={() =>
                            setCurrentMenu(MedicineMenu.GroupSetting)
                        }
                        onBack={onBack}
                    />
                );
        }
    };
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
            {renderCurrentMenu()}
        </Box>
    );
};
