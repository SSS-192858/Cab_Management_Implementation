import { useState } from "react";
import { stringValidator} from "./validators";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const RequestBookValidator = form => {
    const [errors, setErrors] = useState({
        startDate: {
            dirty: false,
            error: false,
            message: "",
        },
        endDate: {
            dirty: false,
            error: false,
            message: "",
        }
    });

    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        var nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { startDate,endDate } = form;

        if (nextErrors.startDate.dirty && (field ? field === "startDate" : true)) {
            const message = stringValidator(startDate, form);
            nextErrors.startDate.error = !!message;
            nextErrors.startDate.message = message;
            if (!!message) isValid = false;
        }

        if (nextErrors.endDate.dirty && (field ? field === "endDate" : true)) {
            const Message = stringValidator(endDate, form);
            nextErrors.endDate.error = !!Message;
            nextErrors.endDate.message = Message;
            if (!!Message) isValid = false;
        }
        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    return {
        validateForm,
        errors,
    };
};