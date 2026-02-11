import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  estado: boolean = true;
  // datos de la persona
  @IsString()
  @IsNotEmpty()
  nombres: string;
  @IsString()
  @IsNotEmpty()
  p_apellido: string;
  @IsString()
  @IsNotEmpty()
  s_apellido: string;
  @IsString()
  @IsNotEmpty()
  fecha_nacimiento: Date;
  @IsString()
  @IsNotEmpty()
  genero: string;
  // @IsOptional()
  // persona?: Persona;

  @IsOptional()
  @IsNumber()
  id_role?: number;
}
