import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("required field"),
        password: Yup.string().min(4).max(20).required("required field"),
    });

    const onSubmit = (data) => {
        axios.post("https://full-stack-api-yagotaira-bc870caa5c53.herokuapp.com/auth", data).then(() => {
            console.log(data);
        })
    };
    
    return (
        <div>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="Enter username"  
                    />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="Enter password"  
                    />
                    <button type="submit"> Register </button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration