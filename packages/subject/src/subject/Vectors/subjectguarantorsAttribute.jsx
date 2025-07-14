import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { Map } from "react-bootstrap-icons"

/**
 * A component for displaying the `guarantors` attribute of an subject entity.
 *
 * This component checks if the `guarantors` attribute exists on the `subject` object. If `guarantors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `guarantors` array and
 * displays a placeholder message and a JSON representation for each item in the `guarantors`.
 *
 * @component
 * @param {Object} props - The props for the SubjectGuarantorsAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {Array} [props.subject.guarantors] - An array of guarantors items associated with the subject entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `guarantors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { 
 *   guarantors: [
 *     { id: 1, name: "Guarantor Item 1" }, 
 *     { id: 2, name: "Guarantor Item 2" }
 *   ] 
 * };
 *
 * <SubjectGuarantorsAttribute subject={subjectEntity} />
 */
export const SubjectGuarantorsAttribute = ({subject}) => {
    const { guarantors } = subject
    console.log(typeof guarantors)
    if (typeof guarantors == 'undefined') return console.log("hovno")
    return (
        <>
            {console.log("jedeme")}
            {guarantors.map(
                guarantor => <div key={subject?.id}>
                    Probably {'<GuarantorMediumCard guarantor=\{guarantor\} />'} <br />
                    {JSON.stringify(guarantor)}
                </div>
            )}
        </>
    )
}

const GuarantorsAttributeQuery = `
query SubjectQueryRead($id: id, $where: GuarantorInputFilter, $skip: Int, $limit: Int) {
    result: subjectById(id: $id) {
        __typename
        id
        guarantors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const GuarantorsAttributeAsyncAction = createAsyncGraphQLAction(
    GuarantorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("guarantors")
)

export const SubjectGuarantorsAttributeInifite = ({subject}) => { 
    const {guarantors} = subject

    return (
        <InfiniteScroll 
            Visualiser={'GuarantorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={GuarantorsAttributeAsyncAction}
        />
    )
}