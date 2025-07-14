import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for editing medium-level content of a subject entity.
 *
 * This component renders input fields for the subject's name and English name,
 * and any additional children (e.g., action buttons). It is used for editing or creating a subject.
 *
 * @component
 * @param {Object} props - The properties for the SubjectMediumEditableContent component.
 * @param {Object} props.subject - The subject entity to edit.
 * @param {string|number} props.subject.id - The unique identifier for the subject entity.
 * @param {string} props.subject.name - The name of the subject.
 * @param {string} [props.subject.name_en] - The English name of the subject.
 * @param {function} [props.onChange] - Handler for change events on the input fields.
 * @param {function} [props.onBlur] - Handler for blur events on the input fields.
 * @param {React.ReactNode} [props.children=null] - Additional content to render (e.g., action buttons).
 *
 * @returns {JSX.Element} Editable fields for the subject's name and English name, plus optional children.
 *
 * @example
 * <SubjectMediumEditableContent
 *   subject={{ name: "Math", name_en: "Mathematics" }}
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 * >
 *   <button>Save</button>
 * </SubjectMediumEditableContent>
 */
export const SubjectMediumEditableContent = ({
                                                 subject,
                                                 onChange = (e) => null,
                                                 onBlur = (e) => null,
                                                 children
                                             }) => {
    // Render input fields for subject name and English name
    return (
        <>
            <Input
                id={"name"}
                label={"Název"}
                className="form-control"
                defaultValue={subject?.name || "Název"}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                id={"name_en"}
                label={"Anglický název"}
                className="form-control"
                defaultValue={subject?.name_en || "Anglický název"}
                onChange={onChange}
                onBlur={onBlur}
            />
            {children}
        </>
    )
}