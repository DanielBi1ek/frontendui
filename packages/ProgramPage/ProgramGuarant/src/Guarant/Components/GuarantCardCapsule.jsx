import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { GuarantLink } from "./GuarantLink"

/**
 * A specialized card component that displays an `GuarantLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `GuarantLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `guarant` object.
 *
 * @component
 * @param {Object} props - The props for the GuarantCardCapsule component.
 * @param {Object} props.guarant - The object representing the guarant entity.
 * @param {string|number} props.guarant.id - The unique identifier for the guarant entity.
 * @param {string} props.guarant.name - The display name for the guarant entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { GuarantCardCapsule } from './GuarantCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const guarantEntity = { id: 123, name: "Example Entity" };
 *
 * <GuarantCardCapsule guarant={guarantEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </GuarantCardCapsule>
 */
export const GuarantCardCapsule = ({guarant, children, title=<><PersonFill /> <GuarantLink guarant={guarant} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
