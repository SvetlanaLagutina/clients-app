import { PortalClientsDto, PortalDataDto } from '@shared/api';
import { PortalClients } from '../models/portal-clients';
import { PortalData } from '../models/portal-data';

export class ClientsAdapter {
  static toClient = (dto: PortalClientsDto): PortalClients => {
    return {
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      phone: dto.phone,
    };
  };

  static toClientList(dto: PortalDataDto): PortalData {
    return {
      users: dto.users.map(i => this.toClient(i)),
    };
  }
}
