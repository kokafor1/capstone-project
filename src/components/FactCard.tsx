import { Link } from "react-router-dom";
import { FactType, UserType } from "../types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type FactCardProps = {
    fact: FactType,
    currentUser: UserType|null,
}

export default function FactCard({ fact, currentUser}: FactCardProps){
    return (
        <>
        <Card className="my-3" text='black'>
            {/* <Card.Header>{fact.dateCreated}</Card.Header> */}
           <Card.Body>
            <Card.Title>{ fact.title }</Card.Title>
            <Card.Title>{fact.user.username}</Card.Title>
            <Card.Text>{fact.fact}</Card.Text>
            {fact.user.id === currentUser?.id && <Link to={`/edit/${fact.id}`}><Button variant="primary">Edit Fact</Button></Link>}
            </Card.Body>
        </Card>
        </>
    )
}