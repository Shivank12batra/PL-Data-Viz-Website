import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginSchema} from "../validationSchema";
import {useAuth} from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const Login = () => {
    const {login, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const loginUser = async(values, {resetForm}) => {
        try {
            setError("")
            setLoading(true)
            await login(values.email, values.password)
            resetForm()
            navigate('/')
        }
        catch(err) {
            console.log(err)
            setError('Invalid email or password')
        }
    }
    return (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg sm:w-2/5 w-4/5 max-h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
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
              validationSchema={loginSchema}
              onSubmit={loginUser}
            >
              <Form>
                <div className="mb-4 w-70">
                {currentUser && JSON.stringify(currentUser.email)}
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
                <button disabled={loading}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto cursor-pointer"
                >
                  Submit
                </button>
              </Form>
            </Formik>
            <div className="mt-4 text-center">
              Not registered yet?{" "}
              <Link to='/signup' className="text-blue-600 hover:text-blue-800">Signup</Link>
            </div>
          </div>
        </div>
      );
    };

export default Login