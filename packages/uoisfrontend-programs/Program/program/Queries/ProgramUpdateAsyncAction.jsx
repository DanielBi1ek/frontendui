import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramUpdateMutation = createQueryStrLazy(
`
mutation ProgramUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String $groupId: UUID) {
  result: programUpdate(
    program: {
      id: $id,
      lastchange: $lastchange,
      name: $name,
      nameEn: $nameEn,
        groupId: $groupId
    }
  ) {
    ... on ProgramGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramLarge
      }
    }
    ...ProgramLarge
  }
}
`, ProgramLargeFragment);

export const ProgramUpdateAsyncAction = createAsyncGraphQLAction(ProgramUpdateMutation)



