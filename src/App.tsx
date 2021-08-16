import React from "react";
import { Formik, Field, Form, useField, FieldAttributes, FieldArray} from "formik";
import { Button, Checkbox, TextField, Radio } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import * as yup from 'yup';
import { MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";

type MyRadioProps = {label:string} & FieldAttributes<{}>

//A custom component as we need to put label on radio buttons
const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
    const [field, meta] = useField<{}>(props);
    return (
        <FormControlLabel {...field} control={<Radio />} label={label}/>
    );
}

const MyTextField:React.FC<FieldAttributes<{}>> = ({placeholder, ...props}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
    );
}

const validation = yup.object({
    firstName: yup.string().required().max(10),
    pets: yup.array().of(yup.object({
        name: yup.string().required()
    }))
})

const App: React.FC = () => {
    return (
        <div>
            <Formik 
                initialValues={{
                    firstName: '', 
                    lastName: '', 
                    isTall: false, 
                    cookies: [],
                    yogurt: "",
                    pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random()}]
                }}
                validationSchema={validation} 
                onSubmit={(data, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    console.log(data);
                    setSubmitting(false);
            }}>
                {({ values, errors, isSubmitting}) => (
                    <Form>
                        <MyTextField 
                            placeholder="first name" 
                            name="firstName"
                        />
                        <div>
                            <Field 
                                placeholder="last name"
                                name="lastName" 
                                type="input" 
                                as={TextField}
                            />
                        </div>
                        <Field
                            name="isTall"
                            type="checkbox"
                            as={Checkbox}
                        />
                        <div>Cookies:</div>
                        <Field
                            name="cookies"
                            type="checkbox"
                            value="choc chip"
                            as={Checkbox} 
                        />
                        <Field
                            name="cookies"
                            type="checkbox"
                            value="snickerdood"
                            as={Checkbox} 
                        />
                        <Field
                            name="cookies"
                            type="checkbox"
                            value="sugar"
                            as={Checkbox} 
                        />
                        <div>yogurt</div>
                            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
                            <MyRadio name="yogurt" type="radio" value="blurberry" label="blurberry" />
                            <MyRadio name="yogurt" type="radio" value="apple" label="apple" />

                        <FieldArray name="pets">
                            {(arrayHelpers) => (
                                <div>
                                    <Button onClick={() => arrayHelpers.push({
                                        type: 'frog',
                                        name: '',
                                        id: "" + Math.random()
                                    })}>add pet</Button>
                                    {values.pets.map((pet, index) => {
                                        const name1 = `pets.${index}.name`;
                                        return (
                                                <div key={pet.id}>
                                                <MyTextField
                                                    placeholder="pet name"
                                                    name={`pets.${index}.name`}
                                                />
                                                <Field name={`pets.${index}.type`} type="select" as={Select}>
                                                    <MenuItem value="cat">cat</MenuItem>
                                                    <MenuItem value="dog">dog</MenuItem>
                                                    <MenuItem value="frog">frog</MenuItem>
                                                </Field>
                                                <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                                </div>
                                        )})
                                    }
                                </div>

                            )}
                        </FieldArray>
                        <div>
                            <Button disabled={isSubmitting} type="submit">Submit</Button>
                        </div>
                        
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </div>
        )
}

export default App;
