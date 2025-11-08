export type PhoneNumber = {
  actualNumber: string;
  displayNumber: string;
};

export type SocialLink = {
  iconName: string;
  url: string;
};

export type ContactInfo = {
  contactName: string;
  phoneNumbers: PhoneNumber[];
  email: string;
  socialLinks?: SocialLink[];
};

