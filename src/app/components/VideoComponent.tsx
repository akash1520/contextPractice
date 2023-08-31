export default function VideoComponent() {
  return (
    <video autoPlay muted loop style={{ objectFit:"cover", width: "1080px", height: "500px" }}>
    <source src="/images/gosVid.mp4" />
  </video>
  )
}
