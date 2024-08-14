import { Controller, Post } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle() {}
}
