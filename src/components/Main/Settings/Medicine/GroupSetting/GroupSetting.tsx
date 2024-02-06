import { BackButton } from "../../Util/BackButton";

type Props = {
    onBack: () => void;
};

export const GroupSetting: React.FC<Props> = ({ onBack }) => {
    return <BackButton onBack={() => onBack()} />;
};
