import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner/spinner"
import { getData } from "../../services/getData"
import TokenService from "../../services/token.service"
import { ROszTIDataType } from "../../types/data.types"
import useSWR from "swr"
import { requestHelper } from "../../services/requestHelper"

const UserView = () => {
  const router = useRouter()
  const { data, isLoading, error } = useSWR("/open-roszti", async () => {
    return await requestHelper.openROszTI("2022-2023 ősz")
  })

  useEffect(() => {
    if (error) {
      router.push("/")
    }
  }, [error])

  return (
    <Layout>
      <div className="flex h-full w-full select-none">
        {!isLoading && data ? (
          <div className="flex h-full w-full flex-col items-start justify-start overflow-y-auto py-6 px-8">
            <div className="mb-3 grid w-full gap-x-4 gap-y-2 lg:grid-cols-2">
              <div className="grid w-full grid-flow-col items-center justify-between gap-x-6 rounded-md bg-slate-50 py-1 px-4 dark:bg-gray-700">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">
                    {
                      data.find((item) => item.event === "Elért Pontszám")
                        ?.value
                    }
                  </p>
                  <p className="text-center text-sm">Points</p>
                </div>
                {parseInt(
                  data.find((item) => item.event === "Elért Pontszám")?.value ||
                    ""
                ) < 6 ? (
                  <p className="text-xs">
                    You need
                    <span className="mx-1 font-semibold text-soft-green">
                      {6 -
                        parseInt(
                          data.find((item) => item.event === "Elért Pontszám")
                            ?.value || ""
                        )}
                    </span>
                    more points to be active.
                  </p>
                ) : (
                  <p className="text-xs">
                    You already reached active member status, but there are
                    always more events to see.
                  </p>
                )}
              </div>
              <div className="grid w-full grid-flow-col items-center justify-between gap-x-6 rounded-md bg-slate-50 py-1 px-4 dark:bg-gray-700">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">
                    {data.find((item) => item.event === "Szavazati jog")?.value}
                  </p>
                  <p className="text-center text-sm">Vote</p>
                </div>
                <p className="">
                  {data
                    .find((item) => item.event === "Státusz")
                    ?.value.toLocaleLowerCase() === "not active" ? (
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
            <div className="mt-3 w-full ">
              <p className="mb-1 text-sm">Events</p>
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
                {data.slice(0, data.length - 8).map((item: ROszTIDataType) => (
                  <div
                    key={item.event + item.value}
                    className="flex items-center justify-between rounded-md bg-slate-50 py-2 px-4 dark:bg-gray-700"
                  >
                    <p className="">{item.event}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </Layout>
  )
}

export default UserView
