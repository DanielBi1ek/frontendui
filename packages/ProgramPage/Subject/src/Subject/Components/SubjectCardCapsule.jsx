import {CardCapsule} from "@hrbolek/uoisfrontend-shared"
import {BackpackFill, PencilFill, PersonFill} from "react-bootstrap-icons"
import {SubjectLink} from "./SubjectLink"
import {SubjectButton} from "./SubjectCUDButton";

/**
 * A specialized card component that displays an `SubjectLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and
 * an `SubjectLink` component in the card's header. The `children` prop is used to render any content
 * inside the card body. It is designed for use with entities represented by the `subject` object.
 *
 * @component
 * @param {Object} props - The props for the SubjectCardCapsule component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The display name for the subject entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { SubjectCardCapsule } from './SubjectCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const subjectEntity = { id: 123, name: "Example Entity" };
 *
 * <SubjectCardCapsule subject={subjectEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </SubjectCardCapsule>
 */

export const SubjectCardCapsule = ({
                                       subject,
                                       children,
                                       isEditable,
                                       title = (

                                           <div className="d-flex justify-content-between align-items-center"
                                                style={{width: "100%"}}>
                                        <span style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                                        <BackpackFill color="#0c6ffd"/>
                                           <span style={{
                                               color: "#0c6ffd",
                                               fontWeight: 600,
                                               fontSize: "1.1rem",
                                               letterSpacing: "0.5px",
                                               padding: "2px 8px",
                                               borderRadius: "4px",
                                               background: "rgba(12,111,253,0.08)"
                                           }}>
                                               Předměty:
                                            </span>
                                        <SubjectLink subject={subject}/>
                                        </span>
                                               {isEditable && (
                                                   <div>
                                                       <SubjectButton
                                                           className="btn btn-sm btn-primary"
                                                           style={{width: "145px", margin: "1px"}}
                                                           operation="C"
                                                           subject={{
                                                               name: "Nový předmět",
                                                               nameEn: "New subject",
                                                               programId: subject?.programId,
                                                               groupId: "119086b2-d24d-43fe-89f3-d5365e5ad7e7",
                                                               description: "",
                                                               descriptionEn: "",
                                                           }}
                                                       >
                                                           <PencilFill style={{margin: "4px"}}/>Insert Subject
                                                       </SubjectButton>
                                                   </div>
                                               )}
                                           </div>
                                       )
                                   }) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
