import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramsectionLargeFragment } from "./ProgramsectionFragments";

const ProgramsectionDeleteMutation = createQueryStrLazy(
`
mutation ProgramsectionDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programsectionDelete(
    programsection: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramsectionGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramsectionLarge
      }
    }
  }
}
`,
    ProgramsectionLargeFragment)

export const ProgramsectionDeleteAsyncAction = createAsyncGraphQLAction(ProgramsectionDeleteMutation)