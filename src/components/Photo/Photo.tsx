import Container from "../Container/Container";

export default function Photo(props) {
    return <Container {...props} title={props.title}>
    <div className="h-full flex justify-center">
      <img src={props.content} className="my-auto" width={"100%"} />
    </div>
  </Container>
}