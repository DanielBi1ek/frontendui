import React, {useEffect, useState} from "react"
import { useParams } from "react-router"
import {BackpackFill, PersonFill} from "react-bootstrap-icons"
import {SearchInput} from "@hrbolek/uoisfrontend-shared";
import {
    CardCapsule,
    CreateDelayer,
    ErrorHandler,
    LeftColumn,
    LoadingSpinner,
    MiddleColumn

} from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import {ProgramLargeCard, ProgramLink, ProgramMediumCard, ProgramMediumContent} from "../Components"
import { ProgramReadAsyncAction, ProgramListAsyncAction } from "../Queries"
import { ProgramPageNavbar } from "./ProgramPageNavbar"
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {ButtonCardCapsule} from "../Components/ProgramButtonsDisplay";
import {SubjectButtonCardCapsule} from "../Components/SubjectButtonDisplay";
import {ProgramDetailsMediumContent} from "../../../ProgramDetails/Components";
import {UserInputSearch} from "../Components/UserResults";
import {GuarantMediumCard} from "../Components/GuarantorMediumCard";





/**
 * A page content component for displaying detailed information about an program entity.
 *
 * This component utilizes `ProgramDetailsLargeCard` to create a structured layout and displays
 * the serialized representation of the `program` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ProgramPageContent component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an program entity.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 *
 * <ProgramPageContent program={programEntity} />
 */

// garance programu group id : b1bedec8-931f-11ed-9b95-0242ac110002
    // garant role id:5f0c247e-931f-11ed-9b95-0242ac110002
    //studijní skupina id: cd49e157-610c-11ed-9312-001a7dda7110
const GUARANTOR_ROLE_ID = "5f0c247e-931f-11ed-9b95-0242ac110002";

const uuid = () => crypto.randomUUID();

const ProgramPageContent = ({ program, subjects, groupId = [] }) => {
    const handleDone = (updatedProgram) => {
        console.log("Operation completed:", updatedProgram);
    };

    return (
        <>
            <ProgramPageNavbar program={program}/>
            <ButtonCardCapsule title={<ProgramLink program={program}/>} program={program}>

                <Row>
                    <LeftColumn>
                        <ProgramMediumCard program={program}/>
                    </LeftColumn>
                    <MiddleColumn>

                        <GuarantMediumCard program={program}/>


                    </MiddleColumn>

                </Row>
            </ButtonCardCapsule>

            <SubjectButtonCardCapsule title={"Předměty:"}>
                <Row>
                    <LeftColumn>
                        <ProgramDetailsMediumContent program={program}/>
                    </LeftColumn>
                    <MiddleColumn>
                    </MiddleColumn>

                </Row>

            </SubjectButtonCardCapsule>
            <Card className="mb-3">
                <Card.Header>
                    <h5>Přidání garanta</h5>
                    <UserInputSearch
                        program={program}
                        groupId={program.groupId}
                        onSelect={user => console.log(user)}
                    />
                </Card.Header>
                <Card.Body>
                </Card.Body>
            </Card>
        </>
    );
};

/**
 * A lazy-loading component for displaying content of an program entity.
 *
 * This component is created using `createLazyComponent` and wraps `ProgramPageContent` to provide
 * automatic data fetching for the `program` entity. It uses the `ProgramDetailsReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `program` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.program - The identifier of the program entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `program` entity data and displays it
 * using `ProgramPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const programId = "12345";
 *
 * <ProgramPageContentLazy program={programId} />
 */


const ProgramPageContentLazy = ({ program}) => {
    const {error, loading, entity, fetch} = useAsyncAction(
        program?.id ? ProgramReadAsyncAction : ProgramListAsyncAction,
        program?.id ? {id: program.id} : {} // Pass default object

    );




    const [delayer] = useState(() => CreateDelayer());

    const handleChange = async (e) => {
        const data = e.target.value;
        const serverResponse = await delayer(() => fetch(data));
    };

    const handleBlur = async (e) => {
        const data = e.target.value;
        const serverResponse = await delayer(() => fetch(data));
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entity && program?.id && (
                <ProgramPageContent program={entity} onChange={handleChange} onBlur={handleBlur} />
            )}
            {entity && !program?.id && (
                <div>
                    {entity.programs.map((program) => (
                        <ProgramLargeCard key={program.id} program={program} />
                    ))}
                </div>
            )}
        </>
    );
};
/**
 * A page component for displaying lazy-loaded content of an program entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `program` object, and passes it to the `ProgramPageContentLazy` component.
 * The `ProgramPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the program entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/program/:id" element={<ProgramPage />} />
 *
 * // Navigating to "/program/12345" will render the page for the program entity with ID 12345.
 */
export const ProgramPage = () => {
    const { id } = useParams(); // Get the `id` from the URL
    const program = id ? { id } : null; // Pass `null` if no `id`
    return <ProgramPageContentLazy program={program} />;
};
