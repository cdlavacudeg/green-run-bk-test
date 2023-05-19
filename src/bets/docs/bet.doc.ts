import { ApiBodyOptions } from "@nestjs/swagger";
import { BetResult, BetStatus } from "@prisma/client";
import { UpdateBetsDto } from "../dtos";

export const UpdateBetsDocs: ApiBodyOptions = {
  type: UpdateBetsDto,
  description: 'You can change the status or the result of the bet, the result have priority to settled the bet',
  examples: {
    example1: {
      summary: 'Change the status of the bet',
      value: {
        status: BetStatus.canceled,
      },
    },
    example2: {
      summary: 'Change the result of the bet and settled',
      value: {
        result: BetResult.win,
      },
    },
  },
};
