import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramsectionLargeFragment } from "./ProgramsectionFragments";

const ProgramsectionInsertMutation = createQueryStrLazy(
`
mutation ProgramsectionInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programsectionInsert(
    programsection: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramsectionLarge
  }
}
`,
    ProgramsectionLargeFragment)


export const ProgramsectionInsertAsyncAction = createAsyncGraphQLAction(ProgramsectionInsertMutation)