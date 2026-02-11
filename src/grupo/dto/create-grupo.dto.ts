import { IsString, IsNotEmpty, IsOptional, IsHexColor, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateGrupoDto {
  @ApiProperty({ 
    example: 'Leones del Norte', 
    description: 'El nombre único del grupo de campamento' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @ApiProperty({ 
    example: '#FF5733', 
    description: 'Color representativo del grupo en formato Hexadecimal',
    required: false 
  })
  @IsString()
  @IsOptional()
  @IsHexColor()
  color_hex?: string;
}

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}