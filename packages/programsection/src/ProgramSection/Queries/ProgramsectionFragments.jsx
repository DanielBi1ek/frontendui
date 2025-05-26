import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const ProgramsectionLinkFragment = createQueryStrLazy(
`
fragment ProgramsectionLink on ProgramsectionGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const ProgramsectionMediumFragment = createQueryStrLazy(
`
fragment ProgramsectionMedium on ProgramsectionGQLModel {
  ...ProgramsectionLink
}
`, ProgramsectionLinkFragment)

export const ProgramsectionLargeFragment = createQueryStrLazy(
`
fragment ProgramsectionLarge on ProgramsectionGQLModel {
  ...ProgramsectionMedium
}
`, ProgramsectionMediumFragment)
  