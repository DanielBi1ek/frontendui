import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { Row,Col,Card } from "react-bootstrap"

/**
 * A component that displays medium-level content for an subject entity.
 *
 * This component renders a label "SubjectMediumContent" followed by a serialized representation of the `subject` object
 * and any additional child content. It is designed to handle and display information about an subject entity object.
 *
 * @component
 * @param {Object} props - The properties for the SubjectMediumContent component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `subject` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SubjectMediumContent subject={subjectEntity}>
 *   <p>Additional information about the entity.</p>
 * </SubjectMediumContent>
 */

export const SubjectMediumContent = ({ subject, children }) => 
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <Card.Title as="h5" className="mb-3">
        Informace o předmětu
      </Card.Title>

      <Row className="mb-2">
        <Col sm={4} className="fw-bold">Název:</Col>
        <Col sm={8}>{subject?.name}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={4} className="fw-bold">Anglický název:</Col>
        <Col sm={8}>{subject?.nameEn || "— Bez popisu —"}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={4} className="fw-bold">Popis:</Col>
        <Col sm={8}>{subject?.description || "— Bez popisu —"}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={4} className="fw-bold">ID:</Col>
        <Col sm={8}>{subject?.id}</Col>
      </Row>
      <Row className="mb-2">
            <Col sm={4} className="fw-bold">Poslední změna:</Col>
            <Col sm={8}>{subject?.lastchange}</Col>
      </Row>
      

      {children && <div className="mt-4">{children}</div>}
    </Card.Body>
  </Card>

