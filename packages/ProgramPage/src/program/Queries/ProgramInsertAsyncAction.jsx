import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";


const ProgramInsertMutation = createQueryStrLazy(
    `
mutation ProgramInsertMutation($id: UUID, $name: String! $groupId: UUID) {
  result: programInsert(
    program: {id: $id, name: $name groupId: $groupId,}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramLarge
  }
}
`,
    ProgramLargeFragment
);


export const ProgramInsertAsyncAction = createAsyncGraphQLAction(ProgramInsertMutation)