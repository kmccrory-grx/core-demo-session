export const pasteSnippet = (
  {
    key,
    cursorPosition,
    componentData,
    setEditorCode,
    setEditorKey,
    formatCode
  }
) => {
  const textArea = document
    .getElementById('editorWrapper')
    .getElementsByTagName('textarea')[0];

  textArea.setSelectionRange(cursorPosition, cursorPosition);

  let code = textArea.value.slice(0, cursorPosition) +
    `${componentData[key].snippet}` +
    textArea.value.slice(cursorPosition);

  if (componentData[key].hooks) {
    code = code.slice(0, 7) +
      `\n${componentData[key].hooks}` +
      code.slice(7);
  };

  if (componentData[key].definitions) {
    code = code.slice(0, 7) +
      `\n${componentData[key].definitions}` +
      code.slice(7);
  };

  setEditorCode(formatCode(code));
  setEditorKey(Math.random() * 100);
}