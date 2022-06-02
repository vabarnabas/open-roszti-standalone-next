import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"

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
    <div className="">
      <Head>
        <title>{`openRÖszTIv7`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen select-none items-center justify-center text-gray-500">
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
    </div>
  )
}

export default Home
