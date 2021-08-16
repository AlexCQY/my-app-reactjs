import { array, object, string } from 'yup';
import { EFieldFormType, IFieldFormData } from '../../../ui-components';
import displayText from '../../../constants/display-text';

const defaultFieldVal: IFieldFormData = {
    fieldType: EFieldFormType.TEXT,
    fieldName: '',
    fieldDescription: '',
    required: false,
    fieldUnit: '',
    fieldOptions: [''],
};

const taskCollectorFormValidationSchema = object({
    fieldForm: array().of(
        object({ fieldName: string().trim().required(displayText.TaskText.FormText.FieldNameError) }),
    ),
});

export { defaultFieldVal, taskCollectorFormValidationSchema };