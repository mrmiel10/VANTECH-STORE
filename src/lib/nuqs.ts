import{createSearchParamsCache} from "nuqs/server"
import {parseAsInteger, parseAsString} from "nuqs/server"
export const searchParamsCache = createSearchParamsCache({
    rating: parseAsInteger,
    page:parseAsInteger.withDefault(1),
    query:parseAsString.withDefault(""),
    search:parseAsString.withDefault(""),
    status:parseAsString.withDefault(""),
    deliveryStatus:parseAsString.withDefault(""),
  })