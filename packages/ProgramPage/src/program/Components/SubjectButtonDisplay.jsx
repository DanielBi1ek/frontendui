import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackpackFill } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import { SubjectButton } from "../../../ProgramDetails/Components";

export const SubjectButtonCardCapsule = ({ title = "", children = null, id = null }) => {
    const { id: programId } = useParams(); // Get the program ID from the URL

    useEffect(() => {
        if (!id) return;
        const hash = window?.location?.hash;
        if (hash !== `#${id}`) return;

        const scrollTo = () => {
            const elementId = hash.substring(1);
            const targetElement = document.getElementById(elementId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        };
        const timeout = setTimeout(scrollTo, 100);

        return () => clearTimeout(timeout);
    }, [id]);

    return (
        <Card id={id}>
            <Card.Header className="d-flex justify-content-between">
                <Card.Title>
                    <BackpackFill color="#0c6ffd" style={{ margin: "4px" }} />
                    {title}
                </Card.Title>
                <div>
                    <SubjectButton
                        operation="C"
                        subject={{
                            name: "Nový předmět",
                            nameEn: "New subject",
                            programId: programId, // Use the program ID from the URL
                            groupId: "119086b2-d24d-43fe-89f3-d5365e5ad7e7",
                            description: "",
                            descriptionEn: "",
                        }}
                    >
                        Insert Subject
                    </SubjectButton>
                </div>
            </Card.Header>
            <Card.Body>{children}</Card.Body>
        </Card>
    );
};