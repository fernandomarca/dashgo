import faker from "faker";
import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";

//
type User = {
  name: string;
  email: string;
  created_at: string;
};

//User
//address

//address (id)
//{name:"Diego", email:"...."}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList("user", 20);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        //page 2 ir do 10 - 20
        const pageStart = (Number(page) - 1) * Number(per_page);
        // ex: page=3
        // pageStart = 2 * 10 = 20
        const pageEnd = pageStart + Number(per_page);
        //pageEnd = 20 + 10 = 30

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.post("/users");
      this.get("/users/:id");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
