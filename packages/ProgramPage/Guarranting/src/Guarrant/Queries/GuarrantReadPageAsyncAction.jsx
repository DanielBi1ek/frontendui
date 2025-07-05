import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarrantLargeFragment } from "./GuarrantFragments";

const GuarrantReadPageQuery = createQueryStrLazy(
`
query GuarrantReadPageQuery($skip: Int, $limit: Int, $where: GuarrantWhereInputFilter) {
  result: guarrantPage(skip: $skip, limit: $limit, where: $where) {
    ...GuarrantLarge
  }
}
`, 
    GuarrantLargeFragment)

export const GuarrantReadPageAsyncAction = createAsyncGraphQLAction(GuarrantReadPageQuery)