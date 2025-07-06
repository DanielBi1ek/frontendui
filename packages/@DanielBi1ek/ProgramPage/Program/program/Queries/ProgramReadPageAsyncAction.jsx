import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramReadPageQuery = createQueryStrLazy(
`
query ProgramReadPageQuery {
  result: programPage {
    ...ProgramLarge
  }
}
`, 
    ProgramLargeFragment)

export const ProgramReadPageAsyncAction = createAsyncGraphQLAction(ProgramReadPageQuery)