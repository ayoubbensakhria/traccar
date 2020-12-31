import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import t from "./common/localization";
import userAttributes from "./attributes/userAttributes";
import EditItemView from "./EditItemView";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditAttributesView from "./attributes/EditAttributesView";
import LinkField from "./form/LinkField";

import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";

import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "dd MM yyyy", { locale: this.locale });
  }
}

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: "column",
  },
}));

const UserPage = () => {
  const classes = useStyles();

  const [item, setItem] = useState();

  const [locale, setLocale] = useState("fr");

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <EditItemView endpoint="users" item={item} setItem={setItem}>
      {item && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{t("sharedRequired")}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.name || ""}
                onChange={(event) =>
                  setItem({ ...item, name: event.target.value })
                }
                label={t("sharedName")}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.email || ""}
                onChange={(event) =>
                  setItem({ ...item, email: event.target.value })
                }
                label={t("userEmail")}
                variant="filled"
              />
              <TextField
                margin="normal"
                type="password"
                value={item.password || ""}
                onChange={(event) =>
                  setItem({ ...item, password: event.target.value })
                }
                label={t("userPassword")}
                variant="filled"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.administrator}
                    onChange={(event) =>
                      setItem({ ...item, administrator: event.target.checked })
                    }
                  />
                }
                label={t("userAdmin") + "?"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.readonly}
                    onChange={(event) =>
                      setItem({ ...item, readonly: event.target.checked })
                    }
                  />
                }
                label={t("serverReadonly") + "?"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.disabled}
                    onChange={(event) =>
                      setItem({ ...item, disabled: event.target.checked })
                    }
                  />
                }
                label={t("sharedDisabled") + "?"}
              />
              <Box mt={2}>
                <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                  <DateTimePicker
                    fullWidth
                    clearable
                    format="d MMM yyyy"
                    label={t("userExpirationTime")}
                    inputVariant="filled"
                    value={
                      Date.parse(item.expirationTime) ||
                      selectedDate ||
                      new Date()
                    }
                    onChange={(date) => handleDateChange(date)}
                    onAccept={(date) =>
                      setItem({ ...item, expirationTime: date })
                    }
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <Box mt={2}>
                <TextField
                  fullWidth
                  label={t("userDeviceLimit")}
                  type="number"
                  value={item.deviceLimit || "0"}
                  onChange={(event) =>
                    setItem({
                      ...item,
                      deviceLimit: Number(event.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
              </Box>
              <Box mt={2}>
                <TextField
                  fullWidth
                  label={t("userUserLimit")}
                  type="number"
                  value={item.userLimit || "1"}
                  onChange={(event) =>
                    setItem({
                      ...item,
                      userLimit: Number(event.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t("sharedAttributes")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <EditAttributesView
                attributes={item.attributes}
                setAttributes={(attributes) => setItem({ ...item, attributes })}
                definitions={userAttributes}
              />
            </AccordionDetails>
          </Accordion>
          {item.id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t("sharedConnections")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  margin="normal"
                  endpointAll="/api/devices?all=true"
                  endpointLinked={"/api/devices?userId=" + item.id}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="deviceId"
                  label={t("deviceTitle")}
                  variant="filled"
                />
                <LinkField
                  margin="normal"
                  endpointAll="/api/groups?all=true"
                  endpointLinked={"/api/groups?userId=" + item.id}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="groupId"
                  label={t("settingsGroups")}
                  variant="filled"
                />
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </EditItemView>
  );
};

export default UserPage;
