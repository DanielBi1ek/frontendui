import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertProgramsectionButton } from "./CUDButtons/InsertProgramsectionButton";
// import { UpdateProgramsectionButton } from "./CUDButtons/UpdateProgramsectionButton";
// import { DeleteProgramsectionButton } from "./CUDButtons/DeleteProgramsectionButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * ProgramsectionCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertProgramsectionButton` for creating a new item (operation "C")
 * - `UpdateProgramsectionButton` for updating an existing item (operation "U")
 * - `DeleteProgramsectionButton` for deleting an existing item (operation "D")
 *
 * This component validates the `programsection` prop:
 * - For "C" (create), `programsection` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `programsection` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `programsection` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the ProgramsectionCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.programsection - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.programsection.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.programsection.name] - The name of the item (optional).
 * @param {string} [props.programsection.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(programsection) => {}] - Callback executed after the operation completes. Receives the `programsection` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <ProgramsectionCUDButton
 *         operation="C"
 *         programsection={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </ProgramsectionCUDButton>
 *
 *       <ProgramsectionCUDButton
 *         operation="U"
 *         programsection={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </ProgramsectionCUDButton>
 *
 *       <ProgramsectionCUDButton
 *         operation="D"
 *         programsection={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </ProgramsectionCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const ProgramsectionButton = ({ operation, children, programsection, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: ProgramsectionInsertAsyncAction,
            dialogTitle: "Vložit novou programsection",
            loadingMsg: "Vkládám novou programsection",
            renderContent: () => <ProgramsectionMediumEditableContent programsection={programsection} />,
        },
        U: {
            asyncAction: ProgramsectionUpdateAsyncAction,
            dialogTitle: "Upravit programsection",
            loadingMsg: "Ukládám programsection",
            renderContent: () => <ProgramsectionMediumEditableContent programsection={programsection} />,
        },
        D: {
            asyncAction: ProgramsectionDeleteAsyncAction,
            dialogTitle: "Chcete odebrat programsection?",
            loadingMsg: "Odstraňuji programsection",
            renderContent: () => (
                <h2>
                    {programsection?.name} ({programsection?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, programsection, { deferred: true });
    const handleClick = async (params = {}) => {
        const fetchParams = { ...programsection, ...params };
        const freshProgramsection = await fetch(fetchParams);
        onDone(freshProgramsection); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !programsection?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'programsection' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={programsection}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// ProgramsectionCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     programsection: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `programsection` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// ProgramsectionCUDButton.defaultProps = {
//     onDone: () => {},
// };