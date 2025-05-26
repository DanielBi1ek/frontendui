import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramsectionLargeFragment } from "./ProgramsectionFragments";

const ProgramsectionUpdateMutation = createQueryStrLazy(
`
mutation ProgramsectionUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programsectionUpdate(
    programsection: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramsectionGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramsectionLarge
      }      
    }
    ...ProgramsectionLarge
  }
}
`, ProgramsectionLargeFragment)

export const ProgramsectionUpdateAsyncAction = createAsyncGraphQLAction(ProgramsectionUpdateMutation)