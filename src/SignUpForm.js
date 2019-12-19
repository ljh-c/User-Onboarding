import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from 'reactstrap';

// adding destructured 'errors' and 'touched' props to form
// props get passed down from the 'withFormik' component

// 'touched' prop tracks if you've been in a field
// avoid validation error when typing in a field for the first time
function SignUpForm({ errors, touched }) {

  // we don't need stage management 
  // or handleChange and handleSubmit inside this function
  
  return (
    // we don't need onSubmit on form
    // we don't need onChange on input

    // all fields in Formik are called <Field>; input by default
    // Formik fields need the name attribute; Formik uses them as keys

    // && returns value of one of the operands
    // if left operand is truthy, return right; else, return left
    
    //if there is an error, error message shows
    <Form>
      {touched.username && errors.username && <p>{errors.username}</p>}
      <label htmlFor="username">Name</label>
      <Field
        id="username"
        name="username"
        placeholder="first name"
      />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <label htmlFor="email">Email</label>
      <Field
        id="email"
        type="email"
        name="email"
        placeholder="lillian@example.com"
      />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <label htmlFor="password">Password</label>
      <Field
        id="password"
        type="password"
        name="password"
        placeholder="letters and numbers"
      />
      <div className="checkbox">
        <Field
          id="tos"
          type="checkbox"
          name="tos"
        />
        <label htmlFor="tos">I did not read the Terms of Service</label>
      </div>
      <Button color="primary" size="lg" type="submit">Sign Up</Button>
    </Form>
  );
}

// a higher-order component is a function that accepts a component
// and returns an enhanced component

// withFormik() creates a higher-order Formik component 
// by passing in props and form handlers into SignUpForm

// or use <Formik> if not using higher-order components

const FormikSignUpForm = withFormik({
  // mapPropsToValues connects the data in the form to data handlers
  // conditional values allow passing in default or custom data initially

  mapPropsToValues({ username, email, password }) {
    return {
      // || returns value of one of the operands
      // if left operand is truthy, return left; else return right

      username: username || "",
      email: email || "",
      password: password || ""
    };
  },

  // * * * * * VALIDATION SCHEMA: start
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  // * * * * * VALIDATION SCHEMA: end

  // FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  handleSubmit(values) {
    console.log(values);
  }
})(SignUpForm); 

export default FormikSignUpForm;