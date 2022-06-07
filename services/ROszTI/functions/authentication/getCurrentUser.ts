export interface CurrentUserRequestOptions {
  token: string
}

export const getCurrentUser = async (options: CurrentUserRequestOptions) => {
  try {
    const currentUserRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${options.token}`,
        },
      }
    )
    const data = await currentUserRequest.json()
    return data.data
  } catch (err) {
    throw new Error("Internal server error.")
  }
}
