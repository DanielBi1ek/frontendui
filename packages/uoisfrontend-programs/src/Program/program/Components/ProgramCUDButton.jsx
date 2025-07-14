import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramInsertAsyncAction, ProgramUpdateAsyncAction, ProgramDeleteAsyncAction } from "../Queries";
import { ProgramMediumEditableContent } from "./ProgramMediumEditableContent";
import { PencilFill, TrashFill, Gear } from "react-bootstrap-icons";

export const ProgramButton = ({ operation, program, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: ProgramInsertAsyncAction,
            dialogTitle: "Vložit novou program",
            loadingMsg: "Vkládám novou program",
            renderContent: () => <ProgramMediumEditableContent program={program} />,
            button: (
                <button className="btn btn-sm btn-primary" style={{ width: "145px", margin: "1px" }}>
                    <PencilFill style={{ margin: "4px" }} />Insert Program
                </button>
            ),
        },
        U: {
            asyncAction: ProgramUpdateAsyncAction,
            dialogTitle: "Upravit program",
            loadingMsg: "Ukládám program",
            renderContent: () => <ProgramMediumEditableContent program={program} />,
            button: (
                <button className="btn btn-sm btn-warning" style={{ width: "130px", margin: "1px" }}>
                    <Gear style={{ margin: "4px" }} />Edit Program
                </button>
            ),
        },
        D: {
            asyncAction: ProgramDeleteAsyncAction,
            dialogTitle: "Chcete odebrat program?",
            loadingMsg: "Odstraňuji program",
            renderContent: () => (
                <h2>
                    {program?.name} ({program?.name_en})
                </h2>
            ),
            button: (
                <button className="btn btn-sm btn-danger" style={{ width: "145px", margin: "1px" }}>
                    <TrashFill style={{ margin: "4px" }} />Delete Program
                </button>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent, button } = operationConfig[operation];
    const { error, loading, fetch } = useAsyncAction(asyncAction, program, { deferred: true });

    const handleClick = async (params = {}) => {
        const fetchParams = {
            ...program,
            ...params,
            ...(operation === "U" && {
                lastchange: program?.lastchange || new Date().toISOString()
            }),
            ...(operation === "D" && {
                id: program?.id,
                lastchange: program?.lastchange
            }),
        };
        try {
            const result = await fetch(fetchParams);
            onDone(result);
        } catch (error) {
            // error handled below
        }
    };

    if ((operation === 'U' || operation === 'D') && !program?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'program' must include an 'id' key.`} />;
    }

    return (
        <>
            {error && <ErrorHandler errors={error} />}
            {loading && <LoadingSpinner text={loadingMsg} />}
            <ButtonWithDialog
                buttonLabel={button}
                dialogTitle={dialogTitle}
                {...props}
                params={program}
                onClick={handleClick}
            >
                {renderContent()}
            </ButtonWithDialog>
        </>
    );
};