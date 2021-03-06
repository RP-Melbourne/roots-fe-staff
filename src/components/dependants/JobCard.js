import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import { Modal, Button, Typography, Grid, Divider } from "@material-ui/core/";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { API } from "helpers";
import { notify } from "components/index";
import { TextHelper } from "helpers/index";


const useStyles = makeStyles(theme => ({
  cell: {
    borderRadius: "10px",
    border: "1px dashed black",
    maxWidth: "240px",
    minHeight: "200px",
  },

  gridMain: {
    minHeight: "230px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    borderRadius: "25px",
    border: "1px solid #087b94",
    color: "#087b94",
    width: "80%",
  },
  topBarCard: {
    backgroundColor: "#fff",
    borderRadius: "0px 0px 2px 2px",
    border: "1px solid #b1afafbf",

    boxShadow: "none",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "-1px 0px 6px #6a6a6a",
      backgroundColor: "#c3e5cc6e",
    },
    transition: "all .3s ease",
  },
  buttonCancel: {
    color: "#f6cece",
    transition: "all .3s ease",
    "&:hover": {
      color: "#ff6a6a",
    },
  },
  containerTile: {
    border: "1px solid #b1afafbf",
    borderTop: "none",
    borderRadius: "0px 0px 2px 2px",
    backgroundColor: "snow",

  },

  paper: {
    backgroundColor: "white",
    width: "350px",
    position: "relative",
    margin: "auto",
    borderRadius: "10px",
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function JobCard(props) {
  const classes = useStyles();
  const { positionTitle, seniority, publishDate, endDate } = props.data;
  const { setSingleJobData, setJobView, setIsUpdated } = useContext(HomeContext);
  const [open, setOpen] = React.useState(false);

  const openSingleJob = () => {
    setSingleJobData(props.data);
    setJobView(true);
  };

  const deleteOpp = async () => {
    const data = {
      opportunityId: props.data._id,
    };

    await API.deleteOpp(data);
    notify("Deleted");
    setIsUpdated(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const colorTile =
    props.type === "elapsed" ? "rgba(255, 119, 98, 0.9)" : "#087B94";

  return (
    <div style={{

    }}>
      <Grid
        container
        justify="center"
        className={classes.topBarCard}
      >
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: `${colorTile}`,
            height: "5px",
            borderRadius: "2px 2px 0px 0px",
          }}
        />
        <Grid container justify="center" className={classes.containerTile} item xs={12} spacing={1}
          style={{
            marginTop: "1px",
            paddingLeft: "10px", paddingRight: "10px"
          }} >
          <Grid container justify="space-between" item xs={12}>
            <Grid item xs={11} onClick={() => openSingleJob()}>
              <Typography style={{ fontWeight: "500" }}>
                {TextHelper.titleCase(positionTitle)}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <DeleteForeverIcon
                fontSize="small"
                className={classes.buttonCancel}
                onClick={handleOpen}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} onClick={() => openSingleJob()}>
            <Typography variant="caption">{seniority}</Typography>
          </Grid>
          <Grid item xs={12} onClick={() => openSingleJob()}>
            <Typography variant="caption">
              Published on: {TextHelper.formatToD_MMMM_YYYY(publishDate)} <br />
              End: {TextHelper.formatToD_MMMM_YYYY(endDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} onClick={() => openSingleJob()}>
          <Divider style={{ borderColor: "#c9c7c761" }} />
        </Grid>
        <Grid container justify="center" className={classes.containerTile} item xs={12} spacing={1}
          style={{
            marginTop: "1px",
            paddingLeft: "10px", paddingRight: "10px"
          }}>
          <Grid item container xs={11} alignItems="center" justify="flex-end" onClick={() => openSingleJob()}>
            <Grid item xs={2} lg={2} md={2} xl={2}>
              <Button
                fullWidth
                size="small"
                color="primary"
              >
                View
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{ borderRadius: "10px", padding: "10vh 0" }}
      >
        <Grid container justify="center" className={classes.paper}>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "#ff000099",
              height: "3vh",
              borderRadius: "10px 10px 0 0",
            }}
          />
          <Grid item xs={11} style={{ padding: "2vh 2vw" }}>
            <Typography align="center" variant="subtitle2">
              {" "}
              Do you want to cancel this add ?
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ padding: "2vh 0" }}>
            <Button
              variant="outlined"
              fullWidth
              style={{ color: "#ff000099", borderColor: "#ff000099" }}
              onClick={() => deleteOpp()}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
