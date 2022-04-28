export default `
//
// here are things that are in scope!
//
//  import {
//    Box,
//    Badge,
//    Button,
//    DateInput,
//    Dropdown,
//    Icon,
//    Image,
//    Input,
//    Field,
//    Fieldset,
//    Flex,
//    Formbot,
//    Form,
//    Container,
//    Text,
//    List,
//    ThemeProvider,
//  } from '@goodrx/matisse-react';
//
() => {
  const helloWorld = () => console.log('hello world');
  return (
    <>
      {/*Matisse components NEED to be rendered inside of the <ThemeProvider /> */}
      <ThemeProvider theme="matisse">
        <Button margin={100} onClick={helloWorld} type="button">clickd</Button>
      </ThemeProvider>
    </>
  )
}
`;
