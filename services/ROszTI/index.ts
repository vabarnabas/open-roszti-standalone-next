import { getToken, TokenRequestOptions } from "./functions/getToken"

export const ROszTI = {
  getToken: (options: TokenRequestOptions) => getToken(options),
}