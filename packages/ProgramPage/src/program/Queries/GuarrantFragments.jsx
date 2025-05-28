import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";


export const GuarantLinkFragment = createQueryStrLazy(
    `
fragment ProgramLink on ProgramGQLModel {
__typename
  id
  name
  lastchange
  groupId
}

`);




export const GuarantMediumFragment = createQueryStrLazy(
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
`, GuarantLinkFragment);

export const GuarantLargeFragment = createQueryStrLazy(
    `
fragment ProgramLarge on ProgramGQLModel {
__typename
  ...ProgramMedium
  name 
}
`, GuarantMediumFragment);


