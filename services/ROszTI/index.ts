import {
  CurrentUserRequestOptions,
  getCurrentUser,
} from "./functions/authentication/getCurrentUser"
import {
  getToken,
  TokenRequestOptions,
} from "./functions/authentication/getToken"

export const ROszTI = {
  getToken: (options: TokenRequestOptions) => getToken(options),
  getCurrentUser: (options: CurrentUserRequestOptions) =>
    getCurrentUser(options),
}
