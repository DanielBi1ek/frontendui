import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramCardCapsule } from "../../../../Program/program"
import { ProgramMediumCard } from "../../../../Program/program"

/**
 * A large card component for displaying detailed content and layout for a program entity.
 *
 * This component wraps a `ProgramCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying a `ProgramMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the GuarrantLargeCard component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 *
 * <GuarrantLargeCard program={programEntity}>
 *   <p>Additional content for the middle column.</p>
 * </GuarrantLargeCard>
 */
export const GuarrantLargeCard = ({ program, children }) => {
    return (
        <ProgramCardCapsule program={program}>
            <Row>
                {/* Left column displays the medium card for the program */}
                <LeftColumn>
                    <ProgramMediumCard program={program} />
                </LeftColumn>
                {/* Middle column displays any additional children */}
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramCardCapsule>
    )
}