import { PersonFill } from "react-bootstrap-icons"
import { ProgramsectionLink } from "./ProgramsectionLink"
import { ProgramsectionCardCapsule } from "./ProgramsectionCardCapsule"
import { ProgramsectionMediumContent } from "./ProgramsectionMediumContent"

/**
 * A card component that displays detailed content for an programsection entity.
 *
 * This component combines `ProgramsectionCardCapsule` and `ProgramsectionMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the programsection entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ProgramsectionMediumCard component.
 * @param {Object} props.programsection - The object representing the programsection entity.
 * @param {string|number} props.programsection.id - The unique identifier for the programsection entity.
 * @param {string} props.programsection.name - The name or label of the programsection entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const programsectionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramsectionMediumCard programsection={programsectionEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ProgramsectionMediumCard>
 */
export const ProgramsectionMediumCard = ({programsection, children}) => {
    return (
        <ProgramsectionCardCapsule title={<><PersonFill /> <ProgramsectionLink programsection={programsection} /></>}>
            <ProgramsectionMediumContent programsection={programsection}>
                {children}
            </ProgramsectionMediumContent>
        </ProgramsectionCardCapsule>
    )
}
