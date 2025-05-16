import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ProgramCardCapsule } from "./ProgramCardCapsule"
import { ProgramMediumCard } from "./ProgramMediumCard"
import { ProgramButton } from "./ProgramCUDButton";

/**
 * A large card component for displaying detailed content and layout for an program entity.
 *
 * This component wraps an `ProgramDetailsCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ProgramMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ProgramLargeCard component.
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
 * <ProgramLargeCard program={programEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ProgramLargeCard>
 */

const ProgramLargeCardWithButton = ({ program }) => {
    const handleDone = (updatedProgram) => {
        console.log("Operace dokončena:", updatedProgram);
    };

    return (
        <ProgramLargeCard program={program}>
            {/* Přidání tlačítka do MiddleColumn */}
            <ProgramButton
                operation="U"
                program={program}
                onDone={handleDone}
            >
                Upravit Program
            </ProgramButton>
            <br />
            <ProgramButton
                operation="C"
                program={{ name: "Nový Program", name_en: "New Program EN" }}
                onDone={handleDone}
            >
                Vložit Program
            </ProgramButton>
            <br />
            <ProgramButton
                operation="D"
                program={program}
                onDone={handleDone}
            >
                Smazat Program
            </ProgramButton>
        </ProgramLargeCard>
    );
};

export default ProgramLargeCardWithButton;
export const ProgramLargeCard = ({program, children}) => {
    return (
        <ProgramCardCapsule program={program} >
            <Row>
                <LeftColumn>
                    <ProgramMediumCard program={program}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ProgramCardCapsule>
    )
}
