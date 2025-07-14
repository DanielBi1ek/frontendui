import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared"

const query =`{
    subjectPage {
      __typename
      name
      nameEn
      description
      descriptionEn
      id
      guarantors {
        name
        email
        created
      }
}}`

export const FetchAllSubjectsAsyncAction = createAsyncGraphQLAction(query)