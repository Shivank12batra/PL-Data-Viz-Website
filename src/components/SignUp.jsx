import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../validationSchema";
import { MdClose } from "react-icons/md";

const SignUpForm = () => {
  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-2/5 w-4/5 max-h-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <MdClose className="h-6 w-6" />
        </button>
        <hr className="my-4 border-blue-500" />
        <Formik
          initialValues={{
            name: "",
            team: "Arsenal",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
          <div className="sm:flex sm:flex-row">
  <div className="mb-4 mr-4 flex-1">
    <label htmlFor="name" className="block text-gray-800 font-bold">
      Name
    </label>
    <Field
      id="name"
      name="name"
      type="text"
      placeholder="Name"
      className="form-input mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
    />
    <ErrorMessage
      name="name"
      component="div"
      className="text-red-600"
    />
  </div>
  <div className="mb-4 flex-1">
    <label htmlFor="team" className="block text-gray-800 font-bold">
      Select Team
    </label>
    <Field
      id="team"
      name="team"
      as="select"
      className="form-select mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
    >
      <option value="team1">Arsenal</option>
      <option value="team2">Manchester City</option>
      <option value="team3">Manchester United</option>
      <option value="team4">Liverpool</option>
      <option value="team5">Chelsea</option>
      <option value="team6">Tottenham</option>
    </Field>
    <ErrorMessage
      name="team"
      component="div"
      className="text-red-600"
    />
    </div>
    </div>

            <div className="mb-4 w-70">
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="form-input mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-800 font-bold">
                Phone Number
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="phone number"
                className="form-input mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800 font-bold">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="form-input mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-800 font-bold">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="form-input mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm active:border-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
            >
              Submit
            </button>
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

