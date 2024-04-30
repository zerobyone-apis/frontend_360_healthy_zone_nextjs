import TextField from '@mui/material/TextField';
import React, { ReactElement, useState } from 'react';

export type OptionInputType = {
    handleClick: (text: string) => any, // Modificamos el tipo de handleClick
    selected?: boolean,
}

export const OptionInput = ({
    handleClick,
    selected,
}: OptionInputType) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setInputValue(text);
        handleClick(text); // Llamamos a handleClick mientras se escribe
    };

    return (
        <div className={`flex items-center p-4 bg-white rounded-lg hover:shadow-lg`}>
            <TextField
                label={""}
                value={inputValue}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                InputProps={{
                    style: {
                        borderRadius: '0.375rem',
                        backgroundColor: selected ? '#E6FFFA' : 'inherit',
                    }
                }}
            />
        </div>
    );
};