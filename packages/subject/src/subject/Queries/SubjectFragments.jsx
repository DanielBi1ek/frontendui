import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SubjectLinkFragment = createQueryStrLazy(
`
fragment SubjectLink on SubjectGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const SubjectMediumFragment = createQueryStrLazy(
`
fragment SubjectMedium on SubjectGQLModel {
  ...SubjectLink
  description
  guarantors {
        name
        email
        created
  }
  program {
    __typename
    id 
    lastchange
    name
  }
}
`, SubjectLinkFragment)

export const SubjectLargeFragment = createQueryStrLazy(
`
fragment SubjectLarge on SubjectGQLModel {
  ...SubjectMedium
  semesters {
    __typename
    id
    lastchange
    mandatory
    topics {
      __typename
      id
      order
      name
    }
  }
}
`, SubjectMediumFragment)
  