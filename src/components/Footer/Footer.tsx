import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { ContentDataList, ContentItemData } from '../ContentDataList';

type FooterProps = {
    contentsData: typeof ContentDataList;
    onTabSelect: (item: ContentItemData) => void;
};

export const Footer: React.FC<FooterProps> = ({ contentsData, onTabSelect }) => {
    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', overflowX: 'auto', boxShadow: `5` }}>
            <BottomNavigation sx={{ backgroundColor: '#B1EDE8' }}
                onChange={(event, newValue) => {
                    onTabSelect(contentsData[newValue]);
                }}
                showLabels
            >
                {contentsData.map((tab, index) => (
                    <BottomNavigationAction key={index} label={tab.label} icon={tab.icon} sx={{ minWidth: `30%` }} />
                ))}
            </BottomNavigation>
        </Box>
    );
};
