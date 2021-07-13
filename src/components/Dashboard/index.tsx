import { TransasctionsTable } from "../TransactionsTable";
import { Container } from "./style";
import { Summary } from "../Summary/index";


export function Dashboard(){
    return (
        <Container>
            <Summary/>
            <TransasctionsTable/>
        </Container>
    );
}