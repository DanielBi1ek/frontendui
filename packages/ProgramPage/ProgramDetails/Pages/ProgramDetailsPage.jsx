import { useParams } from "react-router";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramReadAsyncAction } from "../Queries";
import { LoadingSpinner, ErrorHandler } from "@hrbolek/uoisfrontend-shared";
import {ProgramPageNavbar} from "../../src/program/Pages/ProgramPageNavbar";
import {ProgramDetailsCardCapsule, ProgramLargeCard} from "../Components";
import {ProgramButton} from "../../src/program/Components";






export const ProgramDetailsPage = (program) => {
    const { id } = useParams();
    const { error, loading, entity } = useAsyncAction(ProgramReadAsyncAction, { id });
    const handleDone = (updatedProgram) => {
        console.log("Operation completed:", updatedProgram);
    };

    return (
        <div>
            <ProgramPageNavbar/>






            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entity && (
                <div>
                    <ProgramLargeCard program={entity}>
                        <ProgramButton
                            operation="U"
                            program={{id: entity.id}}
                            onDone={handleDone}>
                            Edit Program
                        </ProgramButton>
                        <br/>

                        <ProgramButton
                            operation="C"
                            program={{name: "New Program", name_en: "New Program EN" }}
                            onDone={handleDone}>
                            Insert Program
                        </ProgramButton>
                        <br/>
                        <ProgramButton
                            operation="D"
                            program={{ id: entity.id }} // Ensure the 'id' key is included
                            onDone={handleDone}>
                            Delete Program
                        </ProgramButton>

                        <h3>Guarantors:</h3>
                        <ul>

                            {Array.isArray(entity.guarantors) && entity.guarantors.length > 0 ? (
                                entity.guarantors.map((guarantor) => (
                                    <li key={guarantor.name}>
                                        {guarantor.abbreviation
                                            ? `${guarantor.abbreviation} - ${guarantor.name}`
                                            : guarantor.name}
                                    </li>
                                ))
                            ) : (
                                <li>No guarantors available.</li>
                            )}
                        </ul>

                    </ProgramLargeCard>

                </div>
            )}
        </div>
    );
};