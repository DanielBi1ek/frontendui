import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";


const SubjectUpdateMutation = createQueryStrLazy(
    `
mutation subjectUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String!, $description: String, $descriptionEn: String!, $programId: UUID!, $groupId: UUID!) {
  subjectUpdate(subject: {id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, description: $description, descriptionEn: $descriptionEn, programId: $programId, groupId: $groupId}) {
    ... on SubjectGQLModel {
        __typename
      id
      name
        nameEn
        description
        descriptionEn
        programId
        groupId
      lastchange
    }
    ... on SubjectGQLModelUpdateError {
      input
    }
  }
}
`
);

export const SubjectUpdateAsyncAction = createAsyncGraphQLAction(SubjectUpdateMutation)