import {useEffect, useState} from "react"
import { BackpackFill, PencilFill, TrashFill, Gear} from "react-bootstrap-icons";
import { ProgramButton } from "../Components"
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {useAsyncAction} from "@hrbolek/uoisfrontend-gql-shared";
import {GroupInsertAsyncAction} from "../Queries/GroupInsertAsycnAction";


const uuid = () => crypto.randomUUID();


export const ButtonCardCapsule = ({title="", children=null, id=null, program, isEditable}) => {
    const { fetch: insertGroup, loading: groupLoading, error: groupError } = useAsyncAction(GroupInsertAsyncAction, {}, { deferred: true });
    const [createdGroupId, setCreatedGroupId] = useState(null);
    useEffect(() => {
        if (!id) return
        const hash = window?.location?.hash; // Get the hash from the URL
        // console.log("CardCapsule", hash, id, (hash !== `#${id}`))
        if (hash !== `#${id}`) return

        const scrollTo = () => {
            const elementId = hash.substring(1); // Remove the '#' to get the ID
            const targetElement = document.getElementById(elementId);

            if (targetElement) {
                // Scroll to the element if it exists
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        const timeout = setTimeout(scrollTo, 100);

        return () => clearTimeout(timeout);
    }, [id]); // Run only once when the component mounts

    const handleInsertGroupAndProgram = async () => {
        // 1. Insert group
        const groupParams = {
            id: uuid(),
            name: "Garance programu",
            grouptypeId: "b1bedec8-931f-11ed-9b95-0242ac110002"
        };
        try {
            const groupResult = await insertGroup(groupParams);
            const newGroupId = groupResult?.id;
            setCreatedGroupId(newGroupId);
            // 2. Optionally, trigger program insert here or let ProgramButton use this id
        } catch (e) {
            // handle error if needed
        }
    };

    return (
        <Card id={id}>
            <Card.Header className="d-flex justify-content-between">
                <Card.Title>
                    <BackpackFill color= "#0c6ffd" style={{margin:"4px"}}/>
                    {title}
                </Card.Title>
                {isEditable && (
                <div>
                <ProgramButton
                    operation="U"
                    program={program}>
                    <button className="btn btn-sm btn-warning" style={{width: "130px", margin:"1px"}}>
                        <Gear style={{margin:"4px"}}/>Edit Program
                    </button>
                </ProgramButton>
                <ProgramButton
                    operation="C"
                    program={{name: "New Program", name_en: "New Program EN", groupId: createdGroupId}}

                >


                    <button
                        className="btn btn-sm btn-primary"
                        style={{ width: "145px", margin: "1px" }}
                        onClick={handleInsertGroupAndProgram}
                        disabled={groupLoading}
                    >
                        <PencilFill style={{ margin: "4px" }} />Insert Group
                    </button>
                </ProgramButton>
                <ProgramButton
                    operation="D"
                    program={program} // Ensure the 'id' key is included
                    >
                    <button className="btn btn-sm btn-danger" style={{width: "145px", margin:"1px"}}>
                        <TrashFill style={{margin:"4px"}}/>Delete Program
                    </button>
                </ProgramButton>

                </div>)}
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    )

    };


