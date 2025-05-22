import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GuarantLargeFragment } from "./GuarantFragments";

const GuarantInsertMutation = createQueryStrLazy(
`
mutation GuarantInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: guarantInsert(
    guarant: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...GuarantLarge
  }
}
`,
    GuarantLargeFragment)


export const GuarantInsertAsyncAction = createAsyncGraphQLAction(GuarantInsertMutation)