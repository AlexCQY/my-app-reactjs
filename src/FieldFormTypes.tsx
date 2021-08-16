export enum EFieldFormType {
    TEXT = 'text',
    NUMBER = 'number',
    DROP_DOWN = 'dropDown',
    GEO_LOCATION = 'geoLocation',
}

export interface IFieldFormData {
    fieldType: EFieldFormType;
    fieldName: string;
    fieldDescription: string;
    required: boolean;
    fieldUnit?: string;
    fieldOptions: string[];
}

export interface IFieldFormTypes extends IFieldFormData {
    onDelete: () => void;
    onSubmit: (val: any) => void;
    submitForm: boolean;
    setError: (val: boolean) => void;
}
