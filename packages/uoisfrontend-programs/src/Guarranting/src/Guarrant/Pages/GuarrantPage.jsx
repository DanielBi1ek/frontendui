import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { GuarrantLargeCard } from "../Components"
import { GuarrantReadAsyncAction } from "../Queries"
import { GuarrantPageNavbar } from "./GuarrantPageNavbar"

/**
 * A page content component for displaying detailed information about an guarrant entity.
 *
 * This component utilizes `GuarrantLargeCard` to create a structured layout and displays 
 * the serialized representation of the `guarrant` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the GuarrantPageContent component.
 * @param {Object} props.guarrant - The object representing the guarrant entity.
 * @param {string|number} props.guarrant.id - The unique identifier for the guarrant entity.
 * @param {string} props.guarrant.name - The name or label of the guarrant entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an guarrant entity.
 *
 * @example
 * // Example usage:
 * const guarrantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarrantPageContent guarrant={guarrantEntity} />
 */
const GuarrantPageContent = ({guarrant}) => {
    return (<>
        <GuarrantPageNavbar guarrant={guarrant} />
        <GuarrantLargeCard guarrant={guarrant}>
            Guarrant {JSON.stringify(guarrant)}
        </GuarrantLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an guarrant entity.
 *
 * This component is created using `createLazyComponent` and wraps `GuarrantPageContent` to provide
 * automatic data fetching for the `guarrant` entity. It uses the `GuarrantReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `guarrant` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.guarrant - The identifier of the guarrant entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `guarrant` entity data and displays it
 * using `GuarrantPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const guarrantId = "12345";
 *
 * <GuarrantPageContentLazy guarrant={guarrantId} />
 */
const GuarrantPageContentLazy = ({guarrant}) => {
    const { error, loading, entity, fetch } = useAsyncAction(GuarrantReadAsyncAction, guarrant)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <GuarrantPageContent guarrant={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an guarrant entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `guarrant` object, and passes it to the `GuarrantPageContentLazy` component.
 * The `GuarrantPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the guarrant entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/guarrant/:id" element={<GuarrantPage />} />
 *
 * // Navigating to "/guarrant/12345" will render the page for the guarrant entity with ID 12345.
 */
export const GuarrantPage = () => {
    const {id} = useParams()
    const guarrant = {id}
    return <GuarrantPageContentLazy guarrant={guarrant} />
}