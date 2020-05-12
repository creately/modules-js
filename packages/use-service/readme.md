# useService

A dependency injection system for React. This project is currently built on top of https://github.com/microsoft/tsyringe but that may change in the future if needed.

## Getting Started

- Install this module on your React app

```shell
npm i @creately/use-service
```

- Update the tsconfig.json file

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Provide Resources

Resources must be provided before they can be used.

It is highly recommended to store tokens on a separate file than the service itself.

**tokens.ts**
```ts
export const TOKEN_AUTHENTICATION = 'TOKEN_AUTHENTICATION';
```

**providers.ts**
```ts
import { provide } from '@creately/use-service';
import { TOKEN_AUTHENTICATION } from './tokens'
import { Authentication } from './authentication';

// provide as a class
provide(TOKEN_AUTHENTICATION, { useClass: Authentication });

// provide as a factory
// provide(TOKEN_AUTHENTICATION, { useFactory: () => new Authentication() });

// provide as a value
provide(TOKEN_API_SERVER_URL, { useValue: 'https://api.myapp.com' });
```

If `useClass` is used to provide a resource, the class must have the following decorators.

**authentication.ts**
```ts
import { injectable, inject } from '@creately/use-service';
import { TOKEN_API_SERVER_URL } from './tokens';

@injectable()
export class Authentication {
    constructor(
        @inject(TOKEN_API_SERVER_URL) private serverUrl: string,
    ) {}
}
```

All resources will be singletons in a particular context.
