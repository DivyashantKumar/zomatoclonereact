import { Container } from "react-bootstrap";
import QuickSearchContainer from "./OuickSearchContainer";
import QuickSearchList from "./QuickSearchList";


function Main(){
    return(
        <Container>
            <QuickSearchContainer/>
            <QuickSearchList/>
        </Container>
        
    );
}

export default Main;