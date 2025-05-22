import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertGuarantButton } from "./CUDButtons/InsertGuarantButton";
// import { UpdateGuarantButton } from "./CUDButtons/UpdateGuarantButton";
// import { DeleteGuarantButton } from "./CUDButtons/DeleteGuarantButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import {GuarantDeleteAsyncAction, GuarantInsertAsyncAction, GuarantUpdateAsyncAction} from "../Queries";

/**
 * GuarantCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertGuarantButton` for creating a new item (operation "C")
 * - `UpdateGuarantButton` for updating an existing item (operation "U")
 * - `DeleteGuarantButton` for deleting an existing item (operation "D")
 *
 * This component validates the `guarant` prop:
 * - For "C" (create), `guarant` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `guarant` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `guarant` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the GuarantCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.guarant - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.guarant.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.guarant.name] - The name of the item (optional).
 * @param {string} [props.guarant.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(guarant) => {}] - Callback executed after the operation completes. Receives the `guarant` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <GuarantCUDButton
 *         operation="C"
 *         guarant={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </GuarantCUDButton>
 *
 *       <GuarantCUDButton
 *         operation="U"
 *         guarant={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </GuarantCUDButton>
 *
 *       <GuarantCUDButton
 *         operation="D"
 *         guarant={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </GuarantCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const GuarantButton = ({ operation, children, guarant, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: GuarantInsertAsyncAction,
            dialogTitle: "Vložit novou guarant",
            loadingMsg: "Vkládám novou guarant",
            renderContent: () => <GuarantMediumEditableContent guarant={guarant} />,
        },
        U: {
            asyncAction: GuarantUpdateAsyncAction,
            dialogTitle: "Upravit guarant",
            loadingMsg: "Ukládám guarant",
            renderContent: () => <GuarantMediumEditableContent guarant={guarant} />,
        },
        D: {
            asyncAction: GuarantDeleteAsyncAction,
            dialogTitle: "Chcete odebrat guarant?",
            loadingMsg: "Odstraňuji guarant",
            renderContent: () => (
                <h2>

                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];
const user = "51d101a0-81f1-44ca-8366-6cf51432e8d6"
    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, guarant, { deferred: true });
    const handleClick = async () => {
        const fetchParams = {
            id: guarant.id,
            lastchange: guarant.lastchange,
            groupId: staticGroupId,
        };
        const updatedUser = await fetch(fetchParams);
        onDone(updatedUser); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !guarant?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'guarant' must include an 'id' key.`} />;
    }
    if (!user?.id) {
        return <ErrorHandler errors="User ID is required to add to the guarant group." />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel="Add to Guarant Group"
            dialogTitle="Confirm Add to Guarant Group"
            {...props}
            params={guarant}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// GuarantCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     guarant: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `guarant` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// GuarantCUDButton.defaultProps = {
//     onDone: () => {},
// };