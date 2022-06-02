import Head from "next/head"
import React from "react"

interface Props {
  children?: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen select-none flex-col text-slate-500">
      <Head>
        <title>openRÖszTI</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="inline w-full items-center justify-center bg-soft-green py-2 text-center text-sm text-white">
        You can now add your openRÖszTI as a bookmark.
        <button
          onClick={() => {
            browser.bookmarks.create({
              title: "bookmarks.create() on MDN",
              url: "https://developer.mozilla.org/Add-ons/WebExtensions/API/bookmarks/create",
            })
          }}
          className="ml-3 rounded-md border border-white px-2 py-0.5 text-xs hover:border-slate-200 hover:text-slate-200"
        >
          Add
        </button>
      </div> */}
      <div className="flex h-full w-full flex-1">{children}</div>
      <div className="inline w-full items-center justify-center py-2 text-center text-sm">
        In case of any problem write an email to
        <span className="ml-1 text-soft-green">barnabas.varga@estiem.org</span>.
      </div>
    </div>
  )
}

export default Layout
