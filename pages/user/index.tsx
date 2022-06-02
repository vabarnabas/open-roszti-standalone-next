import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Spinner from "../../components/spinner/spinner"
import { getData } from "../../services/retriveData"
import { ROszTIDataType } from "../../types/data.types"

const UserView = () => {
  const router = useRouter()
  const [ROszTIData, setROszTIData] = useState<ROszTIDataType[]>([])

  const { c: userCode } = router.query

  useEffect(() => {
    const fetchIfCode = async () => {
      if (router.isReady && userCode) {
        try {
          setROszTIData(
            await getData(Array.isArray(userCode) ? userCode[0] : userCode)
          )
        } catch {
          router.push("/")
        }
      }
    }

    fetchIfCode()
  }, [router.isReady, router.query, userCode])

  return (
    <div className="flex h-screen w-screen select-none text-gray-500">
      <Head>
        <title>{`openRÖszTIv7`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {ROszTIData.length === 0 ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start py-6 px-8">
          {ROszTIData && (
            <div className="mb-3 grid w-full gap-x-4 gap-y-2 lg:grid-cols-2">
              <div className="grid w-full grid-flow-col items-center justify-between gap-x-6 rounded-md bg-slate-50 py-1 px-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">
                    {ROszTIData[ROszTIData.length - 2]?.point}
                  </p>
                  <p className="text-center text-sm">Points</p>
                </div>
                {parseInt(ROszTIData[ROszTIData.length - 2]?.point) < 6 ? (
                  <p className="text-xs">
                    You need
                    <span className="mx-1 font-semibold text-soft-green">
                      {6 - parseInt(ROszTIData[ROszTIData.length - 2]?.point)}
                    </span>
                    more points to be active.
                    <span className="cursor-pointer text-soft-green">
                      {" "}
                      Go check upcoming events.
                    </span>
                  </p>
                ) : (
                  <p className="text-xs">
                    You already reached active member status, but there are
                    always more events to see.
                  </p>
                )}
              </div>
              <div className="grid w-full grid-flow-col items-center justify-between gap-x-6 rounded-md bg-slate-50 py-1 px-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">
                    {ROszTIData[ROszTIData.length - 1]?.point}
                  </p>
                  <p className="text-center text-sm">Vote</p>
                </div>
                <p className="">
                  {" "}
                  {ROszTIData[ROszTIData.length - 3]?.point === "Not Active" ? (
                    <p className="text-xs">
                      Sadly in this semester you{" "}
                      <span className="text-soft-green">haven't</span> reached
                      the requirement of the active members.
                    </p>
                  ) : (
                    <p className="text-xs">
                      Congratulations, this semester you{" "}
                      <span className="text-soft-green">are a part of</span> the
                      active members. Hope to see you in upcoming events.
                    </p>
                  )}
                </p>
              </div>
            </div>
          )}
          {ROszTIData && (
            <div className="mt-3 w-full ">
              <p className="mb-1 text-sm">Events</p>
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
                {ROszTIData.slice(0, ROszTIData.length - 3).map(
                  (item: ROszTIDataType) => (
                    <div
                      key={item.event + item.point}
                      className="flex items-center justify-between rounded-md bg-slate-50 py-2 px-4"
                    >
                      <p className="">{item.event}</p>
                      <p className="font-semibold">{item.point}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserView
