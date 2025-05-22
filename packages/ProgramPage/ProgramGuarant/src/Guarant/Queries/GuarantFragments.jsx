import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const GuarantLinkFragment = createQueryStrLazy(
`
fragment GuarantLink on GuarantGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const GuarantMediumFragment = createQueryStrLazy(
`
fragment GuarantMedium on GuarantGQLModel {
  ...GuarantLink
}
`, GuarantLinkFragment)

export const GuarantLargeFragment = createQueryStrLazy(
`
fragment GuarantLarge on GuarantGQLModel {
  ...GuarantMedium
}
`, GuarantMediumFragment)
  