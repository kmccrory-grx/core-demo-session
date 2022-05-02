export default `() => {
  const helloWorld = () => alert('hello world');
  return (
    <>
      {/*Matisse components NEED to be rendered inside of the <ThemeProvider /> */}
      <ThemeProvider theme="matisse">
        <Button margin={100} onClick={helloWorld} type="button">clicked</Button>
      </ThemeProvider>
    </>
  )
}
`;
