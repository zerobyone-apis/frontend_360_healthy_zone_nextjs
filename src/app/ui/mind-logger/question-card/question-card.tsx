import React, { useEffect, useMemo } from 'react';
import useQuestion from '../hooks/useQuestion';
import { Options } from '../option-card/options';

export type QuestionCardType = {
    id?: number,
    title: string,
    value: string,
    type: string,
    multiple: boolean,
    optional?: boolean,
    options: { title: string }[],
};

type QuestionCardProps = {
    data: QuestionCardType;
    visible?: boolean;
    multiple?: boolean;
    onSubmitOptions: (name: string, val: string[]) => void;
};

const QuestionCard = ({
    data,
    onSubmitOptions,
}: QuestionCardProps) => {

    const { handleOptionSelected, optionsSelected } = useQuestion([], data.multiple);

    useEffect(() => {
        // if (optionsSelected.length) {
        onSubmitOptions(data.value, optionsSelected)
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsSelected])

    const onResponse = (option: any) => {
        handleOptionSelected(option)
    }

    if (!data) return null;


    return (
        // bg-[#009688]
        <div className="w-auto my-8 mx-4 px-4 py-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 select-none">{data.title}</h3>
            <Options
                options={data?.options}
                type={data.type}
                optionsSelected={optionsSelected}
                handleClick={onResponse}
            />
        </div>
    );
};

export default QuestionCard;
