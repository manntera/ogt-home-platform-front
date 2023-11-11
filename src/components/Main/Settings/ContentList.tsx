import React from 'react';
import { ContentItem, ContentItemData } from './ContentItem';
import { Account } from './Account/Account';
import Mypage from './MyPage/Mypage';

export const ContentDataList: ContentItemData[] = [
    {
        label: 'アカウント',
        icon: '/Main/Settings/Account.svg',
        component: Account,
    },
    {
        label: 'マイページ',
        icon: '/Main/Settings/Mypage.svg',
        component: Mypage,
    },
]

type ContentListProps = {
    onMenuClick: (component: ContentItemData) => void;
};

export const ContentList: React.FC<ContentListProps> = ({ onMenuClick }) => {
    return (
        <div>
            {ContentDataList.map((item: ContentItemData) => (
                <div onClick={() => onMenuClick(item)} key={item.label}>
                    <ContentItem label={item.label} icon={item.icon} component={item.component} />
                </div>
            ))}
        </div>
    );
};