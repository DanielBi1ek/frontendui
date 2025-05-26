import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramsectionCardCapsule } from "./ProgramsectionCardCapsule"
import { ProgramsectionMediumCard } from "./ProgramsectionMediumCard"

/**
 * A large card component for displaying detailed content and layout for an programsection entity.
 *
 * This component wraps an `ProgramsectionCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramsectionMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramsectionLargeCard component.
 * @param {Object} props.programsection - The object representing the programsection entity.
 * @param {string|number} props.programsection.id - The unique identifier for the programsection entity.
 * @param {string} props.programsection.name - The name or label of the programsection entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programsectionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramsectionLargeCard programsection={programsectionEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramsectionLargeCard>
 */
export const ProgramsectionLargeCard = ({programsection, children}) => {
    return (
        <ProgramsectionCardCapsule programsection={programsection} >
            <Row>
                <LeftColumn>
                    <ProgramsectionMediumCard programsection={programsection}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramsectionCardCapsule>
    )
}
