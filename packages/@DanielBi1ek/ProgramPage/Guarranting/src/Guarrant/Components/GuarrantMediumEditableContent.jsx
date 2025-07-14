import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for confirming the addition or removal of a guarantor in a program.
 *
 * This component displays a confirmation message for either adding or removing a guarantor,
 * depending on the `operation` prop. It renders the guarantor's name and any additional children,
 * such as action buttons.
 *
 * @component
 * @param {Object} props - The properties for the GuarrantMediumEditableContent component.
 * @param {Object} props.guarant - The guarantor entity (with `name` and `surname`).
 * @param {string} [props.operation="C"] - The operation type: "C" for create/insert, "D" for delete.
 * @param {function} [props.onChange] - Handler for change events (unused here).
 * @param {function} [props.onBlur] - Handler for blur events (unused here).
 * @param {React.ReactNode} [props.children=null] - Additional content to render (e.g., action buttons).
 *
 * @returns {JSX.Element} A confirmation UI for adding or removing a guarantor.
 *
 * @example
 * <GuarrantMediumEditableContent
 *   guarant={{ name: "John", surname: "Doe" }}
 *   operation="D"
 * >
 *   <button>Confirm</button>
 * </GuarrantMediumEditableContent>
 */
const uuid = () => crypto.randomUUID();

export const GuarrantMediumEditableContent = ({
                                                  guarant,
                                                  operation = "C", // "C" for create/insert, "D" for delete
                                                  onChange = (e) => null,
                                                  onBlur = (e) => null,
                                                  children
                                              }) => {
    // Render confirmation for delete operation
    if (operation === "D") {
        return (
            <>
                <div>
                    Are you sure you want to remove this guarantor from the program?
                </div>
                <div style={{ margin: "1rem 0", fontWeight: "bold" }}>
                    {guarant?.name} {guarant?.surname}
                </div>
                {children}
            </>
        );
    }
    // Default: confirmation for insert operation
    return (
        <>
            <div>
                Do you want to add this guarantor to the program?
            </div>
            <div style={{ margin: "1rem 0", fontWeight: "bold" }}>
                {guarant?.name} {guarant?.surname}
            </div>
            {children}
        </>
    );
};