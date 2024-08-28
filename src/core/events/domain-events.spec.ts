import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreate implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreate(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and list to evenest', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de 'resposta criado')
    DomainEvents.register(callbackSpy, CustomAggregate.name)

    // Estou criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado mas nao foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando a resposta no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Estou assegurando que o evento foi disparado
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
