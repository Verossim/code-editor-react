import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import api from '../services/api';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ControlledTreeView() {
  const classes = useStyles();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.get('filetree')
      .then(res => {
        setFiles(res.data)
      });

  }, []);

  const renderTree = (dir) => (
    <TreeItem key={dir.id} nodeId={dir.id} label={dir.name}>
      {Array.isArray(dir.children) ? dir.children.map((file) => 
        renderTree(file)) : null}
    </TreeItem> 
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(files)}
    </TreeView>
  ); 
}
  