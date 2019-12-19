import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from 'reactstrap';
import axios from "axios";

// values props from Formik: state of inputs and updates with change in input

// adding destructured 'errors' and 'touched' props to form
// props get passed down from the 'withFormik' component

// 'touched' prop tracks if you've been in a field
// avoid validation error when typing in a field for the first time

function SignUpForm({ values, errors, touched, status }) {
  // we don't need input state management 
  // or handleChange and handleSubmit inside this function

  // state that holds successful form submission data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed", status);

    // if status has content (obj from API response),
    // call setUsers
    status && setUsers(users => [...users, status]);
    // doing setUsers([...users, status] fires warning that users is a missing dependency
    // but this is the only place users can change
    // callback reads current value of users and uses it to create new array

  }, [status])



// if status has content (an obj from API response) then render function setAnimals
    // use a spread to create a new array with all of animals' previous values + the new obj from the API stored in status
    // could be setAnimals([...animals, status]) but that fires a warning that we should watch animals. We don't need to watch for animals changes (this is the only place it could change)
    // change to animals => [...animals, status] to read in the current value of animals, and then use it to create a new array


  return (
    // we don't need onSubmit on form
    // we don't need onChange on input

    // all fields in Formik are called <Field>; input by default
    // Formik fields need the name attribute; Formik uses them as keys
    // name is key within values (current state of form inputs)

    // && returns value of one of the operands
    // if left operand is truthy, return right; else, return left
    
    //if there is an error, error message shows

    //wrap checkbox in <label> to make checkbox text also clickable
    <Form>
      <label htmlFor="username">Name</label>
      <Field
        id="username"
        name="username"
        placeholder="first name"
      />
      {touched.username && errors.username && <div className="invalid">{errors.username}</div>}
      <label htmlFor="email">Email</label>
      <Field
        id="email"
        type="email"
        name="email"
        placeholder="lillian@example.com"
      />
      {touched.email && errors.email && <div className="invalid">{errors.email}</div>}
      <label htmlFor="password">Password</label>
      <Field
        id="password"
        type="password"
        name="password"
        placeholder="6 or more characters"
      />
      {touched.password && errors.password && <div className="invalid">{errors.password}</div>}
      <div className="checkbox">
        <label htmlFor="tos">
          <Field
            id="tos"
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          I did not read the Terms of Service
        </label>
      </div>
      <Button color="primary" size="lg" type="submit">Sign Up</Button>
    </Form> 
  );
}

/* // a higher-order component is a function that accepts a component
// and returns an enhanced component

// withFormik() creates a higher-order Formik component 
// by passing in props and form handlers into SignUpForm

// or use <Formik> if not using higher-order components */

const FormikSignUpForm = withFormik({
  // mapPropsToValues connects the data in the form to data handlers
  // conditional values allow passing in default or custom data initially
  // use mapPropsToValues to initialize empty state of form

  mapPropsToValues({ username, email, password, tos }) {
    return {
      // || returns value of one of the operands
      // if left operand is truthy, return left; else return right

      username: username || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },

  // * * * * * VALIDATION SCHEMA: start
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .strict().trim("No leading or trailing spaces, please").required("Name is required"),
    email: Yup.string()
      .email("Email is not valid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters").required("Password is required")
  }),
  // * * * * * VALIDATION SCHEMA: end

  // * * FORM SUBMISSION CODE... HTTP REQUESTS, ETC.

  // from FormikBag: setStatus sends API response to Form and resetForm clears form

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    // using .post(), we pass in the data we want to send to our server as the second argument
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        console.log("success", response);
        
        // from FormikBag: setStatus sends API response to SignUpForm
        setStatus(response.data);

        // from FormikBag: resetForm clears form
        resetForm();
      })
      .catch(error => {
        console.log(error);
      })
  }
})(SignUpForm); 

export default FormikSignUpForm;