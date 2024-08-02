import{createSearchParamsCache} from "nuqs/server"
import {parseAsInteger, parseAsString} from "nuqs/server"
export const searchParamsCache = createSearchParamsCache({
    rating: parseAsInteger,
    page:parseAsInteger.withDefault(1)
  })