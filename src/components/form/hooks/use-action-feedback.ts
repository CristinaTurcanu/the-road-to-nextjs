import { useEffect, useRef } from "react";

import { ActionState } from "../utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
}
type UseActionFeedbackOptions = {
    onSuccess?: (onArgs: OnArgs) => void;
    onError?: (onArgs: OnArgs) => void;
}

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {
    const prevTimestamp = useRef(actionState.timestamp);
    const isUpdate = actionState.timestamp !== prevTimestamp.current;

    useEffect(() => {
        if (!isUpdate) return;
        
        if (actionState.status === "SUCCESS") {
            // Display the message in a toast or notification
            // This is a placeholder for your notification logic
            options.onSuccess?.({actionState});
        } 
        if (actionState.status === "ERROR") {
            // Display the error message in a toast or notification 
            options.onError?.({actionState});
        }

        // Update the previous timestamp to the current one
        prevTimestamp.current = actionState.timestamp;
    }, [actionState, options, isUpdate]);
}

export { useActionFeedback };