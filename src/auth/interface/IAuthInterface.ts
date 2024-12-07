import { AuthDto } from '../dto/auth.dto';

export interface IAuthInterface {
  SignIn(user: AuthDto): Promise<{ acessToken: string }>;
}
