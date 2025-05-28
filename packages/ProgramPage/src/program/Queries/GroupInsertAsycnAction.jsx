import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupInsertMutation = createQueryStrLazy(
    `
mutation GroupInsertMutation($id: UUID, $name: String!, $grouptypeId: UUID!) {
  result: groupInsert(
    group: {id: $id, name: $name, grouptypeId: $grouptypeId}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...GroupLarge
  }
}
`,
    GroupLargeFragment
);

export const GroupInsertAsyncAction = createAsyncGraphQLAction(GroupInsertMutation)
