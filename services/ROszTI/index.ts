import {
  CurrentUserRequestOptions,
  ROszTIFunctionGetCurrentUser,
} from "./functions/authentication/getCurrentUser"
import {
  ROszTIFunctionGetToken,
  TokenRequestOptions,
} from "./functions/authentication/getToken"

export class ROszTIClient {
  baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }

  getToken(options: TokenRequestOptions) {
    return ROszTIFunctionGetToken(options, this.baseUrl)
  }

  getCurrentUser(options: CurrentUserRequestOptions) {
    return ROszTIFunctionGetCurrentUser(options, this.baseUrl)
  }
}

export const useROszTIClient = (baseUrl: string) => {
  const getToken = (options: TokenRequestOptions) => {
    return ROszTIFunctionGetToken(options, baseUrl)
  }
  const getCurrentUser = (options: CurrentUserRequestOptions) => {
    return ROszTIFunctionGetCurrentUser(options, baseUrl)
  }

  return { getToken, getCurrentUser }
}
