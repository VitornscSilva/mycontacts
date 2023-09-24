import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contact successfully registered!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'An error occurred while registering the contact!',
      });
    }
  }

  return (
    <>
      <PageHeader
        title="New Contact"
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
