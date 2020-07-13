import React, { FC, ChangeEvent, useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import intl from "react-intl-universal";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import {
  Label,
  Error,
  Hint,
  FloatingLabel,
} from "@progress/kendo-react-labels";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       "& .MuiTextField-root": {
//         margin: theme.spacing(1),
//         width: "25ch",
//       },
//     },
//   })
// );

const LabelCommon = (fieldRenderProps) => {
  const { visited, label, id, valid, value, ...others } = fieldRenderProps;
  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid}>
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <Input value={value} valid={valid} id={id} {...others} />
      </div>
    </FieldWrapper>
  );
};

const Properties = observer(() => {
  // const classes = useStyles();
  const [value, setValue] = useState("Controlled");
  const { docInfo } = useStore();

  // called one time, when mount
  useEffect(() => {
    docInfo.getDocInfo().catch((e) => {
      toast.error("An error occurred");
    });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Form
      render={(formRenderProps) => (
        <FormElement horizontal={true} style={{ maxWidth: 650 }}>
          <fieldset className={"k-form-fieldset"}>
            <Field
              id={"FileName"}
              label={intl.get("label.FileName")}
              component={LabelCommon}
              value={docInfo.info.object_name}
            />
            <Field
              id={"Version"}
              label={intl.get("label.Version")}
              component={LabelCommon}
              value={docInfo.info.r_version_label}
            />
            <Field
              id={"FileSize"}
              label={intl.get("label.FileSize")}
              component={LabelCommon}
              value={docInfo.info.r_content_size}
            />
            <Field
              id={"Modifier"}
              label={intl.get("label.Modifier")}
              component={LabelCommon}
              value={`${docInfo.info.modifier_name} (${docInfo.info.modifier})`}
            />
            <Field
              id={"Created"}
              label={intl.get("label.Created")}
              component={LabelCommon}
              value={docInfo.info.object_name}
            />
            <Field
              id={"Creator"}
              label={intl.get("label.Creator")}
              component={LabelCommon}
              value={`${docInfo.info.producer_name} (${docInfo.info.producer})`}
            />
            <Field
              id={"Owner"}
              label={intl.get("label.Owner")}
              component={LabelCommon}
              value={`${docInfo.info.owner_name} (${docInfo.info.owner_id})`}
            />
          </fieldset>
        </FormElement>
      )}
    />
  );
});

export default Properties;
