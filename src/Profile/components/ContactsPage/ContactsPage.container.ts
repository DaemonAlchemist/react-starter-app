import { inject, mergeProps } from "unstateless";
import {ContactsPageComponent} from "./ContactsPage.component";
import {IContactsPageInputProps, ContactsPageProps} from "./ContactsPage.d";

const connect = inject<IContactsPageInputProps, ContactsPageProps>(mergeProps((a:any) => a));

export const ContactsPage = connect(ContactsPageComponent);
