import Slider from '@mui/material/Slider';
import React from 'react';

type OptionSliderType = {
    title: string,
    visible?: boolean;
    handleClick: (e: any) => any,
    data: { options: string[] };
}

export const OptionSlider = ({
    data,
    handleClick,
}: OptionSliderType) => {
    return (
        <div className={`flex items-center justify-center text-center p-4 bg-white rounded-lg`}>
            <div style={{ width: '80%' }}>
                <Slider
                    min={0}
                    max={data.options.length - 1}
                    step={1}
                    onChange={handleClick}
                    marks={data.options.map((value, index) => ({ value: index, label: value }))}
                    aria-labelledby="discrete-slider-custom"
                />
            </div>
        </div>
    );
};