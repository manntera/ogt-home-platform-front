import React, { useState, createElement } from 'react';
import Box from '@mui/material/Box';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Main } from './Main/Main';
import { ContentDataList, ContentItemData } from '@/components/ContentDataList';

export const Layout: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<ContentItemData>(ContentDataList[0]);
    const renderComponent = () => {
        return createElement(selectedComponent.component);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <Main>
                {renderComponent()}
            </Main>
            <Footer contentsData={ContentDataList} onTabSelect={setSelectedComponent} />
        </Box >
    );
}