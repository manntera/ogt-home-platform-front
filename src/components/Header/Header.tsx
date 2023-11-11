import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = () => (
    <AppBar position="fixed" sx={{ backgroundColor: '#FBCFE8' }}>
        <Toolbar sx={{ minHeight: '64px' }}>
            <Typography variant="h6" color={`#000000`}>ページのタイトル</Typography>
        </Toolbar>
    </AppBar>
);
