const { MongoMemoryServer } = require("mongodb-memory-server");

const db = require("../config/db");

const server = new MongoMemoryServer();

const connectMemoryDB = async () => {
  const url = await server.getConnectionString();
  db.connect(url);
};

const disconnectMemoryDB = () => {
  db.disconnect();
};

const cleanMemoryDB = async () => {
  await db.dropAllCollection();
};

beforeAll(async () => {
  await connectMemoryDB();
  await cleanMemoryDB();
});

afterAll(() => {
  disconnectMemoryDB();
});

beforeEach(async () => {
  await cleanMemoryDB();
});
