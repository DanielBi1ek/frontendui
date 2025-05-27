import {createQueryStrLazy} from "@hrbolek/uoisfrontend-gql-shared";

export const GroupLinkFragment = createQueryStrLazy(`
fragment GroupLink on GroupGQLModel {
  __typename
   
  id
    name
    grouptypeId
}
`);

export const GroupMediumFragment = createQueryStrLazy(`
fragment GroupMedium on GroupGQLModel {
  ...GroupLink
   __typename
  id
    name
    grouptypeId
}
`, GroupLinkFragment);

export const GroupLargeFragment = createQueryStrLazy(`
fragment GroupLarge on GroupGQLModel {
  ...GroupMedium
  __typename
  id
    name
    grouptypeId
}
`, GroupMediumFragment);