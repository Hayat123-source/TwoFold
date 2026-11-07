export type Gender = 'male' | 'female';

export interface SignupValues {
  firstName: string;
  gender: Gender | '';
  email: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  ageConfirmed: boolean;
}

export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

export const EMPTY_SIGNUP: SignupValues = {
  firstName: '',
  gender: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  city: '',
  ageConfirmed: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;

function yearsBetween(dateString: string, today: Date): number {
  const dob = new Date(`${dateString}T00:00:00`);
  let years = today.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (beforeBirthday) years -= 1;
  return years;
}

export function validateSignup(values: SignupValues, today: Date = new Date()): SignupErrors {
  const errors: SignupErrors = {};

  const firstName = values.firstName.trim();
  if (!firstName) errors.firstName = 'Please enter your first name.';
  else if (firstName.length > 60) errors.firstName = 'Please keep your first name under 60 characters.';

  if (!values.gender) errors.gender = 'Please choose one.';

  const email = values.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > 254 || !EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';

  const phone = values.phone.trim();
  if (!phone) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_PATTERN.test(phone)) errors.phone = 'Please enter a valid phone number.';

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Please enter your date of birth.';
  } else if (Number.isNaN(new Date(`${values.dateOfBirth}T00:00:00`).getTime())) {
    errors.dateOfBirth = 'Please enter a valid date of birth.';
  } else if (yearsBetween(values.dateOfBirth, today) < 18) {
    errors.dateOfBirth = 'TWO FOLD is for adults aged 18 and over.';
  } else if (yearsBetween(values.dateOfBirth, today) > 120) {
    errors.dateOfBirth = 'Please enter a valid date of birth.';
  }

  const city = values.city.trim();
  if (!city) errors.city = 'Please tell us the city you live in.';
  else if (city.length > 100) errors.city = 'Please keep your city name under 100 characters.';

  if (!values.ageConfirmed) errors.ageConfirmed = 'You must confirm that you are 18 or older.';

  return errors;
}

export function hasErrors(errors: SignupErrors): boolean {
  return Object.keys(errors).length > 0;
}
