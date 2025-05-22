import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

const SubjectInsertMutation = createQueryStrLazy(
    `
mutation SubjectInsertMutation($name: String, $nameEn: String, $programId: UUID, $groupId: UUID, $description: String, $descriptionEn: String) {
  result: subjectInsert(
    subject: {name: $name, nameEn: $nameEn, programId: $programId, groupId: $groupId, description: $description, descriptionEn: $descriptionEn}
  ) {
    ... on SubjectGQLModel {
    __typename
      id
      name
    }
    ... on InsertError {
      input
    }
  }
}

`,

);



export const SubjectInsertAsyncAction = createAsyncGraphQLAction(SubjectInsertMutation);