import type { NextPage } from "next"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/spinner/spinner"
import { loginWithEmailAndPassword } from "../services/login"
import { onInputChange } from "../services/onInputChange"

interface InitialFormValues {
  userCode: string
  email: string
  password: string
}

const Home: NextPage = () => {
  const router = useRouter()
  const [formValues, setFormValues] = useState({} as InitialFormValues)
  const [fetching, setFetching] = useState(false)

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setFetching(true)
    if (formValues.email.length > 0 && formValues.password.length > 0) {
      const user = await loginWithEmailAndPassword(
        formValues.email,
        formValues.password
      )
      if (user?.data) {
        router.push({
          pathname: "/user",
          query: {
            c: user.data.code,
          },
        })
      }
    } else if (formValues.userCode.length === 6) {
      router.push({
        pathname: "/user",
        query: {
          c: formValues.userCode,
        },
      })
    }
  }

  return (
    <Layout>
      {fetching ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full select-none items-center justify-center">
          <form
            onSubmit={(e) => onFormSubmit(e)}
            action=""
            className="flex flex-col items-center space-y-3 text-sm"
          >
            <p className="mb-4 text-3xl font-semibold">
              openRÖszTI<span className="text-sm text-soft-green">v7</span>
            </p>
            <div className="relative flex w-full flex-col space-y-3 rounded-md border p-2">
              <p className="absolute left-2 -top-2 bg-white px-2 text-xs">
                Experimental
              </p>
              <input
                value={formValues.email}
                name="email"
                onChange={(e) => {
                  onInputChange(e, formValues, setFormValues)
                }}
                type="email"
                className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
                placeholder="rID E-mail"
              />
              <input
                value={formValues.password}
                name="password"
                onChange={(e) => {
                  onInputChange(e, formValues, setFormValues)
                }}
                type="password"
                className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
                placeholder="rID Password"
              />
            </div>
            <div className="relative flex h-px w-full items-center justify-center bg-slate-200 px-32">
              <p className="absolute bg-white px-3 text-sm">or</p>
            </div>
            <input
              value={formValues.userCode}
              name="userCode"
              onChange={(e) => {
                onInputChange(e, formValues, setFormValues)
              }}
              type="text"
              className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
              placeholder="RÖszTI Code"
            />
            <button className="w-full rounded-md bg-soft-green py-1 px-3 text-white outline-none">
              Continue
            </button>
          </form>
        </div>
      )}
    </Layout>
  )
}

export default Home
