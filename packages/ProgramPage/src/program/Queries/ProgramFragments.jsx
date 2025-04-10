import {createQueryStrLazy} from "@hrbolek/uoisfrontend-gql-shared"
import * as querystring from "node:querystring";


export const ProgramLinkFragment = createQueryStrLazy(
    `
fragment ProgramLink on ProgramGQLModel {
  id
  name
}
`)


export const ProgramMediumFragment = createQueryStrLazy(
    `
fragment ProgramMedium on ProgramGQLModel {
  ...ProgramLink
  
 
}
`, ProgramLinkFragment)

export const ProgramLargeFragment = createQueryStrLazy(
    `
fragment ProgramLarge on ProgramGQLModel {
  ...ProgramMedium
  name
  
}
`, ProgramMediumFragment)
  