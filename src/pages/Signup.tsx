import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from "formik";
import Input from "../components/Input";
import { ISignupData } from "../utils/interfaces";
import { MSG_REQUIRED_FIELD } from "../utils/constants";

/* -------------------------------------------------------------------- */

const validationSchema = yup.object().shape({
  firstName: yup.string().required(MSG_REQUIRED_FIELD),
  lastName: yup.string().required(MSG_REQUIRED_FIELD),
  email: yup.string().email('Invalid email type.').required(MSG_REQUIRED_FIELD),
  password: yup.string().required(MSG_REQUIRED_FIELD),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must be matched.').required(MSG_REQUIRED_FIELD)
})

/* -------------------------------------------------------------------- */

export default function Signup() {
  const initialValues: ISignupData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className="container max-w-lg mx-auto">
      <div className="my-3 md:my-12 p-6 md:shadow-2xl shadow-none">
        <h1 className="text-center font-bold text-3xl mt-4">Sign up</h1>
        <div className="mt-8 flex flex-col gap-4">

          {/* First name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">First name *</label>
            <Input
              id="firstName"
              name="firstName"
              className="border border-gray-400 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            />
            {formik.touched.firstName && Boolean(formik.errors.firstName) && (
              <span className="text-red-500 text-sm">
                {formik.touched.firstName && formik.errors.firstName}
              </span>
            )}
          </div>

          {/* Last name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last name *</label>
            <Input
              id="lastName"
              name="lastName"
              className="border border-gray-400 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
            {formik.touched.lastName && Boolean(formik.errors.lastName) && (
              <span className="text-red-500 text-sm">
                {formik.touched.lastName && formik.errors.lastName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email *</label>
            <Input
              id="email"
              name="email"
              type="email"
              className="border border-gray-400 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <span className="text-red-500 text-sm">
                {formik.touched.email && formik.errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password *</label>
            <Input
              id="password"
              name="password"
              type="password"
              className="border border-gray-400 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && Boolean(formik.errors.password) && (
              <span className="text-red-500 text-sm">
                {formik.touched.password && formik.errors.password}
              </span>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm password *</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="border border-gray-400 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            />
            {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) && (
              <span className="text-red-500 text-sm">
                {formik.touched.confirmPassword && formik.errors.confirmPassword}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="bg-primary normal-case text-base mt-8" onClick={() => formik.handleSubmit()}>
            Sign up
          </Button>
          <p>
            Have account? <Link className="text-primary" to="/login">Click here</Link> to log in.
          </p>
        </div>

      </div>
    </div>
  )
}