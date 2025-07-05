import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const GuarrantLinkFragment = createQueryStrLazy(
`
fragment GuarrantLink on GuarrantGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const GuarrantMediumFragment = createQueryStrLazy(
`
fragment GuarrantMedium on GuarrantGQLModel {
  ...GuarrantLink
}
`, GuarrantLinkFragment)

export const GuarrantLargeFragment = createQueryStrLazy(
`
fragment GuarrantLarge on GuarrantGQLModel {
  ...GuarrantMedium
}
`, GuarrantMediumFragment)
  