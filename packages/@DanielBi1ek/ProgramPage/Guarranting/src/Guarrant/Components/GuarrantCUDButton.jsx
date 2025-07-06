
import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertProgramButton } from "./CUDButtons/InsertProgramButton";
// import { UpdateProgramButton } from "./CUDButtons/UpdateProgramButton";
// import { DeleteProgramButton } from "./CUDButtons/DeleteProgramButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramInsertAsyncAction, ProgramUpdateAsyncAction, ProgramDeleteAsyncAction} from "../../../../Program/program/Queries";
import {ProgramMediumEditableContent} from "../../../../Program/program/Components/ProgramMediumEditableContent";
import {RoleInsertAsyncAction} from "../Queries/GuarrantInsertAsyncAction";
import {GuarrantMediumEditableContent} from "./GuarrantMediumEditableContent";
import {RoleDeleteAsyncAction} from "../Queries";
/**
 * ProgramCUDButton ComponentS
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertProgramButton` for creating a new item (operation "C")
 * - `UpdateProgramButton` for updating an existing item (operation "U")
 * - `DeleteProgramButton` for deleting an existing item (operation "D")
 *
 * This component validates the `program` prop:
 * - For "C" (create), `program` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `program` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `program` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the ProgramCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.program - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.program.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.program.name] - The name of the item (optional).
 * @param {string} [props.program.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(program) => {}] - Callback executed after the operation completes. Receives the `program` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <ProgramCUDButton
 *         operation="C"
 *         program={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </ProgramCUDButton>
 *
 *       <ProgramCUDButton
 *         operation="U"
 *         program={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </ProgramCUDButton>
 *
 *       <ProgramCUDButton
 *         operation="D"
 *         program={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </ProgramCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const GuarrantButton = ({ operation, children, guarant, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: RoleInsertAsyncAction,
            dialogTitle: "Vložit noveho garanta",
            loadingMsg: "Vkládám noveho garanta",
            renderContent: () => <GuarrantMediumEditableContent guarant={guarant} />,
        },
        D: {
            asyncAction: RoleDeleteAsyncAction,
            dialogTitle: "Smazat garanta",
            loadingMsg: "Mazání garanta",
            renderContent: () => <GuarrantMediumEditableContent guarant={guarant} operation="D" />,
        }
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C' or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];
    const { error, loading, fetch } = useAsyncAction(asyncAction, guarant, { deferred: true });

    const handleClick = async () => {
        try {
            // Log the variables used for deletion
            console.log("Deleting role with:", {
                id: guarant.id,
                lastchange: guarant.lastchange,
                name: guarant.name,
                surname: guarant.surname
            });
            const result = await fetch(guarant);
            onDone(result);
        } catch (error) {
            // Error is handled by ErrorHandler
        }
    };

    return (
        <>
            <ButtonWithDialog
                buttonLabel={children}
                dialogTitle={dialogTitle}
                {...props}
                params={guarant}
                onClick={handleClick}
            >
                {error && <ErrorHandler errors={error} />}
                {loading && <LoadingSpinner text={loadingMsg} />}
                {renderContent()}
            </ButtonWithDialog>
        </>
    );
};
// // Prop validation using PropTypes
// ProgramCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     program: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `program` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// ProgramCUDButton.defaultProps = {
//     onDone: () => {},
// };
