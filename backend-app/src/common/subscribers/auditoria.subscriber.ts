import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { BaseEntity } from '../entities/BaseEntity';
// import { RequestContext } from '...'; // Necesitarías un módulo para obtener el usuario actual

@EventSubscriber()
export class AuditoriaSubscriber implements EntitySubscriberInterface {
  // Indica a qué tipo de entidades se aplica este suscriptor (cualquier entidad que extienda de BaseEntity)
  listenTo() {
    return BaseEntity;
  }

  // Lógica para la creación (INSERT)
  async beforeInsert(event: InsertEvent<any>) {
    // Solo aplica a entidades que extiendan de BaseEntity
    if (event.entity instanceof BaseEntity) {
      // --- Lógica de Fecha ---
      event.entity.fechaCreacion = new Date();
      event.entity.fechaModificacion = new Date();

      // --- Lógica de Usuario ---
      // Aquí debes obtener el ID del usuario que está realizando la acción (usando un contexto de petición, JWT, etc.)
      const currentUserId = 1; // 👈 Sustituye por la lógica real de obtención del usuario

      event.entity.idUsuarioCreacion = currentUserId;
      event.entity.idUsuarioModificacion = currentUserId;
    }
  }

  // Lógica para la actualización (UPDATE)
  async beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity instanceof BaseEntity) {
      // --- Lógica de Fecha ---
      event.entity.fechaModificacion = new Date();

      // --- Lógica de Usuario ---
      const currentUserId = 1; // 👈 Sustituye por la lógica real de obtención del usuario

      event.entity.idUsuarioModificacion = currentUserId;
    }
  }
}
