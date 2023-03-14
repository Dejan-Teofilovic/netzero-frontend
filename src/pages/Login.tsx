import React from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from "formik";
import Input from "../components/Input";
import { ILoginData } from "../utils/interfaces";
import { MSG_REQUIRED_FIELD } from "../utils/constants";
import useLoading from "../hooks/useLoading";
import api from "../utils/api";
import useUser from "../hooks/useUser";
import useAlertMessage from "../hooks/useAlertMessage";
import { Icon } from "@iconify/react";

/* -------------------------------------------------------------------- */

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email type.').required(MSG_REQUIRED_FIELD),
  password: yup.string().required(MSG_REQUIRED_FIELD)
})

/* -------------------------------------------------------------------- */

export default function Login() {
  const navigate = useNavigate()
  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()
  const { setTokenAct } = useUser()

  const initialValues: ILoginData = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      openLoading()
      api.post('/auth/login', values)
        .then(response => {
          if (response.data) {
            setTokenAct(response.data)
            openAlert({
              color: 'green',
              icon: <Icon icon="material-symbols:check-small-rounded" className="text-2xl" />,
              title: 'Success',
              message: 'Logged in.'
            })
            closeLoading()
            navigate('/')
          }
        })
        .catch(error => {
          closeLoading()
          openAlert({
            color: 'red',
            icon: <Icon icon="fluent-mdl2:status-error-full" className="text-2xl" />,
            title: 'Error',
            message: error?.response?.statusText || 'Login error.'
          })
        })
    }
  })
  return (
    <div className="container max-w-lg mx-auto">
      <div className="mt-32 p-6 md:shadow-2xl shadow-none">
        <h1 className="text-center font-bold text-3xl mt-4">Log in</h1>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
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
        </div>
        <div className="flex flex-col gap-4">
          <Button className="bg-primary normal-case text-base mt-8" onClick={() => formik.handleSubmit()}>
            Log in
          </Button>
          <p>
            Don't have account? <Link className="text-primary" to="/signup">Click here</Link> to sign up.
          </p>
        </div>

      </div>
    </div>
  )
}