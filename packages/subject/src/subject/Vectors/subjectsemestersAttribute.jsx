import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { Map } from "react-bootstrap-icons"
import {Row,Col, Card} from "react-bootstrap"
import { SubjectTopicsAttribute } from "./subjecttopicsAttribute"


/**
 * A component for displaying the `semesters` attribute of an subject entity.
 *
 * This component checks if the `semesters` attribute exists on the `subject` object. If `semesters` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `semesters` array and
 * displays a placeholder message and a JSON representation for each item in the `semesters`.
 *
 * @component
 * @param {Object} props - The props for the SubjectSemestersAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {Array} [props.subject.semesters] - An array of semesters items associated with the subject entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `semesters` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { 
 *   semesters: [
 *     { id: 1, name: "Semester Item 1" }, 
 *     { id: 2, name: "Semester Item 2" }
 *   ] 
 * };
 *
 * <SubjectSemestersAttribute subject={subjectEntity} />
 */
const SemesterMediumCard = ({semester}) => {
    const topics = {topics:semester?.topics || []}
    return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h5">{semester.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ID: {semester.id} &nbsp;|&nbsp; Posl. změna: {semester.lastchange}
        </Card.Subtitle>

        <div className="mt-3">
          <h3><strong>Témata:</strong></h3> 
          <SubjectTopicsAttribute subject={topics} />
        </div>
      </Card.Body>
    </Card>
  );
};

export const SubjectSemestersAttribute = ({subject}) => {
    console.log(subject)
    const {semesters} = subject
    console.log(semesters)
    console.log(typeof semesters)
    if (typeof semesters == 'undefined') return null
    return (
        <>
            {semesters.map(semester => <SemesterMediumCard semester = {semester} key = {semester.id}/>)}
        </>
    )
}

const SemestersAttributeQuery = `
query SubjectQueryRead($id: id, $where: SemesterInputFilter, $skip: Int, $limit: Int) {
    result: subjectById(id: $id) {
        __typename
        id
        semesters(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const SemestersAttributeAsyncAction = createAsyncGraphQLAction(
    SemestersAttributeQuery,
    processVectorAttributeFromGraphQLResult("semesters")
)

export const SubjectSemestersAttributeInifite = ({subject}) => { 
    const {semesters} = subject

    return (
        <InfiniteScroll 
            Visualiser={'SemesterMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={SemestersAttributeAsyncAction}
        />
    )
}