/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function Jsonform(props) {
  const { onSubmit, onCancel, onValidate, onChange, overrides, ...rest } =
    props;
  const initialValues = {
    basics: {},
    favoriteThings: {},
    active: false,
    enabled: false,
  };
  const [basics, setBasics] = React.useState(initialValues.basics);
  const [favoriteThings, setFavoriteThings] = React.useState(
    initialValues.favoriteThings
  );
  const [active, setActive] = React.useState(initialValues.active);
  const [enabled, setEnabled] = React.useState(initialValues.enabled);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBasics(initialValues.basics);
    setFavoriteThings(initialValues.favoriteThings);
    setCurrentFavoriteThingsValue("");
    setActive(initialValues.active);
    setEnabled(initialValues.enabled);
    setErrors({});
  };
  const [
    currentFavoriteThingsAnimalsValue,
    setCurrentFavoriteThingsAnimalsValue,
  ] = React.useState("");
  const favoriteThingsAnimalsRef = React.createRef();
  const validations = {
    "basics.firstName": [],
    "basics.emailAddress": [{ type: "Email" }],
    "favoriteThings.animals": [],
    "favoriteThings.month": [],
    "favoriteThings.number": [],
    active: [],
    enabled: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        const modelFields = {
          basics,
          favoriteThings,
          active,
          enabled,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        await onSubmit(modelFields);
      }}
      {...getOverrideProps(overrides, "Jsonform")}
      {...rest}
    >
      <Heading
        level={3}
        children="Basics"
        {...getOverrideProps(overrides, "basics")}
      ></Heading>
      <TextField
        label="First name"
        value={basics["firstName"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              basics: { ...basics, firstName: value },
              favoriteThings,
              active,
              enabled,
            };
            const result = onChange(modelFields);
            value = result?.basics?.firstName ?? value;
          }
          if (errors["basics.firstName"]?.hasError) {
            runValidationTasks("basics.firstName", value);
          }
          setBasics({ ...basics, firstName: value });
        }}
        onBlur={() =>
          runValidationTasks("basics.firstName", basics["firstName"])
        }
        errorMessage={errors["basics.firstName"]?.errorMessage}
        hasError={errors["basics.firstName"]?.hasError}
        {...getOverrideProps(overrides, "basics.firstName")}
      ></TextField>
      <TextField
        label="Email address"
        value={basics["emailAddress"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              basics: { ...basics, emailAddress: value },
              favoriteThings,
              active,
              enabled,
            };
            const result = onChange(modelFields);
            value = result?.basics?.emailAddress ?? value;
          }
          if (errors["basics.emailAddress"]?.hasError) {
            runValidationTasks("basics.emailAddress", value);
          }
          setBasics({ ...basics, emailAddress: value });
        }}
        onBlur={() =>
          runValidationTasks("basics.emailAddress", basics["emailAddress"])
        }
        errorMessage={errors["basics.emailAddress"]?.errorMessage}
        hasError={errors["basics.emailAddress"]?.hasError}
        {...getOverrideProps(overrides, "basics.emailAddress")}
      ></TextField>
      <Heading
        level={3}
        children="Favorite things"
        {...getOverrideProps(overrides, "favoriteThings")}
      ></Heading>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              basics,
              favoriteThings: { ...favoriteThings, animals: values },
              active,
              enabled,
            };
            const result = onChange(modelFields);
            values = result?.favoriteThings?.animals ?? values;
          }
          setFavoriteThings({ ...favoriteThings, animals: values });
          setCurrentFavoriteThingsAnimalsValue("");
        }}
        currentFieldValue={currentFavoriteThingsAnimalsValue}
        label={"Animals"}
        items={favoriteThings.animals ?? []}
        hasError={errors?.["favoriteThings.animals"]?.hasError}
        setFieldValue={setCurrentFavoriteThingsAnimalsValue}
        inputFieldRef={favoriteThingsAnimalsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Animals"
          value={favoriteThings["animals"]}
          onChange={(e) => {
            let { value } = e.target;
            if (errors["favoriteThings.animals"]?.hasError) {
              runValidationTasks("favoriteThings.animals", value);
            }
            setCurrentFavoriteThingsAnimalsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "favoriteThings.animals",
              currentFavoriteThingsAnimalsValue
            )
          }
          errorMessage={errors["favoriteThings.animals"]?.errorMessage}
          hasError={errors["favoriteThings.animals"]?.hasError}
          ref={favoriteThingsAnimalsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "favoriteThings.animals")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Month"
        value={favoriteThings["month"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              basics,
              favoriteThings: { ...favoriteThings, month: value },
              active,
              enabled,
            };
            const result = onChange(modelFields);
            value = result?.favoriteThings?.month ?? value;
          }
          if (errors["favoriteThings.month"]?.hasError) {
            runValidationTasks("favoriteThings.month", value);
          }
          setFavoriteThings({ ...favoriteThings, month: value });
        }}
        onBlur={() =>
          runValidationTasks("favoriteThings.month", favoriteThings["month"])
        }
        errorMessage={errors["favoriteThings.month"]?.errorMessage}
        hasError={errors["favoriteThings.month"]?.hasError}
        {...getOverrideProps(overrides, "favoriteThings.month")}
      ></TextField>
      <TextField
        label="Number"
        type="number"
        step="any"
        value={favoriteThings["number"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              basics,
              favoriteThings: { ...favoriteThings, number: value },
              active,
              enabled,
            };
            const result = onChange(modelFields);
            value = result?.favoriteThings?.number ?? value;
          }
          if (errors["favoriteThings.number"]?.hasError) {
            runValidationTasks("favoriteThings.number", value);
          }
          setFavoriteThings({ ...favoriteThings, number: value });
        }}
        onBlur={() =>
          runValidationTasks("favoriteThings.number", favoriteThings["number"])
        }
        errorMessage={errors["favoriteThings.number"]?.errorMessage}
        hasError={errors["favoriteThings.number"]?.hasError}
        {...getOverrideProps(overrides, "favoriteThings.number")}
      ></TextField>
      <Divider
        orientation="horizontal"
        {...getOverrideProps(overrides, "activeSectionalElement")}
      ></Divider>
      <SwitchField
        label="Active"
        defaultChecked={false}
        isChecked={active}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              basics,
              favoriteThings,
              active: value,
              enabled,
            };
            const result = onChange(modelFields);
            value = result?.active ?? value;
          }
          if (errors.active?.hasError) {
            runValidationTasks("active", value);
          }
          setActive(value);
        }}
        onBlur={() => runValidationTasks("active", active)}
        errorMessage={errors.active?.errorMessage}
        hasError={errors.active?.hasError}
        {...getOverrideProps(overrides, "active")}
      ></SwitchField>
      <SwitchField
        label="Enabled"
        defaultChecked={false}
        isChecked={enabled}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              basics,
              favoriteThings,
              active,
              enabled: value,
            };
            const result = onChange(modelFields);
            value = result?.enabled ?? value;
          }
          if (errors.enabled?.hasError) {
            runValidationTasks("enabled", value);
          }
          setEnabled(value);
        }}
        onBlur={() => runValidationTasks("enabled", enabled)}
        errorMessage={errors.enabled?.errorMessage}
        hasError={errors.enabled?.hasError}
        {...getOverrideProps(overrides, "enabled")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
