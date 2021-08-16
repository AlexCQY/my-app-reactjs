import { Field, FieldArray, FieldArrayRenderProps } from 'formik';
import React, { FC } from 'react';
import { IFieldFormData } from '.';
import { Button, TextField } from '@material-ui/core';

type MyProps = { fieldFormIndex: number } & FieldArrayRenderProps;

const Options: FC<MyProps> = ({ fieldFormIndex, push, remove, form }: MyProps) => {
    return (
        <div>
            {form.values.fieldForm[fieldFormIndex].fieldOptions.map((value: IFieldFormData, index: number) => {
                return (
                    <div key={index}>
                        <Field name={`fieldForm.${fieldFormIndex}.fieldOptions.${index}`} as={TextField}></Field>
                        <Button onClick={() => remove(index)}>x{index}</Button>
                    </div>
                );
            })}

            <Button onClick={() => push('')}>+</Button>
        </div>
    );
};

export default Options;
