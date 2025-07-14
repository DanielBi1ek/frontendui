import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";



const RoleInsertMutation = createQueryStrLazy(
    `
mutation RoleInsertMutation($userId: UUID!, $groupId: UUID!, $roletypeId: UUID!) {
  result: roleInsert(
    role: {userId: $userId, groupId: $groupId, roletypeId: $roletypeId}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    
  }
}
`,

);


export const RoleInsertAsyncAction = createAsyncGraphQLAction(RoleInsertMutation)