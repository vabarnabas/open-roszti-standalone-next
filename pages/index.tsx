import type { NextPage } from "next"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/spinner/spinner"
import { FaFolderOpen, FaUserLock } from "react-icons/fa"
import { BsFillShieldLockFill } from "react-icons/bs"
import TokenService from "../services/token.service"
import { makeRequest } from "../services/makeRequest"
import { requestHelper } from "../services/requestHelper"

const Home: NextPage = () => {
  const router = useRouter()
  const tokenservice = new TokenService()

  useEffect(() => {
    const getData = async () => {
      if (await tokenservice.getToken()) {
        const user = await requestHelper.currentUser()
        if (user?.id) {
          router.push({ pathname: "/user" })
        } else {
          await tokenservice.deleteToken()
        }
      }
    }

    getData()
  }, [tokenservice.getToken()])

  return (
    <Layout>
      <div className="flex h-full w-full select-none items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-2 flex w-max flex-col text-4xl font-semibold ">
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
                query: { o: "https://open.roszti.barnabee.studio" },
              })
            }}
            className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border border-soft-green bg-transparent py-1 px-3 text-soft-green outline-none hover:border-soft-green-dark hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <BsFillShieldLockFill className="mr-2 text-xs" />
            Login with RÖszTI ID
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
