import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

type ChildPage = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

type PagesTypes = {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: ChildPage[];
};

type SidebarListProps = {
  NAVIGATION: PagesTypes[];
  open: boolean;
  expandedSegment: string;
  toggleExpand: (path: string) => void;
};

const SidebarList: React.FC<SidebarListProps> = ({
  NAVIGATION,
  open,
  expandedSegment,
  toggleExpand,
}) => {
  return (
    <List sx={{ px: 1 }}>
      {NAVIGATION.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              marginY: "6px",
              borderRadius: "10px",
              backgroundColor:
                expandedSegment === item.path ? "#37375f" : "transparent",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#46466c",
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                if (item.children) toggleExpand(item.path || "");
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2,
                py: 1.2,
                color: "#e0e0e0",
                borderRadius: "10px",
              }}
              component={!item.children ? (Link as React.ElementType) : "div"}
              to={!item.children ? `/${item.path}` : undefined}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: "#d1d1d1",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  opacity: open ? 1 : 0,
                  color: "#f5f5f5",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                }}
              />
              {item.children &&
                (expandedSegment === item.path ? (
                  <ExpandLess sx={{ color: "#e0e0e0" }} />
                ) : (
                  <ExpandMore sx={{ color: "#e0e0e0" }} />
                ))}
            </ListItemButton>
          </ListItem>

          {item.children && (
            <Collapse
              in={expandedSegment === item.path}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ ml: open ? 2 : 0 }}>
                {item.children.map((child, childIndex) => (
                  <ListItemButton
                    key={childIndex}
                    sx={{
                      pl: open ? 4 : 2,
                      py: 0.75,
                      borderRadius: "8px",
                      backgroundColor: "#2e2e3e",
                      my: 0.5,
                      "&:hover": {
                        backgroundColor: "#3a3a50",
                      },
                    }}
                    component={Link as React.ElementType}
                    to={`/${child.path}`}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                        justifyContent: "center",
                        color: "#c0c0c0",
                      }}
                    >
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={child.title}
                      sx={{
                        opacity: open ? 1 : 0,
                        fontSize: "0.8125rem",
                        color: "#c0c0c0",
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default SidebarList;
