import * as React from "react";
import { ErrorsTemplate } from "@simplr/react-forms-dom";

export const ErrorTemplate: ErrorsTemplate = (fieldErrors, formError, formStore) => {
    const errors = fieldErrors
        .map((value, key) => <div className="error-item" key={`error-key-${key}`}>{value!.Message}</div>)
        .toArray();

    return <div className="error-container">
        {errors}
    </div>;
};
