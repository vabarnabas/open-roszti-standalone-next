import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import Layout from "../components/layout"
import { loginWithEmailAndPassword } from "../services/login"

const Home: NextPage = () => {
  const router = useRouter()
  const [userCode, setUserCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (email.length > 0 && password.length > 0) {
      const user = await loginWithEmailAndPassword(email, password)
      if (user?.data) {
        router.push({
          pathname: "/user",
          query: {
            c: user.data.code,
          },
        })
      }
    } else if (userCode.length === 6) {
      router.push({
        pathname: "/user",
        query: {
          c: userCode,
        },
      })
    }
  }

  return (
    <Layout>
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
              placeholder="rID E-mail"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
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
            value={userCode}
            onChange={(e) => {
              setUserCode(e.target.value.slice(0, 6))
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
    </Layout>
  )
}

export default Home
