import { ProgramMediumCard } from "./ProgramMediumCard";

const SubjectsList = ({ subjects }) => {
    if (!subjects || subjects.length === 0) {
        return <p>No subjects available.</p>;
    }

    return (
        <div>
            {subjects.map((subject) => (
                <ProgramMediumCard key={subject.id} program={subject} />
            ))}
        </div>
    );
};



export const SubjectList = ({ subjects }) => {
    if (!subjects || subjects.length === 0) {
        return <p>No subjects available.</p>;
    }

    return (
        <ul>
            {subjects.map((subject) => (
                <li key={subject.id}>{subject.name}</li>
            ))}
        </ul>
    );
};