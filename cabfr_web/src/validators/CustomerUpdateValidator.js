import { useState } from "react";
import { stringValidator, emailValidator, phoneValidator } from "./validators";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useCustomerUpdateFormValidator = form => {
    const [errors, setErrors] = useState({
        customerName: {
            dirty: false,
            error: false,
            message: ""
        },
        email: {
            dirty: false,
            error: false,
            message: ""
        },
        phone: {
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

        const { customerName, email, phone } = form;

        if (nextErrors.customerName.dirty && (field ? field === "customerName" : true)) {
            const customerNameMessage = stringValidator(customerName, form);
            nextErrors.customerName.error = !!customerNameMessage;
            nextErrors.customerName.message = customerNameMessage;
            if (!! customerNameMessage) isValid = false;
        }

        if (nextErrors.email.dirty && (field ? field === "email" : true)) {
            const emailMessage = emailValidator(email, form);
            nextErrors.email.error = !!emailMessage;
            nextErrors.email.message = emailMessage;
            if (!!emailMessage) isValid = false;
        }

        if (nextErrors.phone.dirty && (field ? field === "phone" : true)) {
            const phoneMessage = phoneValidator(phone, form);
            nextErrors.phone.error = !!phoneMessage;
            nextErrors.phone.message = phoneMessage;
            if (!!phoneMessage) isValid = false;
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