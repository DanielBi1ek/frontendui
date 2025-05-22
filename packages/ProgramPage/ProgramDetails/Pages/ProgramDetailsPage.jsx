import { useParams } from "react-router";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramDetailsReadAsyncAction } from "../Queries";
import { LoadingSpinner, ErrorHandler } from "@hrbolek/uoisfrontend-shared";
import {ProgramPageNavbar} from "../../src/program/Pages/ProgramPageNavbar";
import {ProgramDetailsLargeCard} from "../Components";
import React, {useEffect, useState} from "react";
import {SubjectButton} from "../Components";


export const ProgramDetailsPage = () => {
    const { id } = useParams();
    const { error, loading, entity } = useAsyncAction(ProgramDetailsReadAsyncAction, { id });
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (entity && entity.subjects) {
            setSubjects(entity.subjects); // Populate subjects from the program
        }
    }, [entity]);
    const handleDone = (newSubject) => {
        setSubjects((prevSubjects) => [...prevSubjects, newSubject]); // Add the new subject to the list
    };

    return (
        <div>
            <ProgramPageNavbar />

            {loading && <LoadingSpinner />}
            {error && <ErrorHandler errors={error} />}
            {entity && (
                <div>
                    <ProgramDetailsLargeCard program={entity}>
                        <SubjectButton
                            operation="C"
                            subject={{
                                name: "Nový předmět",
                                nameEn: "New subject",
                                programId: entity.id,
                                groupId: "119086b2-d24d-43fe-89f3-d5365e5ad7e7",
                                description: "",
                                descriptionEn: "",
                            }}
                            onDone={handleDone} // Pass the callback
                        >
                            Add New Subject
                        </SubjectButton>

                    </ProgramDetailsLargeCard>
                </div>
            )}
        </div>
    );
};


