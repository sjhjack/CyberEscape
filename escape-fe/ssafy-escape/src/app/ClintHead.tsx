"use client"

import Head from "next/head"

const ClientHead = () => {
  return (
    <Head>
      <link
        rel="icon"
        href={process.env.NEXT_PUBLIC_IMAGE_URL + "/favicon.ico"}
      />
    </Head>
  )
}

export default ClientHead
