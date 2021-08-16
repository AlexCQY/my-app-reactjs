import React, { FC, useEffect, useState } from 'react';
import DropDown, { DropDownItem } from '../../Atoms/DropDown';
import displayText from '../../../constants/display-text';
import TextField from '../../Atoms/TextField';
import { FastField, Field, FieldArray, FieldArrayRenderProps, FieldAttributes, FieldProps, useField } from 'formik';
import { EFieldFormType, IFieldFormData } from './FieldFormTypes.d';
import Divider from '@material-ui/core/Divider';
import CollapseIcon from '../../Atoms/icons/CollapseIcon';
import DeleteIcon from '../../Atoms/icons/DeleteIcon';
import { Button, EButtonSize, EButtonVariant, ELabelSize, Switch } from '../../index';
import { defaultFieldVal } from '../../../features/tasks/TaskCollectorForm/task-collector-form-config';
import { useFieldFormStyles } from './FieldForm.styles';
import PlusIcon from '../../Atoms/icons/PlusIcon';
import ExpandIcon from '../../Atoms/icons/ExpandIcon';
import Label from '../../Atoms/amigos-typography/Label';
import Options from './Options';

const FieldForm: FC<FieldArrayRenderProps> = ({ push, remove, form }: FieldArrayRenderProps) => {
    const fieldFormClasses = useFieldFormStyles();
    const [fieldsExpandStatus, setFieldsExpandStatus] = useState(new Array(form.values.fieldForm.length).fill(true));
    //This to set the field expand status based on user actions
    useEffect(() => {
        if (form.submitCount > 0 && !form.isValid) {
            setFieldsExpandStatus((prevState) => {
                const formErrors = form?.errors?.fieldForm;
                if (Array.isArray(formErrors)) {
                    if (formErrors.length > 0) {
                        const newState = [...prevState];
                        formErrors.forEach((val: any, index: number) => {
                            if (val) newState[index] = true;
                        });
                        return newState;
                    }
                }
                return prevState;
            });
        }
    }, [form.submitCount]);
    //Function to toggle expand status
    const toggleFieldForm = (index: number) => {
        setFieldsExpandStatus((prev) => {
            const newFieldExpandStatus = [...prev];
            newFieldExpandStatus[index] = !prev[index];
            return newFieldExpandStatus;
        });
    };
    //Function that is called when u click add a field
    const onAddField = () => {
        push(defaultFieldVal);
        setFieldsExpandStatus((prev) => {
            const newFieldExpandStatus = [...prev];
            newFieldExpandStatus.push(true);
            return newFieldExpandStatus;
        });
    };

    return (
        <>
            {form.values.fieldForm.map((value: IFieldFormData, index: number, currentArr: IFieldFormData[]) => {
                if (fieldsExpandStatus[index]) {
                    return (
                        <div
                            className={fieldFormClasses.root}
                            key={`collector-${index}`}
                            data-testid={`fieldForm-${index}`}
                        >
                            <FastField name={`fieldForm.${index}.fieldType`}>
                                {({ field }: FieldProps) => (
                                    <DropDown
                                        testId={`collector-form-field-type-${index}`}
                                        id={`collector-form-field-type-${index}`}
                                        className={fieldFormClasses.fieldType}
                                        label={displayText.TaskText.FormText.FieldType}
                                        labelId="collector-form-field-type-label"
                                        value={field.value}
                                        name={field.name}
                                        onChange={field.onChange}
                                    >
                                        <DropDownItem value="text">Text</DropDownItem>
                                        <DropDownItem value="number">Number</DropDownItem>
                                        <DropDownItem value="dropDown">Drop down</DropDownItem>
                                        <DropDownItem value="geoLocation">Geo-Location</DropDownItem>
                                    </DropDown>
                                )}
                            </FastField>
                            {
                                <FastField name={`fieldForm.${index}.fieldName`}>
                                    {({ field, meta }: FieldProps) => {
                                        return (
                                            <TextField
                                                id={`fieldName-${index}`}
                                                name={field.name}
                                                className={fieldFormClasses.fieldName}
                                                onChange={field.onChange}
                                                value={field.value}
                                                required
                                                label={displayText.TaskText.FormText.FieldName}
                                                onBlur={field.onBlur}
                                                helperText={meta.touched ? meta.error : ''}
                                                error={meta.touched && Boolean(meta.error)}
                                            />
                                        );
                                    }}
                                </FastField>
                            }
                            {form.values.fieldForm[index].fieldType === EFieldFormType.DROP_DOWN && (
                                <FieldArray name={`fieldForm.${index}.fieldOptions`}>
                                    {(props) => <Options fieldFormIndex={index} {...props} />}
                                </FieldArray>
                            )}
                            <FastField name={`fieldForm.${index}.fieldDescription`}>
                                {({ field }: FieldProps) => (
                                    <TextField
                                        id={`fieldDescription-${index}`}
                                        name={field.name}
                                        className={fieldFormClasses.fieldDescription}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        label={displayText.TaskText.FormText.FieldDescription}
                                        inputProps={{ maxlength: 150 }}
                                    />
                                )}
                            </FastField>
                            {form.values.fieldForm[index].fieldType === EFieldFormType.NUMBER && (
                                <FastField name={`fieldForm.${index}.fieldUnit`}>
                                    {({ field }: FieldProps) => (
                                        <TextField
                                            id={`fieldUnit-${index}`}
                                            className={fieldFormClasses.fieldUnit}
                                            name={field.name}
                                            onChange={field.onChange}
                                            value={field.value}
                                            label={displayText.TaskText.FormText.FieldUnit}
                                        />
                                    )}
                                </FastField>
                            )}
                            <Divider />
                            <div className={fieldFormClasses.bottomActions}>
                                <CollapseIcon
                                    testId={`collapseIcon-${index}`}
                                    className={fieldFormClasses.collapseIcon}
                                    onClick={() => toggleFieldForm(index)}
                                />
                                {currentArr.length !== 1 && (
                                    <DeleteIcon
                                        testId={`deleteIcon-${index}`}
                                        className={fieldFormClasses.deleteIcon}
                                        onClick={() => remove(index)}
                                    />
                                )}
                                <FastField name={`fieldForm.${index}.required`}>
                                    {({ field }: FieldProps) => (
                                        <Switch
                                            testId={`requiredToggle-${index}`}
                                            className={fieldFormClasses.requiredSwitch}
                                            value={field.value}
                                            onChange={field.onChange}
                                            name={field.name}
                                            label={displayText.TaskText.FormText.Required}
                                        />
                                    )}
                                </FastField>
                            </div>
                        </div>
                    );
                }
                return (
                    <div key={`collector-${index}`} className={fieldFormClasses.collapsedFormField}>
                        <Label data-testid="fieldForm-fieldName" size={ELabelSize.N}>
                            {form.values.fieldForm[index].fieldName
                                ? form.values.fieldForm[index].fieldName
                                : displayText.TaskText.FormText.FieldName}
                            {form.values.fieldForm[index].required ? (
                                <span className={fieldFormClasses.labelMandatoryStyles}>*</span>
                            ) : (
                                ''
                            )}
                        </Label>
                        <ExpandIcon onClick={() => toggleFieldForm(index)} testId="fieldForm-expand"></ExpandIcon>
                    </div>
                );
            })}
            <Button
                testId="formField-collector-addField"
                startIcon={<PlusIcon />}
                variant={EButtonVariant.OUTLINE}
                onClick={onAddField}
            >
                {displayText.TaskText.FormText.AddField}
            </Button>
        </>
    );
};

export default FieldForm;
