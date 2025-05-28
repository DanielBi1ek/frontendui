import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";


export const ProgramLinkFragment = createQueryStrLazy(
    `
fragment ProgramLink on ProgramGQLModel {
__typename
  id
  name
  lastchange
  groupId
}

`);


export const ProgramListFragment = createQueryStrLazy(
  `
fragment ProgramList on ProgramGQLModel{
  __typename
  id
  name
  changedbyId
  created
  lastchange
  guarantors {
      id
      roles {
        user {
          name
        }
      }
    }
}

`);


export const ProgramMediumFragment = createQueryStrLazy(
    `
fragment ProgramMedium on ProgramGQLModel {
__typename
  ...ProgramLink
    type {
      name
    }
    groupId
    guarantors {
      id
      roles {
        user {
        id
        lastchange
          name
          surname
        }
      }
    }
    subjects {
        id
        name
        }
        
  }
`, ProgramLinkFragment);

export const ProgramLargeFragment = createQueryStrLazy(
    `
fragment ProgramLarge on ProgramGQLModel {
__typename
  ...ProgramMedium
  name 
}
`, ProgramMediumFragment);

// New query for fetching multiple programs
export const ProgramsListQuery = createQueryStrLazy(
    `
query ProgramsListQuery {
  programs{
  __typename
    id
    name
    groupId
    type {
      name
    }
  }
}
`
);

