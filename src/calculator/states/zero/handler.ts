import { curry } from 'ramda';

import { Maybe } from '../../../generic';
import helpers from '../helpers';
import accumulator from '../accumulator';
import zeroFactory from './factory';

const handleZeroState =
  (
    services: CalculatorServices,
    state: ZeroState,
    input: Input
  ): CalculatorState => {
  const currentPending = state.pendingOperation;
  const accumulatorState = accumulator.factory(currentPending, '');

  switch (input) {
    case '0': {
      return zeroFactory(currentPending);
    }

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9': {
      const next = helpers.accumulateNonZero(services, input, accumulatorState);
      return next;
    }

    case 'add': {
      const nextOperation = Maybe.of<Operation>('add');
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'subtract': {
      const nextOperation = Maybe.of<Operation>('subtract');
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'multiply': {
      const nextOperation = Maybe.of<Operation>('multiply');;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'divide': {
      const nextOperation = Maybe.of<Operation>('divide');;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'equals': {
      const nextOperation = Maybe.of(null);
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'clear': {
      const nextState: ZeroState = zeroFactory(Maybe.of(null));
      return nextState;
    }
  }
};

const handler = curry(handleZeroState);

export default handler;
