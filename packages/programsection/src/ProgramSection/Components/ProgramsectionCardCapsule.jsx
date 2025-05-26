import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ProgramsectionLink } from "./ProgramsectionLink"

/**
 * A specialized card component that displays an `ProgramsectionLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ProgramsectionLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `programsection` object.
 *
 * @component
 * @param {Object} props - The props for the ProgramsectionCardCapsule component.
 * @param {Object} props.programsection - The object representing the programsection entity.
 * @param {string|number} props.programsection.id - The unique identifier for the programsection entity.
 * @param {string} props.programsection.name - The display name for the programsection entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ProgramsectionCardCapsule } from './ProgramsectionCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const programsectionEntity = { id: 123, name: "Example Entity" };
 *
 * <ProgramsectionCardCapsule programsection={programsectionEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ProgramsectionCardCapsule>
 */
export const ProgramsectionCardCapsule = ({programsection, children, title=<><PersonFill /> <ProgramsectionLink programsection={programsection} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
