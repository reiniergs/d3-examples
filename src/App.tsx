import SrpMarketClusters from "./components/SrpMarketCusters";
import { Application, Container } from "./styled";
import { data } from "./components/SrpMarketCusters/data";

function App() {
  return (
    <Application>
      <Container>
        <SrpMarketClusters data={data}/>
      </Container>
    </Application>
  );
}

export default App;
