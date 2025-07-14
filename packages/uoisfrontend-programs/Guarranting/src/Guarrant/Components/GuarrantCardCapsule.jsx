import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { GuarrantLink } from "./GuarrantLink"

/**
 * A specialized card component that displays an `GuarrantLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `GuarrantLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `guarrant` object.
 *
 * @component
 * @param {Object} props - The props for the GuarrantCardCapsule component.
 * @param {Object} props.guarrant - The object representing the guarrant entity.
 * @param {string|number} props.guarrant.id - The unique identifier for the guarrant entity.
 * @param {string} props.guarrant.name - The display name for the guarrant entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { GuarrantCardCapsule } from './GuarrantCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const guarrantEntity = { id: 123, name: "Example Entity" };
 *
 * <GuarrantCardCapsule guarrant={guarrantEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </GuarrantCardCapsule>
 */
export const GuarrantCardCapsule = ({guarrant, children, title=<><PersonFill /> <GuarrantLink guarrant={guarrant} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
