import { PersonFill } from "react-bootstrap-icons"
import { GuarantLink } from "./GuarantLink"
import { GuarantCardCapsule } from "./GuarantCardCapsule"
import { GuarantMediumContent } from "./GuarantMediumContent"

/**
 * A card component that displays detailed content for an guarant entity.
 *
 * This component combines `GuarantCardCapsule` and `GuarantMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the guarant entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the GuarantMediumCard component.
 * @param {Object} props.guarant - The object representing the guarant entity.
 * @param {string|number} props.guarant.id - The unique identifier for the guarant entity.
 * @param {string} props.guarant.name - The name or label of the guarant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const guarantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarantMediumCard guarant={guarantEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </GuarantMediumCard>
 */
export const GuarantMediumCard = ({guarant, children}) => {
    return (
        <GuarantCardCapsule title={<><PersonFill /> <GuarantLink guarant={guarant} /></>}>
            <GuarantMediumContent guarant={guarant}>
                {children}
            </GuarantMediumContent>
        </GuarantCardCapsule>
    )
}
