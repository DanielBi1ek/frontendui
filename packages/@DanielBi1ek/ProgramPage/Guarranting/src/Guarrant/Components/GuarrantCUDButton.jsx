
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
 * A button component for creating or deleting a guarantor role with confirmation dialog.
 *
 * This component renders a button that opens a dialog for confirming the addition or removal
 * of a guarantor. It uses async actions for insertion or deletion, displays loading and error
 * states, and calls `onDone` after completion.
 *
 * @component
 * @param {Object} props - The props for the GuarrantButton component.
 * @param {"C"|"D"} props.operation - The operation type: "C" for create, "D" for delete.
 * @param {Object} props.guarant - The guarantor entity (with `id`, `name`, `surname`, etc.).
 * @param {Function} [props.onDone] - Callback executed after the operation completes.
 * @param {React.ReactNode} props.children - The button label or content.
 * @param {...Object} props - Additional props passed to the underlying button.
 *
 * @returns {JSX.Element} The button with confirmation dialog for the specified operation.
 *
 * @example
 * <GuarrantButton
 *   operation="C"
 *   guarant={{ id: "1", name: "John", surname: "Doe" }}
 *   onDone={() => alert("Added!")}
 * >
 *   Add Guarantor
 * </GuarrantButton>
 */
export const GuarrantButton = ({ operation, children, guarant, onDone = () => {}, ...props }) => {
    // Configuration for each operation type
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

    // Show error if operation is invalid
    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C' or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];
    const { error, loading, fetch } = useAsyncAction(asyncAction, guarant, { deferred: true });

    // Handle button click: perform async action and call onDone
    const handleClick = async () => {
        try {
            const result = await fetch(guarant);
            onDone(result);
        } catch (error) {
            // Error is handled by ErrorHandler
        }
    };

    return (
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={guarant}
            onClick={handleClick}
        >
            {/* Show error or loading state inside dialog */}
            {error && <ErrorHandler errors={error} />}
            {loading && <LoadingSpinner text={loadingMsg} />}
            {renderContent()}
        </ButtonWithDialog>
    );
};