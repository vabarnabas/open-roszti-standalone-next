import { useRouter } from "next/router"
import React, { useEffect } from "react"
import Layout from "../../components/layout"
import TokenService from "../../services/token.service"

const Connect = () => {
  const router = useRouter()
  const { t: token } = router.query
  const tokenservice = new TokenService()

  useEffect(() => {
    if (token) {
      tokenservice.saveToken(token as string)
      router.push("/")
    }
  }, [router.isReady])

  return <Layout></Layout>
}

export default Connect
