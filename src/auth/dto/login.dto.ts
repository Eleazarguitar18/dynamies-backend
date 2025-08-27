import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsEmail({}, { message: 'El email no tiene un formato valido' })
    email: string;
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña no es un formato valida' })
    password: string;
}