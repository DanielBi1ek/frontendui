import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarrantLargeFragment } from "./GuarrantFragments";

const GuarrantDeleteMutation = createQueryStrLazy(
`
mutation GuarrantDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: guarrantDelete(
    guarrant: {id: $id, lastchange: $lastchange}
  ) {
    ... on GuarrantGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...GuarrantLarge
      }
    }
  }
}
`,
    GuarrantLargeFragment)

export const GuarrantDeleteAsyncAction = createAsyncGraphQLAction(GuarrantDeleteMutation)