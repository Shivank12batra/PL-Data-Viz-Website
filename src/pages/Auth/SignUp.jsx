import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addUserData } from "../../firebase";
import {signupSchema} from "../../validationSchema";
import {useAuth} from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";

const SignUpForm = () => {
  const {signup}  = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const signupUser = async(values, {resetForm}) => {
    try {
      console.log(values)
      setError('')
      setLoading(true)
      await signup(values.email, values.password)
      await addUserData(values)
      resetForm()
      const path = location?.state?.from?.pathname ?? '/'
      navigate(path)
      // navigate('/')
    } catch(e) {
      setLoading(false)
      if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('This email is already registered with us')
        return
      }
      setError('Failed to create an account! Try again later')
    }
  }
  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg sm:w-2/5 w-4/5 max-h-full overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-500" onClick={() => navigate('/')}>
          <MdClose className="h-8 w-8" />
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
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
          validationSchema={signupSchema}
          onSubmit={signupUser}
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
                <option value="Arsenal">Arsenal</option>
                <option value="Manchester City">Manchester City</option>
                <option value="Manchester United">Manchester United</option>
                <option value="Liverpool">Liverpool</option>
                <option value="Chelsea">Chelsea</option>
                <option value="Tottenham">Tottenham</option>
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
            <button disabled={loading}
                type="submit"
                className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto`}
            >
              Submit
            </button>
           </Form>
         </Formik>
         <div className="mt-4 text-center">
          <div className="text-red-600 mb-2">
            {error}
          </div>
          <span>Already have an account?{" "}</span>
          <Link to='/login' className="text-blue-600 hover:text-blue-800">Sign in</Link>
         </div>
       </div>
    </div>
  );
};

export default SignUpForm;

