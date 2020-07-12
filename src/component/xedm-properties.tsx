import React, { FC, ChangeEvent, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import intl from "react-intl-universal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

const Properties = observer(() => {
  const classes = useStyles();
  const [value, setValue] = useState("Controlled");
  const { docInfo } = useStore();

  // called one time, when mount
  useEffect(() => {
    docInfo.getDocInfo().catch((e) => {
      toast.error("An error occurred");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
        <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" /> */}

        <TextField
          id="standard-read-only-input"
          label="Name"
          defaultValue={(docInfo.info as any).object_name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Version"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-read-only-input"
          label="Modified"
          defaultValue="2020-01-21 02:33:29"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Modifier"
          defaultValue="SUPER"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-read-only-input"
          label="Size"
          type="number"
          defaultValue="0"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-read-only-input"
          label="Creator"
          defaultValue="2020-01-21 02:33:29"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Created"
          defaultValue="2020-01-21 02:33:29"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-read-only-input"
          label="Owner"
          defaultValue="2020-01-21 02:33:29"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          onChange={handleChange}
          defaultValue="Default Value"
          variant="outlined"
        />
      </div>
    </form>
  );
});

export default Properties;
