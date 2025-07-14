import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { SubjectCardCapsule } from "./SubjectCardCapsule"
import { SubjectMediumCard } from "./SubjectMediumCard"

/**
 * A large card component for displaying detailed content and layout for a subject entity.
 *
 * This component wraps a `SubjectCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying a `SubjectMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the SubjectLargeCard component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element|null} A JSX element combining a large card layout with dynamic content, or null if no subject.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { id: 123, name: "Sample Subject" };
 *
 * <SubjectLargeCard subject={subjectEntity}>
 *   <p>Additional content for the middle column.</p>
 * </SubjectLargeCard>
 */
export const SubjectLargeCard = ({ subject, children }) => {
    if (!subject) return null;
    return (
        <Row>
            {/* Left column displays the subject card and its medium content */}
            <LeftColumn>
                <SubjectCardCapsule program={subject}>
                    <SubjectMediumCard subject={subject} />
                    {children}
                </SubjectCardCapsule>
            </LeftColumn>
            {/* You can add a MiddleColumn here if needed for further layout */}
        </Row>
    );
};