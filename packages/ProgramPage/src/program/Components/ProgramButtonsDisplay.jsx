import {useEffect, useState} from "react"
import {BackpackFill} from "react-bootstrap-icons";
import { ProgramButton } from "../Components"
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";


export const ButtonCardCapsule = ({title="", children=null, id=null, program}) => {
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

    return (
        <Card id={id}>
            <Card.Header className="d-flex justify-content-between">
                <Card.Title>
                    <BackpackFill color= "#0c6ffd" style={{margin:"4px"}}/>
                    {title}
                </Card.Title>
                <div>
                <ProgramButton
                    operation="U"
                    program={program}>
                    <button className="btn btn-sm btn-warning" style={{width: "115px", margin:"1px"}}>
                        Edit Program
                    </button>
                </ProgramButton>
                <ProgramButton
                    operation="C"
                    program={{name: "New Program", name_en: "New Program EN" }}
                    >
                    <button className="btn btn-sm btn-primary" style={{width: "115px", margin:"1px"}}>
                        Insert Program
                    </button>
                </ProgramButton>
                <ProgramButton
                    operation="D"
                    program={program} // Ensure the 'id' key is included
                    >
                    <button className="btn btn-sm btn-danger" style={{width: "115px", margin:"1px"}}>
                        Delete Program
                    </button>
                </ProgramButton>

                </div>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    )
}


