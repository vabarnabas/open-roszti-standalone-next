export const getData = async (rosztiCode: string) => {
  const response = await fetch(
    `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${rosztiCode}?range=2021-2022%20tavasz%20events`
  )
  return await response.json()
}
