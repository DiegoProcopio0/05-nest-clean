import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { ConflictException } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountSchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { email, name, password } = createAccountSchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same email address already exist.')
    }

    const hashPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        email,
        name,
        passsword: hashPassword,
      },
    })
  }
}
