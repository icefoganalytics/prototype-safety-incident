export interface User {
  email: string;
  sub: string;
  first_name: string;
  last_name: string;
  status: string;
  is_admin: Boolean;
  create_date: Date;

  roles?: string[];
  display_name?: string;
}
