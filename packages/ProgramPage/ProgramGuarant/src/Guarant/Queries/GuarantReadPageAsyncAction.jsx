import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarantLargeFragment } from "./GuarantFragments";

const GuarantReadPageQuery = createQueryStrLazy(
`
query GuarantReadPageQuery($skip: Int, $limit: Int, $where: GuarantWhereInputFilter) {
  result: guarantPage(skip: $skip, limit: $limit, where: $where) {
    ...GuarantLarge
  }
}
`, 
    GuarantLargeFragment)

export const GuarantReadPageAsyncAction = createAsyncGraphQLAction(GuarantReadPageQuery)