import type { NextPage } from "next"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/spinner/spinner"
import { FaFolderOpen, FaUserLock } from "react-icons/fa"
import { BsFillShieldLockFill } from "react-icons/bs"
import TokenService from "../services/token.service"
import { makeRequest } from "../services/makeRequest"

const Home: NextPage = () => {
  const router = useRouter()
  const [userCode, setUserCode] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")
  const tokenservice = new TokenService()

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      if (userCode.length === 5 || userCode.length === 6) {
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

  useEffect(() => {
    const getData = async () => {
      if (await tokenservice.getToken()) {
        const user = await makeRequest("GET", {
          baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
          path: "auth/current",
          token: await tokenservice.getToken(),
        })
        if (user["id"]) {
          router.push({ pathname: "/user", query: { c: user.code } })
        } else {
          await tokenservice.deleteToken()
          setError("Something went wrong.")
        }
      }
    }

    getData()
  }, [tokenservice.getToken()])

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
            <div className="mb-2 flex flex-col text-4xl font-semibold">
              <p className="flex items-center">
                <FaFolderOpen className="mr-1 text-3xl text-soft-green " />
                RÖszTI
              </p>
              <span className="ml-auto -mt-2 text-sm font-normal text-soft-green">
                open
              </span>
            </div>
            <div
              onClick={() => {
                router.push({
                  pathname: "https://gateway.roszti.barnabee.studio/",
                  query: { o: "https://open.roszti.barnabee.studio/" },
                })
              }}
              className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border border-soft-green bg-transparent py-1 px-3 text-soft-green outline-none hover:border-soft-green-dark hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <BsFillShieldLockFill className="mr-2 text-xs" />
              Login with RÖszTI ID
            </div>
            {/* <div className="relative flex h-px w-full items-center justify-center bg-slate-200">
              <p className="absolute bg-white px-3 text-sm dark:bg-gray-800">
                or
              </p>
            </div>
            <div className="relative flex items-center">
              <FaUserLock className="absolute left-3" />
              <input
                value={userCode}
                onChange={(e) => {
                  setUserCode(e.target.value.slice(0, 6))
                }}
                type="text"
                className="w-full rounded-md bg-gray-100 py-1 pl-9 pr-3 outline-none dark:bg-gray-700"
                placeholder="RÖszTI Code"
              />
            </div> */}
            {/* <button className="w-full rounded-md bg-soft-green py-1 px-3 text-white outline-none hover:bg-soft-green-dark">
              Continue
            </button> */}
          </form>
        </div>
      )}
    </Layout>
  )
}

export default Home
