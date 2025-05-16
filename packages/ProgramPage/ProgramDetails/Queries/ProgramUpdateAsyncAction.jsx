import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const SubjectUpdateMutation = createQueryStrLazy(
`
mutation InsertSubject($name: String!, $code: String!) {
  insertSubject(input: { name: $name, code: $code }) {
    id
    name
    code
  }
}
`, ProgramLargeFragment)

export const SubjectUpdateAsyncAction = createAsyncGraphQLAction(SubjectUpdateMutation)