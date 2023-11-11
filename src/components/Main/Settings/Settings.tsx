import React, { useState } from 'react';
import { ContentList } from './ContentList';
import { ContentItemData } from './ContentItem';

const Settings = () => {
    const [selectedComponentKey, setSelectedComponentKey] = useState<ContentItemData | null>(null);

    const handleBack = () => {
        setSelectedComponentKey(null);
    };

    const renderComponent = () => {
        if (selectedComponentKey === null) {
            return <ContentList onMenuClick={setSelectedComponentKey} />;
        }
        const Component = selectedComponentKey.component;
        return <Component onBack={handleBack} />;
    };

    return (
        <div>
            {renderComponent()}
        </div>
    );
};

export default Settings;
