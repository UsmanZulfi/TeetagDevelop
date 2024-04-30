export interface User {
  id: number;
  name: string;
  tags: number;
  email: string;
  phone: string;
  state: string;
  role: string;
  provider: string;
}

export interface Minion {
  id: number;
  name: string;
  phone: string;
  email: string;
  state: string;
  age: string;
  reason: string;
  story: string;
  img: string;
  loss: string;
}

export interface Influencer {
  id: number;
  name: string;
  phone: string;
  email: string;
  state: string;
  age: string;
  reason: string;
  socials: string[];
  loss: string;
  image?: string;
}
