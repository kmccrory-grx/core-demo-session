import {
  Button,
  List
} from '@goodrx/matisse-react';

import componentData from '../../data/componentData';
import { pasteSnippet } from '../utils/pastSnippet';

let formattedCodeListData = ({   
    cursorPosition,
    setEditorCode,
    setEditorKey,
    formatCode
}) => Object.keys(componentData).map((key) => {
  return {
    title: (
      <Button
          onClick={(e) => {
          e.preventDefault();
          pasteSnippet({
              key,
              cursorPosition,
              componentData,
              setEditorCode,
              setEditorKey,
              formatCode
          });
          }}
          type="button"
          size='sm'
          variant='standalone'
      >
          {key}
      </Button>
      ),
    };
});

const ComponentList = (
  {   
    cursorPosition,
    setEditorCode,
    setEditorKey,
    formatCode
  }
) => {
  return (
    <>
      <List blocks={formattedCodeListData(
        {   
          cursorPosition,
          setEditorCode,
          setEditorKey,
          formatCode
        }
      )} variant="none" />
    </>
  );
};

export default ComponentList;