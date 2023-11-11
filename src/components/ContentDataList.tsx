import LifeManagement from "./Main/LifeManagement/LifeManagement";
import { DataViewer } from "./Main/DataViewer/DataViewer";
import SettingsComponent from "./Main/Settings/Settings";
import {
    Create, Pageview, Settings
} from "@mui/icons-material";

export type ContentItemData = {
    label: string;
    icon: JSX.Element;
    component: React.FC<{ onBackClick?: () => void }>;
}

export const ContentDataList: ContentItemData[] = [
    {
        label: '記録',
        icon: <Create />,
        component: LifeManagement,
    },
    {
        label: '確認',
        icon: <Pageview />,
        component: DataViewer,
    },
    {
        label: '設定',
        icon: <Settings />,
        component: SettingsComponent,
    },
];