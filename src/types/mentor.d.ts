interface Mentor {
  firstName: string;
  lastName: string;
  username: string;
  profileImgUrl: string;
  shortHeading: string;
  gender: string;
  age: string;
  about?: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
}

interface MentorWithId extends Mentor {
  readonly id: string;
}
