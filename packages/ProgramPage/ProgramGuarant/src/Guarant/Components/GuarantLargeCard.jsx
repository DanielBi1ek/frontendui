import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { GuarantCardCapsule } from "./GuarantCardCapsule"
import { GuarantMediumCard } from "./GuarantMediumCard"

/**
 * A large card component for displaying detailed content and layout for an guarant entity.
 *
 * This component wraps an `GuarantCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `GuarantMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the GuarantLargeCard component.
 * @param {Object} props.guarant - The object representing the guarant entity.
 * @param {string|number} props.guarant.id - The unique identifier for the guarant entity.
 * @param {string} props.guarant.name - The name or label of the guarant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const guarantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarantLargeCard guarant={guarantEntity}>
 *   <p>Additional content for the middle column.</p>
 * </GuarantLargeCard>
 */
export const GuarantLargeCard = ({guarant, children}) => {
    return (
        <GuarantCardCapsule guarant={guarant} >
            <Row>
                <LeftColumn>
                    <GuarantMediumCard guarant={guarant}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </GuarantCardCapsule>
    )
}
