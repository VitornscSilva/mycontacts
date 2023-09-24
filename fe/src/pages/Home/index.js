/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
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
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Deleted contact with success',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'An error occurred when trying to delete the contact',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Are you sure you want to remove the contact "${contactBeingDeleted?.name}"?`}
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>This action cannot be undone!</p>
      </Modal>

      { contacts.length > 0 && (
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search contact"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contact' : ' contacts'}
          </strong>
        )}
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
              {
                (contacts.length < 1 && !isLoading) && (
                  <EmptyListContainer>
                    <img src={emptyBox} alt="Emtpy Box" />

                    <p>
                      You dont have any contacts registered yet!
                      Click the <strong>”New contact”</strong> button
                      above to add your first one
                    </p>
                  </EmptyListContainer>
                )
              }

              {(contacts.length > 0 && filteredContacts.length < 1) && (
                <SearchNotFoundContainer>
                  <img src={magnifierQuestion} alt="Magnifier Question" />

                  <span>Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.</span>
                </SearchNotFoundContainer>
              )}

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
                    {contact.category.name && (
                    <small>{contact.category.name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(contact)}
                  >
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
