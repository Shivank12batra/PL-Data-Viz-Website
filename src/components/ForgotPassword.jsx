import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {resetPasswordSchema} from "../validationSchema";
import {useAuth} from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const ForgotPassword = () => {
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changePassword = async(values) => {
        console.log('button clicked')
        try {
            setError("")
            setMessage("")
            setLoading(true)
            await resetPassword(values.email)
            setMessage('check your email for next steps!')
            setLoading(false)
        }
        catch(err) {
            console.log(err)
            setLoading(false)
            setError('This email is not registered')
        }
    }
    return (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg sm:w-2/5 w-4/5 max-h-full overflow-y-auto">
          <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-500" onClick={() => navigate('/')}>
          <MdClose className="h-8 w-8" />
        </button>
            <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
            <hr className="my-4 border-blue-500" />
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={resetPasswordSchema}
              onSubmit={changePassword}
            >
              <Form>
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
                <button disabled={loading}
                  type="submit"
                  className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto`}
                >
                  Submit
                </button>
              </Form>
            </Formik>
            <div className="mt-4 text-center">
            <div className="text-red-600 mb-2">{error}</div>
            <div className="text-green-600 mb-2">{message}</div>
            <div className='mb-2'><Link to='/login' className="text-blue-600 hover:text-blue-800">login</Link></div>
              Not registered yet?{" "}
              <Link to='/signup' className="text-blue-600 hover:text-blue-800">Signup</Link>
            </div>
          </div>
        </div>
      );
    };

export default ForgotPassword