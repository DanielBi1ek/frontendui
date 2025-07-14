import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { Col, Row } from "react-bootstrap"
import { Map } from "react-bootstrap-icons"

/**
 * A component for displaying the `vectors` attribute of an subject entity.
 *
 * This component checks if the `vectors` attribute exists on the `subject` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the SubjectVectorsAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {Array} [props.subject.vectors] - An array of vectors items associated with the subject entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <SubjectVectorsAttribute subject={subjectEntity} />
 */
const VectorMediumCard = ({vector}) =>
    <>
        <Row>
            Jmeno:{vector.lastchange}
        </Row>   
        <Row>
            Id:{vector.id}
        </Row>
    </>
export const SubjectVectorsAttribute = ({subject}) => {
    console.log(subject)
    const {semesters} = subject
    console.log(semesters)
    console.log(typeof semesters)
    if (typeof semesters == 'undefined') return null
    return (
        <>
            {semesters.map(semester => <VectorMediumCard vector = {semester} key = {semester.id}/>)}
        </>
    )
}

const VectorsAttributeQuery = `
query SubjectQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: subjectById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const VectorsAttributeAsyncAction = createAsyncGraphQLAction(
    VectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const SubjectVectorsAttributeInifite = ({subject}) => { 
    const {vectors} = subject

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={VectorsAttributeAsyncAction}
        />
    )
}