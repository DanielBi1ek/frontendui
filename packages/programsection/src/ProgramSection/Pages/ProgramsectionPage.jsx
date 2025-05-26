import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramsectionLargeCard } from "../Components"
import { ProgramsectionReadAsyncAction } from "../Queries"
import { ProgramsectionPageNavbar } from "./ProgramsectionPageNavbar"

/**
 * A page content component for displaying detailed information about an programsection entity.
 *
 * This component utilizes `ProgramsectionLargeCard` to create a structured layout and displays 
 * the serialized representation of the `programsection` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ProgramsectionPageContent component.
 * @param {Object} props.programsection - The object representing the programsection entity.
 * @param {string|number} props.programsection.id - The unique identifier for the programsection entity.
 * @param {string} props.programsection.name - The name or label of the programsection entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an programsection entity.
 *
 * @example
 * // Example usage:
 * const programsectionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramsectionPageContent programsection={programsectionEntity} />
 */
const ProgramsectionPageContent = ({programsection}) => {
    return (<>
        <ProgramsectionPageNavbar programsection={programsection} />
        <ProgramsectionLargeCard programsection={programsection}>
            Programsection {JSON.stringify(programsection)}
        </ProgramsectionLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an programsection entity.
 *
 * This component is created using `createLazyComponent` and wraps `ProgramsectionPageContent` to provide
 * automatic data fetching for the `programsection` entity. It uses the `ProgramsectionReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `programsection` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.programsection - The identifier of the programsection entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `programsection` entity data and displays it
 * using `ProgramsectionPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const programsectionId = "12345";
 *
 * <ProgramsectionPageContentLazy programsection={programsectionId} />
 */
const ProgramsectionPageContentLazy = ({programsection}) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramsectionReadAsyncAction, programsection)
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
        {entity && <ProgramsectionPageContent programsection={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an programsection entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `programsection` object, and passes it to the `ProgramsectionPageContentLazy` component.
 * The `ProgramsectionPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the programsection entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/programsection/:id" element={<ProgramsectionPage />} />
 *
 * // Navigating to "/programsection/12345" will render the page for the programsection entity with ID 12345.
 */
export const ProgramsectionPage = () => {
    const {id} = useParams()
    const programsection = {id}
    return <ProgramsectionPageContentLazy programsection={programsection} />
}