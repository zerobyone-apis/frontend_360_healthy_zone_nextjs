import { useState } from 'react';

type UseQuestionReturn = {
    optionsSelected: string[];
    handleOptionSelected: (option: string) => void;
};

const useQuestion = (initialOptionsSelected: string[] = [], isMultiple: boolean = false): UseQuestionReturn => {
    const [optionsSelected, setOptionsSelected] = useState<string[]>(initialOptionsSelected);

    const handleOptionSelected = (option: string) => {
        if (isMultiple) {
            // Verificar si la opción ya está seleccionada
            const index = optionsSelected.indexOf(option);
            if (index !== -1) {
                // Si la opción ya está seleccionada, la eliminamos del array
                const newOptionsSelected = [...optionsSelected];
                newOptionsSelected.splice(index, 1);
                setOptionsSelected(newOptionsSelected);
            } else {
                // Si la opción no está seleccionada, la agregamos al array
                setOptionsSelected([...optionsSelected, option]);
            }
        } else {
            // Para preguntas de opción única, reemplazamos la opción seleccionada anterior
            setOptionsSelected([option]);
        }
    };

    return { optionsSelected, handleOptionSelected };
};

export default useQuestion;