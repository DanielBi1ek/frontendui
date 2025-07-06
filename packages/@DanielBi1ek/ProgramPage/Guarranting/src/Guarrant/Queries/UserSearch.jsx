import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

const UsersByPatternQuery = `
query UsersByPattern($pattern: String!, $skip: Int, $limit: Int) {
  users: userPage(
    skip: $skip,
    limit: $limit,
    where: {
      _or: [
        { fullname: { _ilike: $pattern } }
        { name: { _ilike: $pattern } }
      ]
    }
  ) {
     id
    fullname
    roles {
      id
      roletype {
        id
        name
      }
      group {
        name
        grouptype {
          name
        }
      }
    }
  }
  }
`;

export const FetchUsersByPatternAsyncAction = createAsyncGraphQLAction(
    UsersByPatternQuery,
    (json) => ({
        data: {
            users: json?.data?.users || []
        }
    })
);