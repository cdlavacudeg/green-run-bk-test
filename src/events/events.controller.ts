import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { EventsService } from './events.service';

@ApiTags('Events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('/')
  async getEvents() {
    return await this.eventsService.getEvents();
  }
}
