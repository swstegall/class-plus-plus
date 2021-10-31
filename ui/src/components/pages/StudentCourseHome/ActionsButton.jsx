import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/core/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/core/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";

const ActionsButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const options = ["Submit Assignment", "View Assignment"];

  const handleSelection = (index) => {
    switch (index) {
      case 0: {
        props.sendToSubmitAssignment();
        break;
      }
      case 1:
      default: {
        props.sendToViewAssignment();
        break;
      }
    }
  };

  const handleClick = () => {
    handleSelection(selectedIndex);
  };

  const handleMenuItemClick = (event, index) => {
    handleSelection(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="left">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="secondary"
          size={"small"}
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id={`split-button-menu-${props.id}`}>
                    {options.map((option, index) => {
                      if (index !== options.length - 1) {
                        return (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
                          >
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default ActionsButton;
