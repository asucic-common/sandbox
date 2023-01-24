/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { DividerProps, GridProps, HeadingProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JsonformInputValues = {
    active?: boolean;
    enabled?: boolean;
    basics?: {
        firstName?: string;
        emailAddress?: string;
    };
    favoriteThings?: {
        animals?: string[];
        month?: string;
        number?: string;
    };
};
export declare type JsonformValidationValues = {
    active?: ValidationFunction<boolean>;
    enabled?: ValidationFunction<boolean>;
    basics?: {
        firstName?: ValidationFunction<string>;
        emailAddress?: ValidationFunction<string>;
    };
    favoriteThings?: {
        animals?: ValidationFunction<string>;
        month?: ValidationFunction<string>;
        number?: ValidationFunction<string>;
    };
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JsonformOverridesProps = {
    JsonformGrid?: PrimitiveOverrideProps<GridProps>;
    basics?: PrimitiveOverrideProps<HeadingProps>;
    "basics.firstName"?: PrimitiveOverrideProps<TextFieldProps>;
    "basics.emailAddress"?: PrimitiveOverrideProps<TextFieldProps>;
    favoriteThings?: PrimitiveOverrideProps<HeadingProps>;
    "favoriteThings.animals"?: PrimitiveOverrideProps<TextFieldProps>;
    "favoriteThings.month"?: PrimitiveOverrideProps<TextFieldProps>;
    "favoriteThings.number"?: PrimitiveOverrideProps<TextFieldProps>;
    activeSectionalElement?: PrimitiveOverrideProps<DividerProps>;
    active?: PrimitiveOverrideProps<SwitchFieldProps>;
    enabled?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type JsonformProps = React.PropsWithChildren<{
    overrides?: JsonformOverridesProps | undefined | null;
} & {
    onSubmit: (fields: JsonformInputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: JsonformInputValues) => JsonformInputValues;
    onValidate?: JsonformValidationValues;
} & React.CSSProperties>;
export default function Jsonform(props: JsonformProps): React.ReactElement;
