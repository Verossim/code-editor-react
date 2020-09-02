import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import api from '../services/api';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});


function ControlledTreeView() {
  const classes = useStyles();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.get('/filetree')
      .then(res => {
        setFiles(res.data)
      });
  }, []);

  const getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.isDirectory === true) {
        children = getTreeItemsFromData(treeItemData.children);
        return (
          <TreeItem
            key={treeItemData.id}
            nodeId={treeItemData.id}
            label={treeItemData.name}
            children={children}
          />
        );
      } else {
        return (
//onLabelClick invalid hook call
          <TreeItem
            key={treeItemData.id}
            nodeId={treeItemData.id}
            label={treeItemData.name}
            children={children}
          />
        );
      }
    })
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={files.id}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {getTreeItemsFromData(files)}
    </TreeView>
  );
}



function ControlledFileView(id) {
  const [code, setCode] = useState({});

  useEffect(() => {
    api.get(`/files/3`)
      .then(res => {
        setCode(res.data)
      });
  }, [id]);

  return (
    <Typography>
      {code.content}
    </Typography>
  );

}

export { ControlledTreeView, ControlledFileView }
