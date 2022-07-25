import type { NextPage } from "next"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/spinner/spinner"
import { BsFillShieldLockFill } from "react-icons/bs"

const Home: NextPage = () => {
  const router = useRouter()
  const [userCode, setUserCode] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")

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
            <p className="mb-4 text-4xl font-semibold">
              openRÖszTI<span className="text-sm text-soft-green">v7</span>
            </p>
            <div
              onClick={() => {
                router.push({
                  pathname: "https://connect.roszti.barnabee.studio/",
                  query: { o: "https://open.roszti.barnabee.studio/" },
                })
              }}
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-soft-green py-1 px-3 text-white outline-none"
            >
              <BsFillShieldLockFill className="mr-2 text-xs" />
              Login with RÖszTI ID
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
