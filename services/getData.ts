export const getData = async (rosztiCode: string) => {
  const response = await fetch(
    `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${rosztiCode}?range=2022-2023+%C5%91sz+events2022-2023+%C5%91sz+events`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )

  if (response.ok) {
    return await response.json()
  }
  throw new Error("Something went wrong")
}
