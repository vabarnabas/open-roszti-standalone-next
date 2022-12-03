export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE"

export type RequestHeader = [string, string]

export interface RequestOptions {
  baseUrl: string
  path: string
  token?: string
  body?: string
  headers?: RequestHeader[]
}

export interface RequestConfig {
  method: RequestMethod
  headers: {
    [header: string]: string
  }
  body?: string
  token?: string
}

export const makeRequest = async (
  method: RequestMethod,
  options: RequestOptions
) => {
  const config: RequestConfig = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }

  if (options.headers && options.headers.length > 0) {
    options.headers.forEach((header) => {
      config.headers[header[0]] = header[1]
    })
  }

  if (options.body) {
    config.body = options.body
  }

  if (options.token) {
    config.headers.authorization = `Bearer ${options.token}`
  }

  try {
    const response = await fetch(
      `${options.baseUrl}${
        options.path.charAt(0) === "/" ? options.path : `/${options.path}`
      }`,
      config
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Internal server error.")
  }
}
