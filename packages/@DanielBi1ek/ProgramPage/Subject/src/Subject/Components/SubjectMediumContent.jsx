import {SubjectVectorsAttribute} from "../Vectors";
import {Link} from "react-router-dom";

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
export const SubjectMediumContent = ({ subjects }) => {
    // If no subjects, render nothing
    if (!subjects || subjects.length === 0) return null;
    // Render a list of subject links
    return (
        <div className="subject-medium-content">
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>
                        <Link to={`/subject/subject/view/${subject.id}`}>
                            {subject.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};