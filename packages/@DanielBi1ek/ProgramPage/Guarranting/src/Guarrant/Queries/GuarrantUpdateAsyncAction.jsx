import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarrantLargeFragment } from "./GuarrantFragments";

const GuarrantUpdateMutation = createQueryStrLazy(
`
mutation GuarrantUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: guarrantUpdate(
    guarrant: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on GuarrantGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...GuarrantLarge
      }      
    }
    ...GuarrantLarge
  }
}
`, GuarrantLargeFragment)

export const GuarrantUpdateAsyncAction = createAsyncGraphQLAction(GuarrantUpdateMutation)