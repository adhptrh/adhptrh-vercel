import Container from "../Container/Container";

export default function Video(props) {
    return <Container {...props} title={props.title}>
    <div className="flex w-full h-full">
      <video autoPlay width="100%" controls>
        <source src="video.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
      </video>
    </div>
  </Container>
}