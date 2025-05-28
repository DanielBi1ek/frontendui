import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackpackFill, PencilFill, TrashFill, GearWideConnected} from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import { SubjectButton } from "../../../ProgramDetails/Components";

export const SubjectButtonCardCapsule = ({ title = "", children = null, id = null, isEditable }) => {
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
                {isEditable && (
                <div>
                    <SubjectButton
                        className="btn btn-sm btn-primary"
                        style={{width: "145px", margin:"1px"}}
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
                        <PencilFill style={{margin:"4px"}}/>Insert Subject
                    </SubjectButton>
                </div>)}
            </Card.Header>
            <Card.Body>{children}</Card.Body>
        </Card>
    );
};