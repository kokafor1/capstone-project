import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFactById, editFactById, getFactById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CategoryType, FactFormDataType, UserType } from '../types';

type EditFactProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: UserType|null
}

export default function EditFact({flashMessage, currentUser}: EditFactProps) {
    const { factId } = useParams();
    const navigate = useNavigate();

    const [factToEditData, setFactToEditData] = useState<FactFormDataType>({title: '', fact: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect( () => {
        async function getFact(){
            let response = await getFactById(factId!)
            if (response.data){
                const fact = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                if (currentUser?.id !== fact.user.id){
                    flashMessage('You do not have permission to edit this fact', 'danger');
                    navigate('/')
                } else {
                    setFactToEditData({title: fact.title, fact : fact.fact})
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getFact()
    }, [factId, currentUser] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFactToEditData({...factToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editFactById(factId!, token, factToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.title} has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteFactById(factId!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        }else {
            flashMessage(response.data!,'primary')
            navigate('/')
        }
    }

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Fact</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Fact Title</Form.Label>
                        <Form.Control name='title' placeholder='Edit Fact Title' value={factToEditData.title} onChange={handleInputChange} />
                        <Form.Label>Fact Body</Form.Label>
                        <Form.Control as='textarea' name='fact' placeholder='Edit Fact Body' value={factToEditData.fact} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Fact</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Fact</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {factToEditData.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {factToEditData.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Fact</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}