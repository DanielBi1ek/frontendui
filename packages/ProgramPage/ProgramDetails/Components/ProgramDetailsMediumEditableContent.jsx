import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an program entity.
 *
 * This component renders a label "ProgramDetailsMediumContent" followed by a serialized representation of the `program` object
 * and any additional child content. It is designed to handle and display information about an program entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramDetailsMediumContent component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {string|number} props.program.id - The unique identifier for the program entity.
 * @param {string} props.program.name - The name or label of the program entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `program` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramDetailsMediumContent program={programEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramDetailsMediumContent>
 */


export const ProgramDetailsMediumEditableContent = ({ subject, onChange = () => {}, onBlur = () => {}, children }) => {
    return (
        <>
            <Input id="name" label="Název" className="form-control" defaultValue={subject?.name || ""} onChange={onChange} onBlur={onBlur} />
            <Input id="nameEn" label="Anglický název" className="form-control" defaultValue={subject?.nameEn || ""} onChange={onChange} onBlur={onBlur} />
            <Input id="description" label="Popis" className="form-control" defaultValue={subject?.description|| "Popis"} onChange={onChange} onBlur={onBlur} />
            <Input id="description_en" label="Anglický popis" className="form-control" defaultValue={subject?.descriptionEn|| "Anglický popis"} onChange={onChange} onBlur={onBlur} />

            {children}
        </>
    );
};
