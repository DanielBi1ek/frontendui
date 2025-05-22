import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramLink } from "./ProgramLink"

/**
 * A specialized card component that displays an `ProgramDetailsLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramDetailsLink` component in the card's header. The `children` prop is used to render any content
 * inside the card body. It is designed for use with entities represented by the `program` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramDetailsCardCapsule component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The display name for the program entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramDetailsCardCapsule } from './ProgramDetailsCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramDetailsCardCapsule program={programEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramDetailsCardCapsule>
 */
export const ProgramCardCapsule = ({program, children, title=<><PersonFill /> <ProgramLink program={program} /></>}) => {
    return (
        <CardCapsule title={title}>

            {children}
        </CardCapsule>
    )
}
