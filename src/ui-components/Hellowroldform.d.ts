/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { CheckboxFieldProps, GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HellowroldformInputValues = {
    Field0?: boolean;
};
export declare type HellowroldformValidationValues = {
    Field0?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HellowroldformOverridesProps = {
    HellowroldformGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<CheckboxFieldProps>;
} & EscapeHatchProps;
export declare type HellowroldformProps = React.PropsWithChildren<{
    overrides?: HellowroldformOverridesProps | undefined | null;
} & {
    onSubmit: (fields: HellowroldformInputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: HellowroldformInputValues) => HellowroldformInputValues;
    onValidate?: HellowroldformValidationValues;
} & React.CSSProperties>;
export default function Hellowroldform(props: HellowroldformProps): React.ReactElement;
