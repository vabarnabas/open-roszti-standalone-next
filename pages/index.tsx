import type { NextPage } from "next"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/spinner/spinner"
import { ROszTIClient } from "../services/ROszTI"

const Home: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userCode, setUserCode] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")
  const ROszTI = new ROszTIClient(process.env.NEXT_PUBLIC_API_URL || "")

  useEffect(() => {
    const runOnStart = async () => {}
    runOnStart()
  }, [])

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      if (email.length > 0 && password.length > 0) {
        setFetching(true)
        const token = await ROszTI.getToken({ email, password })
        const user = await ROszTI.getCurrentUser({ token })

        if (user) {
          router.push({
            pathname: "/user",
            query: {
              c: user.code,
            },
          })
        }
      } else if (userCode.length === 5 || userCode.length === 6) {
        setFetching(true)
        router.push({
          pathname: "/user",
          query: {
            c: userCode,
          },
        })
      }
    } catch (err) {
      setError("Something went wrong.")
      setFetching(false)
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type="email"
                className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
                placeholder="rID E-mail"
              />
              <div className="">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  type="password"
                  className="w-full rounded-md bg-gray-100 py-1 px-3 outline-none"
                  placeholder="rID Password"
                />
                {error && (
                  <p className="mt-1 pl-1 text-xs text-rose-500">{error}</p>
                )}
              </div>
            </div>
            <div className="relative flex h-px w-full items-center justify-center bg-slate-200 px-32">
              <p className="absolute bg-white px-3 text-sm">or</p>
            </div>
            <input
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value)
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
