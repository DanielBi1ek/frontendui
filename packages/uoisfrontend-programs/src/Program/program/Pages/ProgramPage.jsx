import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import {CreateDelayer, ErrorHandler, LoadingSpinner,} from "@hrbolek/uoisfrontend-shared"
import {useAsyncAction} from "@hrbolek/uoisfrontend-gql-shared"
import {ProgramLargeCard} from "../Components"
import {ProgramReadAsyncAction, ProgramListAsyncAction} from "../Queries"
import {ProgramPageNavbar} from "./ProgramPageNavbar"
import {SubjectMediumContent, SubjectCardCapsule} from "../../../Subject/src/Subject";

/**
 * Renders the main content for a program page, including the navbar, program card, and subjects.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.program - The program entity object.
 * @param {boolean} props.isEditable - If true, enables editing features.
 * @param {Array} [props.subjects] - Optional array of subject entities.
 * @param {Array|string} [props.groupId] - Optional group ID(s).
 * @returns {JSX.Element}
 */
const ProgramPageContent = ({program, isEditable, subjects, groupId = []}) => {
    return (
        <>
            {/* Navigation bar for the program */}
            <ProgramPageNavbar program={program}/>
            {/* Main program card with details */}
            <ProgramLargeCard program={program} isEditable={isEditable} />
            {/* Capsule card for subjects related to the program */}
            <SubjectCardCapsule
                isEditable={isEditable}
                subject={{ programId: program.id }} // Ensures programId is always present
            >
                <SubjectMediumContent subjects={program.subjects} isEditable={isEditable} />
            </SubjectCardCapsule>
        </>
    );
};

/**
 * Handles lazy loading and fetching of program data, displaying loading and error states.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.program - The program entity or identifier.
 * @param {boolean} props.isEditable - If true, enables editing features.
 * @returns {JSX.Element}
 */
const ProgramPageContentLazy = ({program, isEditable}) => {
    // Fetch program data using async action
    const {error, loading, entity, fetch} = useAsyncAction(
        program?.id ? ProgramReadAsyncAction : ProgramListAsyncAction,
        program?.id ? {id: program.id} : {}
    );

    // Delayer for debouncing fetches
    const [delayer] = useState(() => CreateDelayer());

    /**
     * Handles input change events, triggers a delayed fetch.
     * @param {Event} e - The change event.
     */
    const handleChange = async (e) => {
        const data = e.target.value;
        await delayer(() => fetch(data));
    };

    /**
     * Handles input blur events, triggers a delayed fetch.
     * @param {Event} e - The blur event.
     */
    const handleBlur = async (e) => {
        const data = e.target.value;
        await delayer(() => fetch(data));
    };

    return (
        <>
            {loading && <LoadingSpinner/>}
            {error && <ErrorHandler errors={error}/>}
            {/* Render single program view */}
            {entity && program?.id && (
                <ProgramPageContent program={entity} onChange={handleChange} onBlur={handleBlur}
                                    isEditable={isEditable}/>
            )}
            {/* Render list of programs if no ID is provided DISCONTINUED*/}
            {entity && !program?.id && (
                <div>
                    {entity.result.map((program) => (
                        <ProgramLargeCard key={program.id} program={program}/>
                    ))}
                </div>
            )}
        </>
    );
};

/**
 * Top-level page component for displaying a program entity.
 * Extracts the program ID from the route and passes it to the lazy loader.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isEditable - If true, enables editing features.
 * @returns {JSX.Element}
 */
export const ProgramPage = ({isEditable}) => {
    const {id} = useParams(); // Get the `id` from the URL
    const program = id ? {id} : null; // Pass `null` if no `id`
    return <ProgramPageContentLazy program={program} isEditable={isEditable}/>;
};