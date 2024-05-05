import React, { ReactElement } from 'react';
import {
    OPTION_TYPES,
    OptionCheck,
    OptionDate,
    OptionInput,
    // OptionSlider
} from '.';

export type OptionsType = {
    type: string,
    options: {
        icon?: ReactElement;
        title?: string,
        radio?: boolean,
        visible?: boolean;
    }[],
    handleClick: (e: any) => any,
    optionsSelected: string[],
}

export const Options = ({
    options,
    handleClick,
    optionsSelected,
    type,
}: OptionsType) => {

    const getOptionElement = () => {
        if (type === OPTION_TYPES.DATE) {
            return (
                <OptionDate
                    handleClick={handleClick}
                />);
        }
        if (type === OPTION_TYPES.CHECK) {
            return options.map((option: any, key: number) => (
                <OptionCheck
                    data={option}
                    selected={optionsSelected.includes(option.title)}
                    key={key}
                    handleClick={handleClick}
                />
            ))
        }
        if (type === OPTION_TYPES.INPUT) return (
            <OptionInput
                handleClick={handleClick}
            />);
        // TODO: if (type === OPTION_TYPES.SLIDER) return (
        //     <OptionSlider
        //         title=""
        //         data={options}
        //         handleClick={handleClick}
        //     />);
        return null;
    };

    return (
        <>
            {getOptionElement()}
        </>
    );
};
