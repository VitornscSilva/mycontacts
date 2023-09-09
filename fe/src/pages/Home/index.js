import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search contact"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header hasError={hasError}>
        {
          !hasError && (
            <strong>
              {filteredContacts.length}
              {filteredContacts.length === 1 ? ' contact' : ' contacts'}
            </strong>
          )
        }
        <Link to="/new">New Contact</Link>
      </Header>

      {
        hasError && (
          <ErrorContainer>
            <img src={sad} alt="Sad" />
            <div className="details">
              <strong>An error occurred while retrieving your contacts!</strong>
              <Button type="button" onClick={handleTryAgain}>
                Try Again
              </Button>
            </div>
          </ErrorContainer>
        )
      }

      {
        !hasError && (
          <>
              {filteredContacts.length > 0 && (
              <ListHeader orderBy={orderBy}>
                <button type="button" onClick={handleToggleOrderBy}>
                  <span>Name</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </ListHeader>
              )}

            {filteredContacts?.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category_name && (
                    <small>{contact.category_name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                  <button type="button">
                    <img src={trash} alt="Delete" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )
      }
    </Container>
  );
}
