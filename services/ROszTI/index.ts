import {
  CurrentUserRequestOptions,
  getCurrentUser,
} from "./functions/authentication/getCurrentUser"
import {
  getToken,
  TokenRequestOptions,
} from "./functions/authentication/getToken"

export class ROszTIClient {
  baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }

  getToken(options: TokenRequestOptions) {
    return getToken(options, this.baseUrl)
  }

  getCurrentUser(options: CurrentUserRequestOptions) {
    return getCurrentUser(options, this.baseUrl)
  }
}
