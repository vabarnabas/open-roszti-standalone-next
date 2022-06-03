export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const tokenRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
  if (tokenRequest.ok) {
    const tokenResponse = await tokenRequest.json()
    const token = tokenResponse.data.token

    const dataRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
    if (dataRequest.ok) {
      return await dataRequest.json()
    }
  }
}
