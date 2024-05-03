import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FactCard from '../components/FactCard';
import FactForm from '../components/FactForm';
import { CategoryType, FactFormDataType, FactType, UserType } from '../types';
import { getAllFacts, createFact } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: FactType, b:FactType) => number,
    idDesc: (a: FactType, b:FactType) => number,
    titleAsc: (a: FactType, b:FactType) => number,
    titleDesc: (a: FactType, b:FactType) => number,
}


type DogTalkProps = {
    isLoggedIn: boolean,
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function DogTalk({isLoggedIn, currentUser, flashMessage}: DogTalkProps) {
    const [showForm, setShowForm] = useState(false);
    const [facts, setFacts] = useState<FactType[]>([])
    const [fetchFactData, setFetchFactData] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const response = await getAllFacts();
            if (response.data){
                let facts = response.data;
                console.log(facts, 'Were here')
                facts.sort( (a, b) => (new Date(a.id) > new Date(b.id)) ? -1 : 1 )
                setFacts(facts)
            }
        }

        fetchData();
    }, [fetchFactData])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:FactType, b:FactType) => a.id - b.id,
            idDesc: (a:FactType, b:FactType) => b.id - a.id,
            titleAsc: (a:FactType, b:FactType) => a.title > b.title ? 1 : -1,
            titleDesc: (a:FactType, b:FactType) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...facts].sort(func);
        setFacts(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewFact = async (newFactData: FactFormDataType) => {
        const token = localStorage.getItem('token') || '';
        // const userId = localStorage.getItem('userId') || '';
        const response = await createFact(token, newFactData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else if (response.data){
            flashMessage(`${response.data.title} has been created`, 'success')
            setShowForm(false);
            setFetchFactData(!fetchFactData)
        }
    }

    return (
        <>
            <h1 className="text-center">{isLoggedIn && currentUser ? `Hello New User!` : 'Welcome to the DogFacts' }</h1>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Control value={searchTerm} placeholder='Search Fact of the Day' onChange={handleInputChange} />
                </Col>
                <Col>
                    <Form.Select onChange={handleSelectChange}>
                        <option>Choose Sorting Option</option>
                        <option value="idAsc">Sort By ID ASC</option>
                        <option value="idDesc">Sort By ID DESC</option>
                        <option value="titleAsc">Sort By Title ASC</option>
                        <option value="titleDesc">Sort By Title DESC</option>
                    </Form.Select>
                </Col>
                {isLoggedIn && (
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Facts+'}</Button>
                    </Col>
                )}
            </Row>
            { showForm && <FactForm addNewFact={addNewFact} /> }
            {facts.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase())).map( f => <FactCard key={f.id} fact={f} currentUser={currentUser} /> )}
        </>
    )

}