import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarantLargeFragment } from "./GuarantFragments";

const GuarantDeleteMutation = createQueryStrLazy(
`
mutation GuarantDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: guarantDelete(
    guarant: {id: $id, lastchange: $lastchange}
  ) {
    ... on GuarantGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...GuarantLarge
      }
    }
  }
}
`,
    GuarantLargeFragment)

export const GuarantDeleteAsyncAction = createAsyncGraphQLAction(GuarantDeleteMutation)