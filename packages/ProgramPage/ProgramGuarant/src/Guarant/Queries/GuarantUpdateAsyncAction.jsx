import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarantLargeFragment } from "./GuarantFragments";

const GuarantUpdateMutation = createQueryStrLazy(
`
mutation UpdateUserGroup($id: UUID!, $lastchange: DateTime!, $groupId: UUID!) {
  userUpdate(user: { id: $id, lastchange: $lastchange, groupId: $groupId }) {
    ... on UserGQLModel {
      id
      name
      surname
      email
      group {
        id
        name
      }
    }
    ... on UserGQLModelUpdateError {
      message
      code
    }
  }
}
`, GuarantLargeFragment)

export const GuarantUpdateAsyncAction = createAsyncGraphQLAction(GuarantUpdateMutation)