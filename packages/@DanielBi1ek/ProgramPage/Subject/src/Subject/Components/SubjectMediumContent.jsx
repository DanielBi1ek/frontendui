import {SubjectVectorsAttribute} from "../Vectors";
import {Link} from "react-router-dom";
import {SubjectButton} from "./SubjectCUDButton";
import {Trash, JournalText} from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";

/**
 * A component that displays medium-level content for a subject entity.
 *
 * This component renders a list of subject links for the provided `subjects` array.
 * If no subjects are provided, nothing is rendered.
 *
 * @component
 * @param {Object} props - The properties for the SubjectMediumContent component.
 * @param {Array<Object>} props.subjects - The array of subject entities to display.
 * @returns {JSX.Element|null} A list of subject links or null if no subjects.
 *
 * @example
 * const subjects = [{ id: 1, name: "Math" }, { id: 2, name: "Physics" }];
 * <SubjectMediumContent subjects={subjects} />
 */
export const SubjectMediumContent = ({ subjects: initialSubjects, onSubjectDeleted, isEditable}) => {
    const [subjects, setSubjects] = useState(initialSubjects || []);

    useEffect(() => {
        setSubjects(initialSubjects || []);
    }, [initialSubjects]);

    // Handler for deletion
    const handleDelete = (deletedSubject) => {
        setSubjects(subjects.filter(s => s.id !== deletedSubject.id));
        if (onSubjectDeleted) onSubjectDeleted(deletedSubject);
    };

    if (!subjects || subjects.length === 0) return null;


    return (
        <div className="subject-medium-content">
            {subjects.map((subject) => (
                <Card key={subject.id} className="subject-card mb-3">
                    <div className="d-flex align-items-center">
                        <JournalText className="me-2 text-primary" />
                        <span className="d-inline-block min-vw-25 me-3 text-nowrap overflow-hidden text-truncate">
                            <Link
                                to={`/subject/subject/view/${subject.id}`}
                                className="text-decoration-none"
                            >
                                {subject.name}
                            </Link>
                        </span>
                        {isEditable && (
                            <SubjectButton
                                operation="D"
                                subject={subject}
                                onDone={() => handleDelete(subject)}
                                className="subject-delete-btn btn btn-link p-0 ms-auto text-danger"
                                title="Remove subject"
                                style={{width: "28px", height: "28px", fontSize: "1.2rem"}}
                            >
                                <Trash />
                            </SubjectButton>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};