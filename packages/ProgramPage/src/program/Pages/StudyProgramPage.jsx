import React, { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeCard } from "../Components";
import { ProgramReadAsyncAction } from "../Queries";
import {useParams} from "react-router";

const StudyProgramsPage = () => {
    const { error, loading, entities, fetch } = useAsyncAction(ProgramReadAsyncAction);
    const [delayer] = useState(() => CreateDelayer());
    const { id } = useParams(); // Ensure 'id' is retrieved from the route
    const queryVariables = { id };

    useAsyncAction(queryVariables);


    // Fetch data on component mount
    React.useEffect(() => {
        delayer(() => fetch());
    }, [delayer, fetch]);

    return (
        <div>
            <h1>Study Programs</h1>
            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entities && (
                <div>
                    {entities.map((program) => (
                        <ProgramLargeCard key={program.id} program={program}>
                            {program.name}
                        </ProgramLargeCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudyProgramsPage;