import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarrantLargeFragment } from "./GuarrantFragments";

const RoleDeleteMutation = createQueryStrLazy(
`
mutation RoleDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: roleDelete(
    role: {id: $id, lastchange: $lastchange}
  ) {
    ... on RoleGQLModelDeleteError {
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

export const RoleDeleteAsyncAction = createAsyncGraphQLAction(RoleDeleteMutation)