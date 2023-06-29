import { useState } from "react";
import {stringValidator} from "./validators";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useCabSaveValidator = form => {
    const [errors, setErrors] = useState({
        reg_no: {
            dirty: false,
            error: false,
            message: "",
        },
        model: {
            dirty: false,
            error: false,
            message: "",
        },
        colour: {
            dirty: false,
            error: false,
            message: ""
        },
        fare: {
            dirty: false,
            error: false,
            message: ""
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

        const {reg_no,model,colour,fare} = form;

        if (nextErrors.reg_no.dirty && (field ? field === "reg_no" : true)) {
            const message = stringValidator(reg_no, form);
            nextErrors.reg_no.error = !!message;
            nextErrors.reg_no.message = message;
            if (!!message) isValid = false;
        }

        if (nextErrors.model.dirty && (field ? field === "model" : true)) {
            const modelMessage = stringValidator(model, form);
            nextErrors.model.error = !!modelMessage;
            nextErrors.model.message = modelMessage;
            if (!!modelMessage) isValid = false;
        }

        if (nextErrors.colour.dirty && (field ? field === "colour" : true)) {
            const colourMessage = stringValidator(colour, form);
            nextErrors.colour.error = !!colourMessage;
            nextErrors.colour.message = colourMessage;
            if (!!colourMessage) isValid = false;
        }

        if (nextErrors.fare.dirty && (field ? field === "fare" : true)) {
            const fareMessage = stringValidator(fare, form);
            nextErrors.fare.error = !!fareMessage;
            nextErrors.fare.message = fareMessage;
            if (!!fareMessage) isValid = false;
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