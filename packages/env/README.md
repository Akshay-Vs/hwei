# Environment Validation

Centralized environment validation for this monorepo using Zod

### Schema Definition

Uses Zod to create a type-safe schema for environment variables
Provides specific validations for different types of variables

Strict enumeration for NODE_ENV
URL validation for API endpoints
Regex validation for database connection strings
Automatic type conversion
Boolean parsing for feature flags

### Validation Benefits

Catches configuration errors early
Provides clear, typed environment configuration
Allows setting default values
Supports optional variables
Provides detailed error messages

### Flexible Loading

Can load from different environment files
Supports custom environment file paths
Comprehensive error handling

### Example .env file that would work with this validation:

```sh
NODE_ENV=development
API_URL=https://api.example.com
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority&appName=<app-name>
ENABLE_METRICS=true
API_KEY=my-super-secret-api-key-123
LOG_LEVEL=debug
```

#### Package Installation

```json
"dependencies": {
  ...other dependencies,
  "@hwei/env": "workspace:*"
}
```

### Usage in an application:

```ts
import env from '@hwei/env';

// This will validate the environment and throw an error if invalid
const config = env.loadEnv();

// Or use it in an initialization function
env.initializeApp();
```
