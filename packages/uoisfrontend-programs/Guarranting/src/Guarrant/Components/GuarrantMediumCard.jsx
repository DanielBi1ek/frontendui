import { GuarrantMediumContent } from "./GuarrantMediumContent";

/**
 * A card component that displays detailed content for a program entity's guarantors.
 *
 * This component renders the `GuarrantMediumContent` for a given program, optionally allowing editing.
 * Any additional children are rendered inside the content area.
 *
 * @component
 * @param {Object} props - The properties for the GuarantMediumCard component.
 * @param {Object} props.program - The program entity object.
 * @param {string|number} props.program.id - The unique identifier for the program.
 * @param {string} props.program.name - The name of the program.
 * @param {boolean} [props.isEditable=false] - If true, enables editing of guarantors.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card.
 *
 * @returns {JSX.Element} A card displaying the program's guarantors and optional children.
 *
 * @example
 * const programEntity = { id: 123, name: "Sample Program" };
 * <GuarantMediumCard program={programEntity} isEditable={true}>
 *   <p>Extra content here</p>
 * </GuarantMediumCard>
 */
export const GuarantMediumCard = ({ program, isEditable, children }) => (
    // Render the main content for program guarantors
    <GuarrantMediumContent program={program} isEditable={isEditable}>
        {children}
    </GuarrantMediumContent>
);