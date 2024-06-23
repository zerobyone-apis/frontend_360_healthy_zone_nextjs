import React, { ReactElement } from 'react';

export type OptionCheckType = {
    data: {
        icon?: ReactElement;
        title: string,
        radio?: boolean,
        visible?: boolean;
    },
    handleClick: (e: any) => any,
    selected?: boolean,
}

export const OptionCheck = ({
    data,
    handleClick,
    selected,
}: OptionCheckType) => {

    return (
        <div className={`cursor-pointer flex items-center justify-between space-x-4 ${selected ? 'text-[#009688] bg-blue-100' : 'hover:text-[#009688] hover:bg-blue-100'} rounded-lg p-2`} onClick={() => handleClick(data.title)}>
            <span className="select-none">{data.title}</span>
            {
                selected ? (
                    <svg className="flex-shrink-0 w-5 h-5 text-jungle-green-500 dark:text-jungle-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                ) : (
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                )
            }
        </div>
    );
};
