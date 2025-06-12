"use client"
import { Fields, QuestionDTO } from '@/interfaces/questions'
import { customFormStore } from '@/stores/customForm.store';
import clsx from 'clsx';
import { Badge, Button, Drawer, Label, ListGroup, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowRight, HiCheckBadge } from "react-icons/hi2";


type Props = {
    question: QuestionDTO
}

export default function FieldsCard({ question }: Props) {

    return (
        <div className='flex flex-col w-full flex-nowrap gap-2 justify-center'>
            {question.fields?.map((field) => <DrawerField field={field} key={field.id} ></DrawerField>)}
        </div>
    )
}

function DrawerField({ field }: { field: Fields }) {
    const setAnswer = customFormStore((state: any) => state.setAnswer);
    const [isOpen, setIsOpen] = useState(false);
    const [val, setVal] = useState("");
    const handleClose = () => setIsOpen(false);
    const handleAccept = () => {
        setAnswer({ [field.id]: val });
        handleClose();
    }
    const handleOnChange = (value: any) => {
        setVal(value);
    }

    return (
        <>
            <button className='w-full p-3 rounded-xl flex justify-between bg-gray-200 hover:bg-gray-300 hover:cursor-pointer' key={field.id} onClick={() => setIsOpen(true)}>
                <div className='w-full flex flex-row gap-2 text-start items-center'>
                    <p>{field.label}</p> {val && <span className='truncate max-w-full text-sm text-start text-gray-500'>{val}</span>}
                </div>

                {!val ? <HiArrowRight /> : <div><HiCheckBadge className='text-jungle-green-500' /> </div>}
            </button>

            <Drawer open={isOpen} onClose={handleClose} position="bottom" className="p-1">
                <Drawer.Header
                    closeIcon={() => null}
                    titleIcon={() => null}
                    title={field.placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                />
                <Drawer.Items className="p-5 flex-col flex gap-2">
                    {field.type === "numeric" && <NumericField field={field} val={val} onChange={handleOnChange} />}
                    {field.type === "text" && <TextField field={field} val={val} onChange={handleOnChange} />}
                    {field.type === "radio" && <MultipleField field={field} val={val} onChange={handleOnChange} />}
                    {field.type === "radio-and-other" && <MultipleOtherField field={field} val={val} onChange={handleOnChange} />}
                    <Button onClick={handleAccept} className='bg-jungle-green-500'>Accept</Button>
                </Drawer.Items>
            </Drawer>
        </>
    )
}

function NumericField({ field, onChange, val }: { field: Fields, onChange: (val: any) => void, val: any }) {

    return (
        <div className='flex flex-col  items-start'>
            {/* <div className="mb-2 block p-2">
                <Label htmlFor={field.id} value={field.label} />
            </div> */}
            <TextInput id={field.id} type="number" value={val} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className='w-full' />
        </div>
    )
}

function TextField({ field, onChange, val }: { field: Fields, onChange: (val: any) => void, val: any }) {

    return (
        <div className='flex flex-col  items-start'>
            {/* <div className="mb-2 block p-2">
                <Label htmlFor={field.id} value={field.label} />
            </div> */}
            <TextInput id={field.id} type="text" value={val} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className='w-full' />
        </div>
    )
}

function MultipleField({ field, onChange, val }: { field: Fields, onChange: (val: any) => void, val: any }) {

    if (!field.options) return null;

    return (
        <div className='p-2 flex flex-col w-full items-center'>
            <ListGroup className='w-full'>
                {field.options.map((opt) =>
                    <ListGroup.Item
                        name={opt}
                        onClick={() => onChange(opt)}
                        aria-selected={val === opt}
                        active={val === opt}
                        className={clsx(val === opt && "bg-jungle-green-500")}
                        key={opt}>{opt}</ListGroup.Item>)}
            </ListGroup>
        </div >
    )
}

function MultipleOtherField({ field, onChange, val }: { field: Fields, onChange: (val: any) => void, val: any }) {
    const [other, setOther] = useState("");
    const [showOther, setShowOther] = useState<boolean>(false);

    const handleOption = (opt: string) => {
        //If this is the last option...
        const indx = field.options?.findIndex((option) => option === opt);
        const length = field.options?.length || 0;

        if (indx == length - 1) {
            //este es el ultimo elemento, hacemos aparecer la opcion other
            return setShowOther(true);
        }
        setShowOther(false);
        onChange(opt);
    }

    const handleSetOther = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOther(e.target.value);
        onChange(e.target.value);
    }

    if (!field.options) return null;

    return (
        <div className='p-2 flex flex-col w-full items-center'>
            <ListGroup className='w-full'>
                {field.options.map((opt) => <ListGroup.Item key={opt} onClick={() => handleOption(opt)}>{opt}</ListGroup.Item>)}
            </ListGroup>
            {showOther && <TextInput id={field.id} type="text" value={other} onChange={handleSetOther} placeholder={"Specify here..."} className='w-full' />}
        </div>
    )
}