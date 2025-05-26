import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an programsection entity.
 *
 * This component renders a label "ProgramsectionMediumContent" followed by a serialized representation of the `programsection` object
 * and any additional child content. It is designed to handle and display information about an programsection entity object.
 *
 * @component
 * @param {Object} props - The properties for the ProgramsectionMediumContent component.
 * @param {Object} props.programsection - The object representing the programsection entity.
 * @param {string|number} props.programsection.id - The unique identifier for the programsection entity.
 * @param {string} props.programsection.name - The name or label of the programsection entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `programsection` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const programsectionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ProgramsectionMediumContent programsection={programsectionEntity}>
 *   <p>Additional information about the entity.</p>
 * </ProgramsectionMediumContent>
 */
export const ProgramsectionMediumEditableContent = ({programsection, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={programsection?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={programsection?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
