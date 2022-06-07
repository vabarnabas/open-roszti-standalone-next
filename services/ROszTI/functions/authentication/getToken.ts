export interface TokenRequestOptions {
  email: string
  password: string
}

export const getToken = async (options: TokenRequestOptions) => {
  try {
    const tokenRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: options.email,
          password: options.password,
        }),
      }
    )
    const data = await tokenRequest.json()
    return data.data.token
  } catch (err) {
    throw new Error("Internal server error.")
  }
}
