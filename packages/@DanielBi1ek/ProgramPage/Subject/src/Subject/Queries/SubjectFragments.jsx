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
  __typename
  ...SubjectLink
}
`, SubjectLinkFragment)

export const SubjectLargeFragment = createQueryStrLazy(
    `
fragment SubjectLarge on SubjectGQLModel {
  __typename
  ...SubjectMedium
  id
  name
  lastchange
}
`, SubjectMediumFragment)