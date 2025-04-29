import { useParams } from "react-router";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramReadAsyncAction } from "../Queries";
import { LoadingSpinner, ErrorHandler } from "@hrbolek/uoisfrontend-shared";
import {ProgramPageNavbar} from "./ProgramPageNavbar";
import {ProgramCardCapsule, ProgramLargeCard} from "../Components";






export const ProgramDetailsPage = () => {
    const { id } = useParams();
    const { error, loading, entity } = useAsyncAction(ProgramReadAsyncAction, { id });

    return (
        <div>
            <ProgramPageNavbar/>



            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entity && (
                <div>
                    <ProgramLargeCard program={entity}>
                        <h1>{entity.name}</h1>
                        <p>Type: {entity.type?.name}</p>
                        <h3>Details:</h3>
                        <p>Lorem ipsum matematika + matematika = matematika2</p>

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