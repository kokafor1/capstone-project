import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FactFormDataType } from '../types';

type FactFormProps = {
    addNewFact: (data: FactFormDataType) => void
}

export default function FactForm({ addNewFact }: FactFormProps){
    const [newFact, setNewFact] = useState<FactFormDataType>({title: '',fact: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFact({...newFact, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewFact(newFact)
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Fact</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Fact Title</Form.Label>
                    <Form.Control name='title' placeholder='Enter New Fact Title' value={newFact.title} onChange={handleInputChange} />
                    <Form.Label>Fact Body</Form.Label>
                    <Form.Control name='fact' placeholder='Enter New Fact Body' value={newFact.fact} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Fact</Button>
                </Form>
            </Card.Body>
        </Card> 
    )
}