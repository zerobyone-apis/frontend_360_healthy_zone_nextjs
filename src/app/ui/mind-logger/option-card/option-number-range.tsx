import React, { ReactElement } from 'react';
import { VerifiedUser } from '@mui/icons-material';

type OptionCardType = {
    icon?: ReactElement;
    title: string,
    radio?: boolean,
    visible: boolean;
}

export const OptionCard = ({
    icon,
    visible,
    title,
    radio,
}: OptionCardType) => {

    // TODO

    return (
        <div className={`border-solid border-black bg-slate-700  p-4 flex items-center ${visible ? 'block' : 'hidden'}`}>
            {/* {icon} */}
            <h2 className="flex-grow text-lg font-semibold">{title}</h2>
            {radio ? (
                <input type="radio" className="ml-auto" />
            ) : (
                <input type="checkbox" className="ml-auto" />
            )}
        </div>
    );
};

