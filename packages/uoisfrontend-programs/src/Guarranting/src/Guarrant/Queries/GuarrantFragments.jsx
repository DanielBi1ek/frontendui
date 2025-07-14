import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

// Only include fields that exist on RoleGQLModel
export const GuarrantLinkFragment = createQueryStrLazy(
    `
fragment GuarrantLink on RoleGQLModel {
  __typename
  id
  lastchange
  user {
    id
    name
    surname
  }
}
`
);

export const GuarrantMediumFragment = createQueryStrLazy(
    `
fragment GuarrantMedium on RoleGQLModel {
  ...GuarrantLink
}
`, GuarrantLinkFragment);

export const GuarrantLargeFragment = createQueryStrLazy(
    `
fragment GuarrantLarge on RoleGQLModel {
  ...GuarrantMedium
}
`, GuarrantMediumFragment);