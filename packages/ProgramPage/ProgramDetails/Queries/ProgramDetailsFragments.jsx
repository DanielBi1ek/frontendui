import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";


export const ProgramLinkFragment = createQueryStrLazy(
    `
fragment ProgramLink on ProgramGQLModel {
  __typename
  id
  name
  lastchange
}
`
);

export const ProgramMediumFragment = createQueryStrLazy(
    `
fragment ProgramMedium on ProgramGQLModel {
  __typename
  ...ProgramLink
  subjects {
    id
    name
  }
}
`,
    ProgramLinkFragment
);

export const ProgramLargeFragment = createQueryStrLazy(
    `
fragment ProgramLarge on ProgramGQLModel {
  __typename
  ...ProgramMedium
  name
}
`,
    ProgramMediumFragment
);

