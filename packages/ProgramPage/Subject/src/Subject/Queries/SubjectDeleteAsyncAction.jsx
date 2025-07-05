import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
const SubjectDeleteErrorFragment = `
fragment SubjectDeleteError on SubjectGQLModelDeleteError {
  failed
  msg
  input
  Entity {
    id
    name
    lastchange
  }
}
`;

const SubjectDeleteMutation = createQueryStrLazy(
    `
${SubjectDeleteErrorFragment}
mutation SubjectDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: subjectDelete(
    subject: {id: $id, lastchange: $lastchange}
  ) {
    ... on SubjectGQLModelDeleteError {
      ...SubjectDeleteError
    }
    ... on SubjectGQLModel {
      id
      name
      lastchange
    }
  }
}
`
);

export const SubjectDeleteAsyncAction = createAsyncGraphQLAction(SubjectDeleteMutation)