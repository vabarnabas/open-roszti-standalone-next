import Head from "next/head"
import React from "react"

interface Props {
  children?: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen select-none flex-col text-[#4b4c56] dark:bg-[#22232f] dark:text-[#fbfbfd]">
      <Head>
        <title>openRÖszTI</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="inline w-full items-center justify-center bg-soft-green py-2 text-center text-sm text-white">
        👋🏼 Welcome to the new openRÖszTI with RÖszTI ID.
      </div>
      <div className="flex h-full w-full flex-1">{children}</div>
      <div className="mt-4 inline w-full items-center justify-center py-2 text-center text-sm">
        In case of any problem write an email to
        <span className="ml-1 text-soft-green">barnabas.varga@estiem.org</span>.
      </div>
    </div>
  )
}

export default Layout
