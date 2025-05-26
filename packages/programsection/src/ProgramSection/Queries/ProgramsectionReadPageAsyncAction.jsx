import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramsectionLargeFragment } from "./ProgramsectionFragments";

const ProgramsectionReadPageQuery = createQueryStrLazy(
`
query ProgramsectionReadPageQuery($skip: Int, $limit: Int, $where: ProgramsectionWhereInputFilter) {
  result: programsectionPage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramsectionLarge
  }
}
`, 
    ProgramsectionLargeFragment)

export const ProgramsectionReadPageAsyncAction = createAsyncGraphQLAction(ProgramsectionReadPageQuery)