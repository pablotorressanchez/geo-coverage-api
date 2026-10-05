# 🚀 API REST - Node.js + TypeScript

REST API for managing geographic coverage data and spatial operations.

## 📂 Project Structure

```text
└── src/
    ├── app.ts            # Application entry point
    ├── config/           # Database configurations and global variables
    ├── repository/       # Database access and direct queries
    ├── services/         # Core business logic
    ├── schemas/          # Data layer (Models and DB validations)
    └── utils/            # Utility functions and helper scripts
```

## 🛠️ Architecture and Layers

The responsibility of each main board is detailed below:

* **Routes & App**: Management of API endpoints and global middleware.
* **Repository**: Layer in charge exclusively of data access (DB). Isolating queries from the rest of the application.
* **Services**: Contains all the business logic and rules of the application.
* **Schemas**: Database layer that defines the structure and typing of entities.
* **Tests**: Unit and integration tests to ensure code stability.