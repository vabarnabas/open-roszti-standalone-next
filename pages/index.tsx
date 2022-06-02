import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"
import Layout from "../components/layout"

const Home: NextPage = () => {
  const router = useRouter()
  const [userCode, setUserCode] = useState("")

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (userCode.length === 6) {
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
          <p className="text-3xl font-semibold">
            openRÖszTI<span className="text-sm text-soft-green">v7</span>
          </p>
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
