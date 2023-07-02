import React from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
    const initialValues = {
        username: "",
        password: "",
      };
    
      const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
      });
    
      const onSubmit = (data) => {
        // axios.post("http://localhost:3001/auth"){
        //   console.log(data);
        // });

        axios.post('http://localhost:3001/users', {
            username: data.username, 
            password: data.password,  
        
        })
        console.log(data)
        console.log(data.username, data.password)
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
                autocomplete="off"
                id="inputCreatePost"
                name="username"
                placeholder="(Ex. John123...)"
              />
    
              <label>Password: </label>
              <ErrorMessage name="password" component="span" />
              <Field
                autocomplete="off"
                type="password"
                id="inputCreatePost"
                name="password"
                placeholder="Your Password..."
              />
    
              <button type="submit"> Register</button>
            </Form>
          </Formik>
        </div>
      );
    }