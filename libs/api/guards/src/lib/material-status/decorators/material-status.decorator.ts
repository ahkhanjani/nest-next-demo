import { SetMetadata } from '@nestjs/common';
// enums
import { MaterialStatus } from '../enums/material-status.enum';

export const MATERIAL_STATUSES_KEY = 'materialStatuses';
export const MaterialStatuses = (...materialStatuses: MaterialStatus[]) =>
  SetMetadata(MATERIAL_STATUSES_KEY, materialStatuses);
