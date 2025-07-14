import {BackpackFill, PersonFill} from "react-bootstrap-icons"
import { SubjectLink } from "./SubjectLink"
import { SubjectCardCapsule } from "./SubjectCardCapsule"
import { SubjectMediumContent } from "./SubjectMediumContent"

/**
 * A card component that displays detailed content for a subject entity.
 *
 * This component combines `SubjectCardCapsule` and `SubjectMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `BackpackFill` icon and a link to
 * the subject entity's details, while the body displays details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the SubjectMediumCard component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name or label of the subject entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * const subjectEntity = { id: 123, name: "Sample Subject" };
 * <SubjectMediumCard subject={subjectEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </SubjectMediumCard>
 */
export const SubjectMediumCard = ({subject, children}) => {
    // Render the subject card with a title and medium-level content
    return (
        <SubjectCardCapsule title={<><BackpackFill color={"#0c6ffd"}/> <SubjectLink subject={subject} /></>}>
            <SubjectMediumContent subject={subject}>
                {children}
            </SubjectMediumContent>
        </SubjectCardCapsule>
    )
}