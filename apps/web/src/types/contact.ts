export type PhoneNumber = {
  actualNumber: string;
  displayNumber: string;
};

export type ContactInfo = {
  contactName: string;
  phoneNumbers: PhoneNumber[];
  email: string;
};

