import React, { ReactElement } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

type OptionDateType = {
    icon?: ReactElement;
    visible?: boolean;
    handleClick: (e: any) => any,
}

export const OptionDate = ({
    icon,
    visible,
    handleClick,
}: OptionDateType) => {
    return (
        <div className={`flex items-center justify-center text-center p-4 bg-white rounded-lg`}>
            <MobileDatePicker
                onChange={(date: any) => handleClick(date)}
            />
        </div>
    );
};