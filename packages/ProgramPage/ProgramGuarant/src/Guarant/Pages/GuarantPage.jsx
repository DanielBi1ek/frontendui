import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { GuarantLargeCard } from "../Components"
import { GuarantReadAsyncAction } from "../Queries"
import { GuarantPageNavbar } from "./GuarantPageNavbar"

/**
 * A page content component for displaying detailed information about an guarant entity.
 *
 * This component utilizes `GuarantLargeCard` to create a structured layout and displays 
 * the serialized representation of the `guarant` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the GuarantPageContent component.
 * @param {Object} props.guarant - The object representing the guarant entity.
 * @param {string|number} props.guarant.id - The unique identifier for the guarant entity.
 * @param {string} props.guarant.name - The name or label of the guarant entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an guarant entity.
 *
 * @example
 * // Example usage:
 * const guarantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GuarantPageContent guarant={guarantEntity} />
 */
const GuarantPageContent = ({guarant}) => {
    return (<>
        <GuarantPageNavbar guarant={guarant} />
        <GuarantLargeCard guarant={guarant}>
            Guarant {JSON.stringify(guarant)}
        </GuarantLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an guarant entity.
 *
 * This component is created using `createLazyComponent` and wraps `GuarantPageContent` to provide
 * automatic data fetching for the `guarant` entity. It uses the `GuarantReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `guarant` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.guarant - The identifier of the guarant entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `guarant` entity data and displays it
 * using `GuarantPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const guarantId = "12345";
 *
 * <GuarantPageContentLazy guarant={guarantId} />
 */
const GuarantPageContentLazy = ({guarant}) => {
    const { error, loading, entity, fetch } = useAsyncAction(GuarantReadAsyncAction, guarant)
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
        {entity && <GuarantPageContent guarant={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an guarant entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `guarant` object, and passes it to the `GuarantPageContentLazy` component.
 * The `GuarantPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the guarant entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/guarant/:id" element={<GuarantPage />} />
 *
 * // Navigating to "/guarant/12345" will render the page for the guarant entity with ID 12345.
 */
export const GuarantPage = () => {
    const {id} = useParams()
    const guarant = {id}
    return <GuarantPageContentLazy guarant={guarant} />
}