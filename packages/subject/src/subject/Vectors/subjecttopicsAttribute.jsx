import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { Map } from "react-bootstrap-icons"
import {Row, Card} from "react-bootstrap"

/**
 * A component for displaying the `topics` attribute of an subject entity.
 *
 * This component checks if the `topics` attribute exists on the `subject` object. If `topics` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `topics` array and
 * displays a placeholder message and a JSON representation for each item in the `topics`.
 *
 * @component
 * @param {Object} props - The props for the SubjectTopicsAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {Array} [props.subject.topics] - An array of topics items associated with the subject entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `topics` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { 
 *   topics: [
 *     { id: 1, name: "Topic Item 1" }, 
 *     { id: 2, name: "Topic Item 2" }
 *   ] 
 * };
 *
 * <SubjectTopicsAttribute subject={subjectEntity} />
 */
const TopicMediumCard = ({topic}) =>
    (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title><strong>{topic.name}</strong></Card.Title>
      <Card.Subtitle className="mb-2 text-muted">ID: {topic.id}</Card.Subtitle>
      <Card.Text>
        {topic.description || "— Bez popisu —"}
        <br />
        <small>Posl. změna: {topic.lastchange}</small>
      </Card.Text>
    </Card.Body>
  </Card>
);


export const SubjectTopicsAttribute = ({subject}) => {
    console.log(subject)
    const {topics} = subject
    console.log(topics)
    console.log(typeof topics)
    if (typeof topics == 'undefined') return null
    return (
        <>
            {topics.map(topic => <TopicMediumCard topic = {topic} key = {topic.id}/>)}
        </>
    )
}

const TopicsAttributeQuery = `
query SubjectQueryRead($id: id, $where: TopicInputFilter, $skip: Int, $limit: Int) {
    result: subjectById(id: $id) {
        __typename
        id
        topics(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            description

        }
    }
}
`

const TopicsAttributeAsyncAction = createAsyncGraphQLAction(
    TopicsAttributeQuery,
    processVectorAttributeFromGraphQLResult("topics")
)

export const SubjectTopicsAttributeInifite = ({subject}) => { 
    const {topics} = subject

    return (
        <InfiniteScroll 
            Visualiser={'TopicMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={TopicsAttributeAsyncAction}
        />
    )
}