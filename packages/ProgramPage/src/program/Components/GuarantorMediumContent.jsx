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

export const GuarantMediumContent = ({ program }) => {
    const guarantors = Array.isArray(program.guarantors)
        ? program.guarantors
        : program.guarantors
            ? [program.guarantors]
            : [];

    return (
        <div className="program-medium-content">
            <div className="program-guarantors">
                <h5>Garanti programu:</h5>
                {guarantors.length > 0 ? (
                    guarantors.map((guarantor) => (
                        <div key={guarantor.id} className="guarantor-item">
                            {guarantor.roles && guarantor.roles.length > 0 ? (
                                guarantor.roles.map((role, idx) => (
                                    <span key={idx}>
                                        {role.user?.name}
                                        {role.user?.surname ? ` ${role.user.surname}` : ''}
                                    </span>
                                ))
                            ) : (
                                <span>Žádní garanti programu nejsou přiřazeni.</span>
                            )}
                        </div>
                    ))
                ) : (
                    <span>Žádní garanti programu nejsou přiřazeni.</span>
                )}
            </div>
        </div>
    );
};
